import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { defaults } from "./defaults";
import { OperationAccess } from "./access";

export const SiteContent = list({
  access: {
    operation: {
      query: OperationAccess.anyone,
      create: OperationAccess.anyone,
      update: OperationAccess.adminOrSiteCuratorOnly,
      delete: OperationAccess.adminOrSiteCuratorOnly,
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
        if (session && session?.data.siteId) {
          return {
            siteId: {
              equals: session.data.siteId,
            },
          };
        }
        return true;
      },
      update: ({ session }) => {
        return session?.data.siteId
          ? { siteId: { equals: session.data.siteId } }
          : { isAdmin: { equals: true } };
      },
      delete: ({ session }) => {
        return session?.data.siteId
          ? { siteId: { equals: session.data.siteId } }
          : { isAdmin: { equals: true } };
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
    siteLogo: text({
      ui: {
        views: require.resolve("../fields/logo-upload/view.tsx"),
        createView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
        itemView: {
          fieldMode: ({ session, context, item }) => {
            return item.name !== "Home" ? "hidden" : "edit";
          },
        },
      },
    }),
    logoWidth: text({
      ui: {
        createView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
        itemView: {
          fieldMode: ({ session, context, item }) => {
            return item.name !== "Home" ? "hidden" : "edit";
          },
        },
      },
    }),
    logoHeight: text({
      ui: {
        createView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
        itemView: {
          fieldMode: ({ session, context, item }) => {
            return item.name !== "Home" ? "hidden" : "edit";
          },
        },
      },
    }),
    staticPageImages: defaults.images("Banner Image"),
    description: defaults.document,
    url: defaults.url,
    siteId: defaults.siteId,
  },
});
