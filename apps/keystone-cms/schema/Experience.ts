import { list } from "@keystone-6/core";
import { calendarDay, relationship } from "@keystone-6/core/fields";
import convertStringToURL from "../utils/convertStringToURL";
import { defaults } from "./defaults";

export const Experience = list({
  fields: {
    status: defaults.status,
    title: defaults.title,
    dateCreated: defaults.dateCreated,
    experienceStart: calendarDay(),
    experienceEnd: calendarDay(),
    experienceImages: defaults.images("Experience Image"),
    altText: defaults.altText,
    audioFile: defaults.audioFile,
    description: defaults.document,
    relatedArtifacts: relationship({
      ref: "Artifact.relatedExperiences",
      many: true,
      ui: { hideCreate: true },
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
      delete: ({ session }) => {
        return session?.data?.isAdmin || session?.data?.siteId;
      },
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
      initialColumns: [
        "title",
        "status",
        "siteId",
        "experienceStart",
        "experienceEnd",
        "dateCreated",
      ],
    },
  },
  hooks: {
    beforeOperation: async ({
      context,
      inputData,
      listKey,
      operation,
      resolvedData,
      item,
    }) => {
      if (operation === "delete") {
        const artifactsToDelete = await context.query.Artifact.findMany({
          where: {
            relatedExperiences: { some: { id: { equals: (item as any).id } } },
          },
        });

        const deletedArtifacts = await context.query.Artifact.deleteMany({
          where: artifactsToDelete.map((a) => {
            return {
              id: a.id,
            };
          }),
        });
      }
    },
    afterOperation: async ({
      item,
      operation,
      originalItem,
      resolvedData,
      context,
    }) => {
      if (operation === "delete") {
        let allComments = await context.query.Comment.findMany({
          where: { siteId: { equals: (originalItem as any).siteId } },
          query: "id query siteId",
        });

        const commentsToUpdate = allComments.filter((comment) => {
          return (
            comment.query.experience ==
            (originalItem.url as string).split("/").reverse()[0]
          );
        });

        await context.query.Comment.updateMany({
          data: [
            ...commentsToUpdate.map((c) => {
              let newQuery = Object.assign({}, c.query);
              delete newQuery.experience;
              delete newQuery.artifact;
              return {
                where: {
                  id: c.id,
                },
                data: {
                  query: newQuery,
                },
              };
            }),
          ],
          query: "id query",
        });
      }

      if (item && resolvedData && resolvedData.title) {
        const url = resolvedData.title
          ? `/${item.siteId}/experiences/${convertStringToURL(
              resolvedData.title
            )}`
          : item!.url;

        // TODO: this line returns empty[] because Keystone cannot query `relatedExperiences`
        const relatedArtifacts = await context.query.Artifact.findMany({
          where: {
            relatedExperiences: { every: { id: { equals: `${item.id}` } } },
          },
        });

        relatedArtifacts.map(async (artifact) => {
          const artifactData = await context.prisma.artifact.findUnique({
            where: { id: artifact.id },
          });

          const res = await context.query.Artifact.updateOne({
            where: { id: `${artifact.id}` },
            data: {
              qrCodes: artifactData.qrCodes.map((qrCode: any) => {
                if (qrCode.experienceId === item.id) {
                  return {
                    experienceId: item.id,
                    artifactId: artifact.id,
                    url: `${process.env.FRONTEND_URL}${url}/${artifactData.url}?social=true`,
                  };
                }

                return qrCode;
              }),
            },
          });
          return res;
        });
      }

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
    validateInput: async ({
      resolvedData,
      context,
      inputData,
      addValidationError,
    }) => {
      if (resolvedData.title || resolvedData.relatedArtifacts) {
        const otherExperiencessOfSameSiteWithSameTitle =
          await context.query.Experience.findMany({
            where: {
              AND: [
                { title: { equals: resolvedData.title } },
                { siteId: { equals: resolvedData.siteId } },
              ],
            },
            query: "id title siteId relatedArtifacts { id } ",
          });

        if (otherExperiencessOfSameSiteWithSameTitle.length) {
          addValidationError(
            "This site already has an Experience with this title"
          );
        }
      }
    },
  },
});
