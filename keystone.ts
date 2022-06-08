import convertStringToURL from "./utils/convertStringToURL";

require("dotenv").config();
import { config } from "@keystone-6/core";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import { Site } from "./schema/Site";
import { Object } from "./schema/Object";
import { User } from "./schema/User";
import { Experience } from "./schema/Experience";
import { StaticContent } from "./schema/StaticContent";
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
      cors: { origin: [`${process.env.FRONTEND_URL}`], credentials: true },
      extendExpressApp: (app, createContext) => {
        app.use(express.json());
        app.post("/api/newUser", async (req, res) => {
          const context = await createContext(req, res);
          const formattedSiteId = convertStringToURL(req.body.email);
          const hasSiteId = await context.query.Site.findOne({
            where: {
              siteId: formattedSiteId,
            },
          });
          const hasEmail = await context.query.User.findOne({
            where: { email: req.body.email },
          });
          if (hasSiteId) return "that Site ID already exists";
          if (hasEmail) return "User already exists with that email";

          // todo:
          // create new user object from req
          // test if email already exists
          // test if site id already exists
          // convert site ID into a valid url
          // create a has paid/ not paid flag for user
          // handle error logging without crashing

          console.log(context);
          const user = await context.query.User.createOne({
            data: {
              siteId: formattedSiteId,
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
            },
          });

          console.log(user);
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
      Object,
      User,
      StaticContent,
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
      // @ts-ignore
      useMigrations: true,
      async onConnect(context) {
        // await context.db.User.updateOne({
        //   where: { email: "trentontri@gmail.com" },
        //   data: {
        //     siteId: "dallas-museum",
        //   },
        // });
        //
        // await context.db.User.updateOne({
        //   where: { email: "trenkennedy@gmail.com" },
        //   data: {
        //     siteId: "",
        //   },
        // });
        //
        // await context.db.Artwork.updateOne({
        //   where: { url: "nighthawks" },
        //   data: { siteId: "dallas-museum" },
        // });

        const homepage = await context.prisma.staticContent.count({
          where: { name: "Home" },
        });

        const about = await context.prisma.staticContent.count({
          where: { name: "About" },
        });

        const media = await context.prisma.staticContent.count({
          where: { name: "Media" },
        });

        const terms = await context.prisma.staticContent.count({
          where: { name: "Terms of Use" },
        });

        const privacy = await context.prisma.staticContent.count({
          where: { name: "Privacy Policy" },
        });

        if (homepage === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Home",
              title: "Logly Studio",
              url: "",
            },
          });
        }

        if (about === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "About",
              title: "About",
              url: "about",
            },
          });
        }
        if (media === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Media",
              title: "Media",
              url: "media",
            },
          });
        }
        if (terms === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Terms of Use",
              title: "Terms of Use",
              url: "termsofuse",
            },
          });
        }

        if (privacy === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Privacy Policy",
              title: "Privacy Policy",
              url: "privacy-policy",
            },
          });
        }
      },
    },
  })
);
