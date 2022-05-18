import { list } from "@keystone-6/core";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { cloudinary } from "../cloudinary";

export const Experience = list({
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
    experienceImages: text({
      ui: {
        views: require.resolve("../fields/image-uploader/view.tsx"),
        createView: { fieldMode: "edit" },
        listView: { fieldMode: "hidden" },
        itemView: { fieldMode: "edit" },
      },
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
