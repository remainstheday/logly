import { list } from "@keystone-6/core";
import {
  file,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { cloudinary } from "../cloudinary";
// import {FilterAccess, OperationAccess} from "../Access";

export const Artwork = list({
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
    title: text(),
    artist: text(),
    slug: text({ isIndexed: "unique", isFilterable: true }),
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
    audioFile: text({
      ui: {
        views: require.resolve("../fields/audiofile/view.tsx"),
        createView: { fieldMode: "edit" },
        listView: { fieldMode: "hidden" },
        itemView: { fieldMode: "edit" },
      },
    }),
    images: cloudinaryImage({
      cloudinary,
      label: "Artwork",
    }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    experiences: relationship({ ref: "Experience.artworks", many: true }),
  },
});
