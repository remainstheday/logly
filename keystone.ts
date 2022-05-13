require("dotenv").config();
import { config } from "@keystone-6/core";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import { Museum } from "./schemas/Museum";
import { Artwork } from "./schemas/Artwork";
import { User } from "./schemas/User";
import { Experience } from "./schemas/Experience";
import { StaticContent } from "./schemas/StaticContent";
import { Comment } from "./schemas/Comment";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "isAdmin museumId",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

export default withAuth(
  config({
    server: {
      cors: {origin: [`${process.env.FRONTEND_URL}`], credentials: true},
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
      Museum,
      Artwork,
      User,
      Experience,
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
              title: "Logly Museum",
              description: "lorem ipsum",
              slug: "",
            },
          });
        }

        if (about === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "About",
              title: "About",
              description: "lorem ipsum",
              slug: "about",
            },
          });
        }
        if (media === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Media",
              title: "Media",
              description: "lorem ipsum",
              slug: "media",
            },
          });
        }
        if (terms === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Terms of Use",
              title: "Terms of Use",
              description: "lorem ipsum",
              slug: "termsofuse",
            },
          });
        }

        if (privacy === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Privacy Policy",
              title: "Privacy Policy",
              description: "lorem ipsum",
              slug: "privacy-policy",
            },
          });
        }
      },
    },
  })
);
