import { list } from "@keystone-6/core";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import convertStringToURL from "../utils/convertStringToURL";

export const Experience = list({
  hooks: {
    resolveInput: async ({ resolvedData, item, context }) => {
      const { title } = resolvedData;
      if (title) return { ...resolvedData, url: convertStringToURL(title) };

      return resolvedData;
    },
  },
  fields: {
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
    title: text({
      label: "Experience Title",
      validation: { isRequired: true },
    }),
    startDate: timestamp(),
    endDate: timestamp(),
    experienceImages: text({
      label: "Experience Image",
      ui: {
        views: require.resolve("../fields/image-uploader/view.tsx"),
        createView: { fieldMode: "edit" },
        listView: { fieldMode: "hidden" },
        itemView: { fieldMode: "edit" },
      },
    }),
    description: document({
      formatting: true,
      dividers: true,
      links: true,
    }),
    relatedArtworks: relationship({
      ref: "Artwork.relatedExperiences",
      many: true,
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
    url: text({
      isIndexed: "unique",
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
        listView: { fieldMode: "read" },
      },
    }),
  },
});
