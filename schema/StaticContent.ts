import { list } from "@keystone-6/core";
import { document } from "@keystone-6/fields-document";
import { text } from "@keystone-6/core/fields";
import { FilterAccess, OperationAccess } from "../Access";

export const StaticContent = list({
  access: {
    operation: {
      query: OperationAccess.anyone,
      create: OperationAccess.adminOrSiteCuratorOnly,
      update: OperationAccess.adminOrSiteCuratorOnly,
      delete: OperationAccess.adminOrSiteCuratorOnly,
    },
    filter: {
      query: FilterAccess.limitSiteCurator,
      update: FilterAccess.adminOrSiteCuratorOnly,
      delete: FilterAccess.adminOrSiteCuratorOnly,
    },
  },
  ui: {
    hideCreate: true,
    hideDelete: false,
  },
  fields: {
    name: text({
      ui: {
        itemView: {
          fieldMode: ({ session, context, item }) => "read",
        },
      },
    }),
    siteId: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
      },
      hooks: {
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
      },
    }),
    title: text({}),
    staticPageImages: text({
      ui: {
        views: require.resolve("../fields/image-uploader/view.tsx"),
        createView: { fieldMode: "edit" },
        listView: { fieldMode: "hidden" },
        itemView: { fieldMode: "edit" },
      },
    }),
    slug: text({
      label: "URL",
      isIndexed: "unique",
      isFilterable: true,
      ui: {
        createView: {
          fieldMode: ({ session, context }) => "hidden",
        },
        itemView: {
          fieldMode: ({ session, context, item }) => "read",
        },
        listView: {
          fieldMode: ({ session, context }) => "read",
        },
      },
    }),
    description: document({
      formatting: true,
      dividers: true,
      links: true,
    }),
  },
});
