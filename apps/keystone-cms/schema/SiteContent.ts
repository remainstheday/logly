import { list } from "@keystone-6/core";
import { json, text } from "@keystone-6/core/fields";
import { defaults } from "./defaults";
import { OperationAccess } from "./access";

export const SiteContent = list({
  fields: {
    name: text({
      ui: {
        itemView: {
          fieldMode: () => "read",
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
          fieldMode: ({ item }) => {
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
          fieldMode: ({ item }) => {
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
          fieldMode: ({ item }) => {
            return item.name !== "Home" ? "hidden" : "edit";
          },
        },
      },
    }),
    staticPageImages: defaults.images("Banner Image"),
    description: defaults.document,
    qrCode: json({
      defaultValue: [],
      ui: {
        views: require.resolve("../fields/qrcode/view.tsx"),
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
      },
    }),
    url: defaults.url,
    siteId: defaults.siteId,
  },
  access: {
    operation: {
      query: OperationAccess.anyone,
      create: ({ session }) =>
          !!session?.data.isAdmin || !!session?.data.siteId,
      update: ({ session }) =>
          !!session?.data.isAdmin || !!session?.data.siteId,
      delete: ({ session }) =>
          !!session?.data.isAdmin || !!session?.data.siteId,
    },
    item: {
      create: () => true,
      update: ({ session, inputData, item }) => {
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
        if (session && session.data.isAdmin) return true;
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
        if (session && session.data.isAdmin) return true;
        return session?.data.siteId
          ? { siteId: { equals: session.data.siteId } }
          : { isAdmin: { equals: true } };
      },
      delete: ({ session }) => {
        if (session && session.data.isAdmin) return true;
        return session?.data.siteId
          ? { siteId: { equals: session.data.siteId } }
          : { isAdmin: { equals: true } };
      },
    },
  },
  ui: {
    hideCreate: true,

    listView: {
      // These are the default columns that will be displayed in the list view
      initialColumns: ["name", "siteId", "title"],
    },
  },
});
