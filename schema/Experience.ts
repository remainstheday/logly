import { list } from "@keystone-6/core";
import { relationship, text, timestamp } from "@keystone-6/core/fields";
import convertStringToURL from "../utils/convertStringToURL";
import { defaults } from "./defaults";

export const Experience = list({
  fields: {
    status: defaults.status,
    title: defaults.title,
    startDate: timestamp(),
    endDate: timestamp(),
    experienceImages: defaults.images("Experience Image"),
    description: defaults.document,
    relatedArtworks: relationship({
      ref: "Artwork.relatedExperiences",
      many: true,
    }),
    url: defaults.url,
    siteId: defaults.siteId,
  },
  hooks: {
    resolveInput: async ({ resolvedData, item, context }) => {
      const { relatedArtworks, title } = resolvedData;
      if (title) return { ...resolvedData, url: convertStringToURL(title) };
      // if (relatedArtworks && relatedArtworks.connect.length > 0) {
      //   const artworks = await relatedArtworks.connect.map(
      //     (experienceId: { id: string }) =>
      //       context.query.Experience.findOne({
      //         where: { id: experienceId.id },
      //         query: "id url",
      //       })
      //   );
      //
      //   const updatedArtworks = relatedArtworks.map((artwork: any) => ({
      //     ...artwork,
      //     qrCodes: [],
      //   }));
      //
      //   return Promise.all(experiences).then((values) => ({
      //     ...resolvedData,
      //     qrCodes: values.map(
      //       (value) => `${process.env.FRONTEND_URL}/experiences/${value.url}/`
      //     ),
      //   }));
      // }
      return resolvedData;
    },
  },
});
