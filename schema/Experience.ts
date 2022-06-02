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
      if (relatedArtworks && relatedArtworks.connect.length > 0) {
        console.log(relatedArtworks);
        const artworks = await relatedArtworks.connect.map(
          (artworkId: { id: string }) =>
            context.query.Artwork.findOne({
              where: { id: artworkId.id },
              query: "id url",
            })
        );

        return Promise.all(artworks).then((values) => {
          console.log(values);

          relatedArtworks.connect.map((artworkId: { id: string }) => {
            const artworkURL = values.filter(
              (artwork) => artwork.id === artworkId.id
            );
            context.query.Artwork.updateOne({
              where: { id: artworkId.id },
              data: {
                qrCodes: [
                  `${process.env.FRONTEND_URL}/experiences/${item!.url}/${
                    artworkURL[0].url
                  }?social=true`,
                ],
              },
            });
          });

          return {
            ...resolvedData,
          };
        });
      }

      return resolvedData;
    },
  },
});
