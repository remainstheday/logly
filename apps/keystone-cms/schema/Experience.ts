import { list } from "@keystone-6/core";
import { relationship, timestamp } from "@keystone-6/core/fields";
import convertStringToURL from "../utils/convertStringToURL";
import { defaults } from "./defaults";

export const Experience = list({
  fields: {
    status: defaults.status,
    title: defaults.title,
    startDate: timestamp(),
    endDate: timestamp(),
    experienceImages: defaults.images("Experience Image"),
    altText: defaults.altText,
    description: defaults.document,
    relatedArtifacts: relationship({
      ref: "Artifact.relatedExperiences",
      many: true,
    }),
    url: defaults.url,
    siteId: defaults.siteId,
    qrCodes: defaults.qrCodes,
  },
  access: {
    operation: {
      query: () => true,
      create: ({ session }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
      update: ({ session }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
      delete: ({ session }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
    },
    item: {
      create: ({}) => true,
      update: ({ session, inputData, item }) => {
        if (session?.data.isAdmin) return true;
        if (session.data.siteId && session.data.siteId === item.siteId)
          return true;

        if (
          session.data.siteId &&
          session.data.siteId &&
          inputData &&
          inputData.siteId &&
          inputData.siteId !== session.data.siteId
        )
          return false;

        return false;
      },
    },
    filter: {
      query: ({ session }) => {
        if (session && session.data.isAdmin) return true;
        if (session && session?.data.siteId) {
          return {
            siteId: {
              equals: session.data.siteId,
            },
          };
        }
        return true;
      },
      update: ({ session }) => {
        if (session && session.data.isAdmin) return true;
        return session?.data.siteId
          ? { siteId: { equals: session.data.siteId } }
          : { isAdmin: { equals: true } };
      },
      delete: ({ session }) => {
        if (session && session.data.isAdmin) return true;
        return session?.data.siteId
          ? { siteId: { equals: session.data.siteId } }
          : { isAdmin: { equals: true } };
      },
    },
  },

  ui: {
    listView: {
      // These are the default columns that will be displayed in the list view
      initialColumns: ["title", "status", "siteId", "startDate", "endDate"],
    },
  },
  hooks: {
    afterOperation: async ({
      item,
      operation,
      originalItem,
      resolvedData,
      context,
    }) => {
      if (item && resolvedData && resolvedData.relatedArtifacts) {
        const experience = await context.prisma.experience.findUnique({
          where: { id: item.id },
        });
        if (experience && resolvedData.relatedArtifacts.connect) {
          resolvedData.relatedArtifacts.connect.map(
            async (relatedArtifact: { id: string }) => {
              const artifact = await context.prisma.artifact.findUnique({
                where: { id: relatedArtifact.id },
              });

              return await context.query.Artifact.updateOne({
                where: { id: `${artifact.id}` },
                data: {
                  qrCodes: [
                    ...artifact.qrCodes,
                    {
                      experienceId: experience.id,
                      artifactId: artifact.id,
                      url: `${process.env.FRONTEND_URL}${experience.url}/${artifact.url}?social=true`,
                    },
                  ],
                },
              });
            }
          );
        }
        if (experience && resolvedData.relatedArtifacts.disconnect) {
          resolvedData.relatedArtifacts.disconnect.map(
            async (relatedArtifact: { id: string }) => {
              const artifact = await context.prisma.artifact.findUnique({
                where: { id: relatedArtifact.id },
              });
              return await context.query.Artifact.updateOne({
                where: { id: `${artifact.id}` },
                data: {
                  qrCodes: artifact.qrCodes.filter(
                    (qrcode: {
                      experienceId: string;
                      artifactId: string;
                      url: string;
                    }) => qrcode.experienceId !== item.id
                  ),
                },
              });
            }
          );
        }
      }
    },
    // If an experience is created without a siteId, assign the current user's siteId to the experience.
    // if a siteIde already exists use that.
    // if an admin manually enters a siteId on a new experience use that.
    resolveInput: async ({ resolvedData, item, context }) => {
      const { title, siteId } = resolvedData;
      const experienceId = item ? item.id : resolvedData.id;
      const updatedSiteId = siteId
        ? siteId
        : item && item.siteId
        ? item!.siteId
        : context.session.data.siteId;

      const url = title
        ? `/${updatedSiteId}/experiences/${convertStringToURL(title)}`
        : item!.url;

      const qrCodes = [
        { experienceId, url: `${process.env.FRONTEND_URL}${url}?social=true` },
      ];

      return {
        ...resolvedData,
        qrCodes,
        url,
        siteId: updatedSiteId,
      };
    },
  },
});
