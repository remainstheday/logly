require("dotenv").config();
import { config } from "@keystone-6/core";
import { withAuth, session } from "./auth";
import { lists } from "./schema";

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: `postgres://emimtxdnnbnxbp:${process.env.PGPASSWORD}@ec2-72-44-41-8.compute-1.amazonaws.com:5432/dbctgrsc52pmqq`,
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
