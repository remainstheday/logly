import { list } from "@keystone-6/core";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { cloudinary } from "../cloudinary";
// import {FilterAccess, ItemAccess, OperationAccess} from "../Access";

export const Experience = list({
  // access: {
  //   operation: {
  //     query: OperationAccess.anyone,
  //     create: OperationAccess.adminOrMuseumCuratorOnly,
  //     update: OperationAccess.adminOrMuseumCuratorOnly,
  //     delete: OperationAccess.adminOrMuseumCuratorOnly,
  //   },
  //   filter: {
  //     query: FilterAccess.limitMuseumCurator,
  //     update: FilterAccess.adminOrMuseumCuratorOnly,
  //     delete: FilterAccess.adminOrMuseumCuratorOnly,
  //   },
  //   // item: {
  //   //   create: ItemAccess.adminOrMuseumCuratorOnly,
  //   //   update: ItemAccess.adminOrMuseumCuratorOnly,
  //   //   delete: ItemAccess.adminOrMuseumCuratorOnly
  //   // },
  // },
  fields: {
    title: text({
      label: "Experience Title",
    }),
    slug: text({
      label: "URL Slug (e.g. /experience-name)",
      isIndexed: "unique",
      isFilterable: true,
      validation: {
        isRequired: true,
        match: { regex: new RegExp("^[^\\/\\ ]*$") },
      },
    }),
    poster: cloudinaryImage({
      cloudinary,
      label: "Poster",
    }),
    startDate: timestamp(),
    endDate: timestamp(),
    status: select({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      defaultValue: "draft",
      ui: {
        displayMode: "segmented-control",
      },
    }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    artworks: relationship({ ref: "Artwork.experiences", many: true }),
  },
});
