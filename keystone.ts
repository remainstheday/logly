require("dotenv").config();
import { config } from "@keystone-6/core";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import { lists } from "./schema";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

export default withAuth(
  config({
    db: {
      // @ts-ignore
      provider: process.env.DATABASE_PROVIDER,
      url: process.env.DATABASE_URL!,
      idField: { kind: "uuid" },
      // @ts-ignore
      useMigrations: process.env.MIGRATIONS,
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
            },
          });
        }

        if (about === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "About",
              title: "About",
              description: "lorem ipsum",
            },
          });
        }
        if (media === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Media",
              title: "Media",
              description: "lorem ipsum",
            },
          });
        }
        if (terms === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Terms of Use",
              title: "Terms of Use",
              description: "lorem ipsum",
            },
          });
        }

        if (privacy === 0) {
          await context.prisma.staticContent.create({
            data: {
              name: "Privacy Policy",
              title: "Privacy Policy",
              description: "lorem ipsum",
            },
          });
        }
      },
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
    lists,
    session: statelessSessions({
      secret: process.env.SESSION_SECRET!,
      maxAge: 60 * 60 * 24,
      secure: true,
    }),
  })
);
