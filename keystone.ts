require("dotenv").config();
import { config } from "@keystone-6/core";
import { withAuth, session } from "./auth";
import { lists } from "./schema";

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || ``,
      enableLogging: true,
      useMigrations: true,
      idField: { kind: "uuid" },
    },
    graphql: {
      path: "/api/graphql",
      apolloConfig: {
        debug: true,
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
