import { createAuth } from "@keystone-6/auth";
import { config } from "@keystone-6/core";
import { statelessSessions } from "@keystone-6/core/session";

import bodyParser from "body-parser";
import express from "express";
import { Artifact } from "./schema/Artifact";
import { Comment } from "./schema/Comment";
import { Experience } from "./schema/Experience";
import { Site } from "./schema/Site";
import { SiteContent } from "./schema/SiteContent";
import { User } from "./schema/User";
import convertStringToURL from "./utils/convertStringToURL";

require("dotenv").config();

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "isAdmin siteId",
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [`${process.env.FRONTEND_URL}`],
        credentials: true,
      },
      extendExpressApp: (app, createContext) => {
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use("/restapi", async (req, res, next) => {
          (req as any).context = await createContext(req, res);
          app.use(bodyParser.urlencoded({ extended: true }));
          app.use(express.json());
          const context = await createContext(req, res);
          const existingEmail = await context.prisma.user.findUnique({
            where: { email: `${req.body.email}`.toLowerCase() },
          });

          if (existingEmail !== null) {
            console.log("A user with that email already exists.");

            return res.status(400).json({
              error: "A user with that email already exists.",
            });
          }
          if (req.body.password && req.body.password.length < 7) {
            throw new Error("password must be more than 7 characters");
          }

          /*  Check for existing Site ID before creating a new one */
          const existingId = await context.prisma.site.findMany({
            where: {
              siteId: { equals: `${convertStringToURL(req.body.siteId)}` },
            },
          });
          if (existingId.length > 0) {
            console.log("An organization with that name already exists.");

            return res.status(400).json({
              error: "An organization with that name already exists.",
            });
          }

          /*  Check for existing URL before creating a new Site */
          const existingUrl = await context.prisma.site.findMany({
            where: {
              url: { equals: `${convertStringToURL(req.body.siteId)}` },
            },
          });
          if (existingUrl.length > 0) {
            console.log(
              "An organization with that name or URL already exists."
            );

            return res.status(400).json({
              error: "An organization with that name or URL already exists.",
            });
          }

          /*  Check for existing URL before creating a new Site */
          const existingHomepage = await context.prisma.siteContent.findMany({
            where: {
              url: { equals: `${convertStringToURL(req.body.siteId)}` },
            },
          });
          const existingAbout = await context.prisma.siteContent.findMany({
            where: {
              url: { equals: `${convertStringToURL(req.body.siteId)}/about` },
            },
          });
          if (existingHomepage.length > 0 || existingAbout.length > 0) {
            console.log(
              "An organization with that name or URL already exists."
            );

            return res.status(400).json({
              error: "An organization with that name or URL already exists.",
            });
          }
          next();
        });

        app.post("/restapi/newUser", async (req, res) => {
          app.use(bodyParser.urlencoded({ extended: true }));
          app.use(express.json());
          const context = await createContext(req, res);
          const newUser = {
            siteId: `${convertStringToURL(req.body.siteId)}`,
            name: req.body.name,
            email: `${req.body.email}`.toLowerCase(),
            password: req.body.password,
            isAdmin: false,
          };
          const newSite = {
            siteId: `${convertStringToURL(req.body.siteId)}`,
            title: req.body.siteId,
            url: convertStringToURL(req.body.siteId),
          };

          try {
            await context.query.User.createOne({
              data: newUser,
            });
            await context.query.Site.createOne({
              data: newSite,
            });

            return res.json({
              success: true,
            });
          } catch (e) {
            return res.status(400).json({
              error: `Issue registering a new account: ${e}`,
            });
          }
        });
      },
    },
    experimental: {
      /** Enables nextjs graphql api route mode */
      enableNextJsGraphqlApiEndpoint: true,
      generateNextGraphqlAPI: true,
    },
    graphql: {
      path: "/api/graphql",
      apolloConfig: {
        debug: !process.env.DATABASE_URL,
      },
    },
    images: {
      upload: "local",
      local: {
        storagePath: "frontend/public/images",
        baseUrl: "/images",
      },
    },
    files: {
      upload: "local",
      local: {
        storagePath: "public/files",
        baseUrl: "/files",
      },
    },
    ui: {
      isAccessAllowed: ({ req, session }) => {
        return !!session?.data;
      },
      publicPages: ["/signin"],
    },
    lists: {
      Site,
      Experience,
      Artifact,
      User,
      SiteContent,
      Comment,
    },
    session: statelessSessions({
      secret: process.env.SESSION_SECRET!,
      maxAge: 60 * 60 * 24,
      secure: true,
    }),
    db: {
      // @ts-ignore
      provider: process.env.DATABASE_PROVIDER,
      url: process.env.DATABASE_URL!,
      idField: { kind: "uuid" },
      useMigrations: true,
      enableLogging: false,
      async onConnect(context) {
        const defaultSite = await context.prisma.site.count({
          where: { siteId: { equals: "logly-studio" } },
        });
        const defaultUser = await context.prisma.user.count();

        if (defaultSite === 0) {
          await context.query.Site.createOne({
            data: {
              siteId: "logly-studio",
              title: "Logly Studio",
              url: "logly-studio",
            },
          });
          await context.query.SiteContent.createOne({
            data: {
              name: "Home",
              title: "Logly Studio",
              url: "logly-studio",
              siteId: "logly-studio",
            },
          });
          await context.query.SiteContent.createOne({
            data: {
              name: "About",
              title: "About Logly Studio",
              url: "logly-studio/about",
              siteId: "logly-studio",
            },
          });
        }

        if (defaultUser === 0) {
          await context.query.User.createOne({
            data: {
              siteId: "logly-studio",
              isAdmin: true,
              password: `${process.env.ADMIN_PASSWORD}`,
              name: `${process.env.ADMIN_EMAIL}`,
              email: `${process.env.ADMIN_EMAIL}`,
            },
          });
        }
      },
    },
  })
);
