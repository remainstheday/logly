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

export const Artwork = list({
  fields: {
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
    artworkImages: text({
      ui: {
        views: require.resolve("../fields/image-uploader/view.tsx"),
        createView: { fieldMode: "edit" },
        listView: { fieldMode: "hidden" },
        itemView: { fieldMode: "edit" },
      },
    }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    experiences: relationship({ ref: "Experience.artworks", many: true }),
  },
});
