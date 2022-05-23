import { list } from "@keystone-6/core";
import {
  json,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import convertStringToURL from "../utils/convertStringToURL";

require("dotenv").config();

export const Artwork = list({
  hooks: {
    resolveInput: async ({ resolvedData, item, context }) => {
      const { relatedExperiences, title } = resolvedData;
      if (title) return { ...resolvedData, url: convertStringToURL(title) };
      if (relatedExperiences && relatedExperiences.connect.length > 0) {
        const experiences = await relatedExperiences.connect.map(
          (experienceId: { id: string }) =>
            context.query.Experience.findOne({
              where: { id: experienceId.id },
              query: "id slug",
            })
        );
        return Promise.all(experiences).then((values) => ({
          ...resolvedData,
          qrCodes: values.map(
            (value) => `${process.env.FRONTEND_URL}/experiences/${value.slug}/`
          ),
        }));
      }

      if (relatedExperiences && relatedExperiences.disconnect.length > 0) {
        // TODO: we should remove QR Codes if the experience is removed @trentonkennedy
      }

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
    title: text({ validation: { isRequired: true } }),
    artist: text({ validation: { isRequired: true } }),
    startDate: timestamp(),
    endDate: timestamp(),
    artworkImages: text({
      label: "Artwork Image",
      ui: {
        views: require.resolve("../fields/image-uploader/view.tsx"),
        createView: { fieldMode: "edit" },
        listView: { fieldMode: "hidden" },
        itemView: { fieldMode: "edit" },
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
    description: document({
      formatting: true,
      dividers: true,
      links: true,
    }),
    relatedExperiences: relationship({
      ref: "Experience.relatedArtworks",
      many: true,
    }),
    url: text({
      isIndexed: "unique",
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
      },
    }),
    siteId: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
      },
    }),
    qrCodes: json({
      ui: {
        views: require.resolve("../fields/qrcode/view.tsx"),
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "hidden" },
      },
    }),
  },
});
