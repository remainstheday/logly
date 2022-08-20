import convertStringToURL from "./utils/convertStringToURL";

require("dotenv").config();
import { config } from "@keystone-6/core";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import { Site } from "./schema/Site";
import { Artifact } from "./schema/Artifact";
import { User } from "./schema/User";
import { Experience } from "./schema/Experience";
import { SiteContent } from "./schema/SiteContent";
import { Comment } from "./schema/Comment";
import express from "express";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "isAdmin siteId",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [`${process.env.FRONTEND_URL}`, `${process.env.WEBSITE_URL}`],
        credentials: true,
      },
      extendExpressApp: (app, createContext) => {
        app.use(express.json());
        app.post("/api/newUser", async (req, res, next) => {
          const context = await createContext(req, res);
          const existingId = await context.prisma.site.findMany({
            where: {
              siteId: { equals: `${convertStringToURL(req.body.siteId)}` },
            },
          });
          const existingEmail = await context.prisma.user.findUnique({
            where: { email: `${req.body.email}`.toLowerCase() },
          });

          if (existingId.length > 0) {
            console.log("An organization with that name already exists.");

            return res.status(400).json({
              error: "An organization with that name already exists.",
            });
          }
          if (existingEmail !== null) {
            console.log("A user with that email already exists.");

            return res.status(400).json({
              error: "A user with that email already exists.",
            });
          }
          if (req.body.password && req.body.password.length < 7) {
            throw new Error("password must be more than 7 characters");
          }

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
            await context.query.Site.createOne({
              data: newSite,
            });
            await context.query.User.createOne({
              data: newUser,
            });
            await context.query.SiteContent.createOne({
              data: {
                name: "About",
                title: `About ${newSite.title}`,
                url: `${newSite.url}/about`,
                siteId: newSite.siteId,
              },
            });
            await context.query.SiteContent.createOne({
              data: {
                name: "Home",
                title: newSite.title,
                url: newSite.url,
                siteId: newSite.siteId,
              },
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
      isAccessAllowed: (context) => !!context.session?.data,
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
      enableLogging: true,
      async onConnect(context) {
        const defaultSite = await context.prisma.site.count({
          where: { siteId: { equals: "logly-studio" } },
        });
        const defaultUser = await context.prisma.user.count({
          where: { email: "trentontri@gmail.com" },
        });

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
              name: "Trenton",
              email: "trentontri@gmail.com",
            },
          });
        }
      },
    },
  })
);