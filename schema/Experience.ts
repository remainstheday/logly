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
      const { title } = resolvedData;
      if (title) return { ...resolvedData, url: convertStringToURL(title) };

      return resolvedData;
    },
  },
});
