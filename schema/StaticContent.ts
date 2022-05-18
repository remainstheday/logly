import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { cloudinary } from "../cloudinary";
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
    poster: cloudinaryImage({
      cloudinary,
      label: "Poster",
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
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
  },
});
