import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { defaults } from "./defaults";

export const StaticContent = list({
  access: {
    operation: {
      query: () => true,
      create: ({ session, context, operation }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
      update: ({ session, context }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
      delete: ({ session }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
    },
    item: {
      create: ({}) => true,
      update: ({ session, context, inputData, item }) => {
        if (session?.data.isAdmin) return true;
        if (session.data.siteId && session.data.siteId === item.siteId)
          return true;

        if (
          session.data.siteId &&
          session.data.siteId &&
          inputData &&
          inputData.siteId &&
          inputData.siteId !== session.data.siteId
        )
          return false;

        return false;
      },
    },
    filter: {
      query: ({ session }) => {
        return { siteId: { equals: session.data.siteId } };
      },
      update: ({ session }) => {
        return { siteId: { equals: session.data.siteId } };
      },
      delete: ({ session }) => {
        return { siteId: { equals: session.data.siteId } };
      },
    },
  },
  ui: {
    hideCreate: true,
    hideDelete: true,
  },
  fields: {
    name: text({
      ui: {
        itemView: {
          fieldMode: ({ session, context, item }) => "read",
        },
      },
    }),
    title: defaults.title,
    staticPageImages: defaults.images("Page Image"),
    description: defaults.document,
    url: defaults.url,
    siteId: defaults.siteId,
  },
});
