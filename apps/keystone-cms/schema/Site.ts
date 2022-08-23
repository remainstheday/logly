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
  hooks: {  //`/${siteId}/experiences/${convertStringToURL(title)}`
    afterOperation: async ({
                             item,
                             operation,
                             originalItem,
                             resolvedData,
                             context,
                           }) => {

        if(operation === 'create') {
            await context.query.SiteContent.createOne({
                data: {
                    name: "About",
                    title: `About ${resolvedData.title}`,
                    url: `${resolvedData.url}/about`,
                    siteId: resolvedData.siteId,
                },
            });
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
  }
});
