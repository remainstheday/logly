require("dotenv").config();
import { config } from "@keystone-6/core";
import { withAuth, session } from "./auth";
import { lists } from "./schema";

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: `postgresql://postgres:${process.env.PGPASSWORD}@containers-us-west-23.railway.app:8065/railway`,
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
