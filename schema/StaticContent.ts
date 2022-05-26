import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { FilterAccess, OperationAccess } from "../Access";
import { defaults } from "./defaults";

export const StaticContent = list({
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
    title: defaults.title,
    staticPageImages: defaults.images("Page Image"),
    description: defaults.document,
    url: defaults.url,
    siteId: defaults.siteId,
  },
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
});
