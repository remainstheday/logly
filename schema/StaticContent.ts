import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { cloudinary } from "../cloudinary";
import {FilterAccess, OperationAccess} from "../Access";

export const StaticContent = list({
  access: {
    operation: {
      query: OperationAccess.anyone,
      create: OperationAccess.adminOrMuseumCuratorOnly,
      update: OperationAccess.adminOrMuseumCuratorOnly,
      delete: OperationAccess.adminOrMuseumCuratorOnly,
    },
    filter: {
      query: FilterAccess.limitMuseumCurator,
      update: FilterAccess.adminOrMuseumCuratorOnly,
      delete: FilterAccess.adminOrMuseumCuratorOnly,
    },
    // item: {
    //   create: ItemAccess.adminOrMuseumCuratorOnly,
    //   update: ItemAccess.adminOrMuseumCuratorOnly,
    //   delete: ItemAccess.adminOrMuseumCuratorOnly
    // },
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
