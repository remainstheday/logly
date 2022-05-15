import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
// import {FilterAccess, ItemAccess, OperationAccess} from "../Access";

export const Museum = list({
  // access: {
  //   operation: {
  //     query: OperationAccess.anyone,
  //     create: OperationAccess.adminOnly,
  //     update: OperationAccess.adminOrMuseumCuratorOnly,
  //     delete: OperationAccess.adminOnly
  //   },
  //   filter: {
  //     query: FilterAccess.limitMuseumCurator,
  //     update: FilterAccess.adminOrMuseumCuratorOnly,
  //     delete: FilterAccess.adminOrMuseumCuratorOnly,
  //   },
  //   // item: {
  //   //   update: ItemAccess.adminOrMuseumCuratorOnly
  //   // }
  // },
  fields: {
    Title: text({ label: "Name" }),
    slug: text({
      label: "url",
      validation: {
        isRequired: true,
      },
    }),
  },

});
