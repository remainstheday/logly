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

const dbProvider = process.env.DATABASE_URL ? "postgresql" : "sqlite";
const dbUrl = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : "file:./keystone.db";

export default withAuth(
  config({
    db: {
      provider: dbProvider,
      url: dbUrl,
      idField: { kind: "uuid" },
    },
    graphql: {
      path: "/api/graphql",
      apolloConfig: {
        debug: true,
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
