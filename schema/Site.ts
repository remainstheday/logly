import { list } from "@keystone-6/core";
import { defaults } from "./defaults";

// A 'Site' is equivalent to a Museum,
// We use the term 'Site' to be more inclusive for future clients. All other data lists are tied to a SiteId.
export const Site = list({
  ui: {
    isHidden: ({ session, context }) => !session?.data.isAdmin,
  },
  fields: {
    siteId: defaults.siteId,
    title: defaults.title,
    url: defaults.url,
  },
});
