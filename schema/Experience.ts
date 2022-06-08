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
    relatedArtifacts: relationship({
      ref: "Artifact.relatedExperiences",
      many: true,
    }),
    url: defaults.url,
    siteId: defaults.siteId,
  },
  hooks: {
    resolveInput: async ({ resolvedData, item, context }) => {
      const { relatedArtifacts, title } = resolvedData;
      if (title) return { ...resolvedData, url: convertStringToURL(title) };
      if (relatedArtifacts && relatedArtifacts.connect.length > 0) {
        const artifacts = await relatedArtifacts.connect.map(
          (artifactId: { id: string }) =>
            context.query.Artifact.findOne({
              where: { id: artifactId.id },
              query: "id url",
            })
        );

        return Promise.all(artifacts).then((values) => {
          relatedArtifacts.connect.map((artifactId: { id: string }) => {
            const artifactURL = values.filter(
              (artifact) => artifact.id === artifactId.id
            );
            context.query.Artifact.updateOne({
              where: { id: artifactId.id },
              data: {
                qrCodes: [
                  `${process.env.FRONTEND_URL}/experiences/${item!.url}/${
                    artifactURL[0].url
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
