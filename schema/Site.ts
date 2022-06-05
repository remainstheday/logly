import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

// A 'Site' is equivalent to a Museum,
// We use the term 'Site' to be more inclusive for future clients. All other data lists are tied to a SiteId.
export const Site = list({
  ui: {
    isHidden: true,
  },
  fields: {
    siteId: text({}),
    Title: text({ label: "Name" }),
    slug: text({
      label: "url",
      validation: {
        isRequired: true,
      },
    }),
  },
});
