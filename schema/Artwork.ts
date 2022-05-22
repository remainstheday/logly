import { graphql, list } from "@keystone-6/core";
import {
  file,
  json,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { cloudinary } from "../cloudinary";

require("dotenv").config();

export const Artwork = list({
  hooks: {
    resolveInput: async ({ resolvedData, item, context }) => {
      const { relatedExperiences } = resolvedData;

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
    relatedExperiences: relationship({
      ref: "Experience.relatedArtworks",
      many: true,
    }),
    startDate: timestamp(),
    endDate: timestamp(),
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
    audioFile: text({
      ui: {
        views: require.resolve("../fields/audiofile/view.tsx"),
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
