import { list } from "@keystone-6/core";
import { json, relationship, text } from "@keystone-6/core/fields";
import convertStringToURL from "../utils/convertStringToURL";
import { defaults } from "./defaults";

require("dotenv").config();

export const Artwork = list({
  fields: {
    status: defaults.status,
    title: defaults.title,
    artist: text({ validation: { isRequired: true } }),
    artworkImages: defaults.images("Artwork Image"),
    audioFile: defaults.audioFile,
    description: defaults.document,
    relatedExperiences: relationship({
      ref: "Experience.relatedArtworks",
      many: true,
    }),
    url: defaults.url,
    siteId: defaults.siteId,
    qrCodes: json({
      ui: {
        views: require.resolve("../fields/qrcode/view.tsx"),
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "hidden" },
      },
    }),
  },
  hooks: {
    resolveInput: async ({ resolvedData, item, context }) => {
      const { relatedExperiences, title } = resolvedData;
      if (title) return { ...resolvedData, url: convertStringToURL(title) };
      if (relatedExperiences && relatedExperiences.connect.length > 0) {
        const experiences = await relatedExperiences.connect.map(
          (experienceId: { id: string }) =>
            context.query.Experience.findOne({
              where: { id: experienceId.id },
              query: "id url",
            })
        );
        return Promise.all(experiences).then((values) => ({
          ...resolvedData,
          qrCodes: values.map(
            (value) => `${process.env.FRONTEND_URL}/experiences/${value.url}/`
          ),
        }));
      }

      if (relatedExperiences && relatedExperiences.disconnect.length > 0) {
        // TODO: we should remove QR Codes if the experience is removed @trentonkennedy
      }

      return resolvedData;
    },
  },
});
