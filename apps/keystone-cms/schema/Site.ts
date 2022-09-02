import { list } from "@keystone-6/core";
import { defaults } from "./defaults";

// A 'Site' is equivalent to a Museum,
// We use the term 'Site' to be more inclusive for future clients. All other data lists are tied to a SiteId.
export const Site = list({
  ui: {
    isHidden: ({ session }) => !session?.data.isAdmin,
  },
  fields: {
    siteId: defaults.siteId,
    title: defaults.title,
    url: defaults.url,
  },
  hooks: {
    afterOperation: async ({
      item,
      operation,
      originalItem,
      resolvedData,
      context,
    }) => {
      if (operation === "create") {
        /*  Check for existing URL before creating a new Site */
        const existingHomepage = await context.prisma.siteContent.findMany({
          where: {
            url: { equals: `${resolvedData.url}` },
          },
        });
        const existingAbout = await context.prisma.siteContent.findMany({
          where: {
            url: { equals: `${resolvedData.url}/about` },
          },
        });
        if (existingAbout.length === 0) {
          await context.query.SiteContent.createOne({
            data: {
              name: "About",
              title: `About ${resolvedData.title}`,
              url: `${resolvedData.url}/about`,
              siteId: resolvedData.siteId,
            },
          });
        }

        if (existingHomepage.length === 0) {
          await context.query.SiteContent.createOne({
            data: {
              name: "Home",
              title: resolvedData.title,
              url: resolvedData.url,
              siteId: resolvedData.siteId,
            },
          });
        }
      }
    },
  },
});
