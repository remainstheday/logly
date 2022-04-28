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
  access: {
    operation: {
      query: ({ context, listKey, operation }) => true,
    },
  },
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
        views: require.resolve("../fields/audiofile/component.tsx"),
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
