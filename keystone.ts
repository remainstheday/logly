import { config } from "@keystone-6/core";

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from "./auth";

// Look in the schema file for how we define our lists, and how users interact with them through graphql or the Admin UI
import { lists } from "./schema";

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url: `postgresql://postgres:${process.env.DB_PASS}@containers-us-west-21.railway.app:7159/railway`,
      // Optional advanced configuration
      enableLogging: true,
      useMigrations: true,
      idField: { kind: "uuid" },
    },
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    // This config allows us to set up features of the Admin UI https://keystonejs.com/docs/apis/config#ui
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
);
