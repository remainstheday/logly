import { list } from "@keystone-6/core";
import convertStringToURL from "../utils/convertStringToURL";
import { OperationAccess } from "./access";
import { defaults } from "./defaults";

require("dotenv").config();

export const Artifact = list({
  fields: {
    status: defaults.status,
    title: defaults.title,
    dateCreated: defaults.dateCreated,
    artist: defaults.artist,
    artifactImages: defaults.images("Artifact Image"),
    caption: defaults.caption,
    altText: defaults.altText,
    audioFile: defaults.audioFile,
    description: defaults.document,
    relatedExperiences: defaults.relatedExperiences,
    url: defaults.url,
    siteId: defaults.siteId,
    qrCodes: defaults.qrCodes,
  },
  access: {
    operation: {
      query: OperationAccess.anyone,
      create: OperationAccess.adminOrSiteCuratorOnly,
      update: OperationAccess.adminOrSiteCuratorOnly,
      delete: OperationAccess.adminOrSiteCuratorOnly,
    },
    item: {
      create: ({}) => true,
      update: ({ session, item, inputData }) => {
        if (session?.data.isAdmin) return true;
        if (session?.data.siteId && session?.data.siteId === item?.siteId)
          return true;

        if (
          session?.data.siteId &&
          session?.data.siteId &&
          inputData &&
          inputData.siteId &&
          inputData.siteId !== session.data.siteId
        )
          return false;

        return false;
      },

      delete: ({ session, item }) => {
        if (session?.data.isAdmin) return true;
        return !!(
          session?.data.siteId && session?.data.siteId === item?.siteId
        );
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
        "relatedExperiences",
        "dateCreated",
      ],
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
      if (operation === "delete") {
        let allComments = await context.query.Comment.findMany({
          where: { siteId: { equals: (originalItem as any).siteId } },
          query: "id query siteId",
        });

        const commentsToUpdate = allComments.filter((comment) => {
          return (
            comment.query.artifact ==
            (originalItem.url as string).split("/").reverse()[0]
          );
        });
        await context.query.Comment.updateMany({
          data: [
            ...commentsToUpdate.map((c) => {
              let newQuery = Object.assign({}, c.query);
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
      if (item && resolvedData && resolvedData.relatedExperiences) {
        const artifact = await context.prisma.artifact.findUnique({
          where: { id: item.id },
        });
        if (artifact && resolvedData.relatedExperiences.connect) {
          resolvedData.relatedExperiences.connect.map(
            async (relatedExperience: { id: string }) => {
              const experience = await context.prisma.experience.findUnique({
                where: { id: relatedExperience.id },
              });
              return await context.query.Artifact.updateOne({
                where: { id: `${item.id}` },
                data: {
                  qrCodes: [
                    ...artifact.qrCodes,
                    {
                      experienceId: relatedExperience.id,
                      artifactId: artifact.id,
                      url: `${process.env.FRONTEND_URL}${experience.url}/${artifact.url}?social=true`,
                    },
                  ],
                },
              });
            }
          );
        }
        if (artifact && resolvedData.relatedExperiences.disconnect) {
          resolvedData.relatedExperiences.disconnect.map(
            async (relatedExperience: { id: string }) => {
              return await context.query.Artifact.updateOne({
                where: { id: `${item.id}` },
                data: {
                  qrCodes: artifact.qrCodes.filter(
                    (qrcode: {
                      experienceId: string;
                      artifactId: string;
                      url: string;
                    }) => qrcode.experienceId !== relatedExperience.id
                  ),
                },
              });
            }
          );
        }
      }
    },
    // Programmatically set the siteId for newly created Artifacts.
    // note: if an admin edits an existing artifact we should not change the siteId.
    // note: when admins create new artifacts
    resolveInput: async ({ resolvedData, item, context }) => {
      const { title, siteId } = resolvedData;
      const updatedSiteId = siteId
        ? siteId
        : item && item.siteId
        ? item.siteId
        : context.session.data.siteId;
      const url = title ? `${convertStringToURL(title)}` : item!.url;
      const res = {
        ...resolvedData,
        title,
        url,
        siteId: updatedSiteId,
      };
      return res;
    },
    validateInput: async ({
      resolvedData,
      context,
      inputData,
      addValidationError,
    }) => {
      if (resolvedData.title || resolvedData.relatedExperiences) {
        const otherArtifactsOfSameSiteWithSameTitle =
          await context.query.Artifact.findMany({
            where: {
              AND: [
                { title: { equals: resolvedData.title } },
                { siteId: { equals: resolvedData.siteId } },
                {
                  relatedExperiences: {
                    every: {
                      id: {
                        equals: resolvedData.relatedExperiences.connect[0].id,
                      },
                    },
                  },
                },
              ],
            },
            query: "id title siteId relatedExperiences { id } ",
          });

        if (otherArtifactsOfSameSiteWithSameTitle.length) {
          addValidationError(
            "This Experience already has an Artifact with this title"
          );
        }
      }
    },
  },
});
