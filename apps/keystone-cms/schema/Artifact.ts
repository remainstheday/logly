import { list } from "@keystone-6/core";
import convertStringToURL from "../utils/convertStringToURL";
import { defaults } from "./defaults";
import { OperationAccess } from "./access";

require("dotenv").config();

export const Artifact = list({
  fields: {
    status: defaults.status,
    title: defaults.title,
    artist: defaults.artist,
    artifactImages: defaults.images("Artifact Image"),
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
      initialColumns: ["title", "status", "siteId", "relatedExperiences"],
    },
  },

  hooks: {
    afterOperation: async ({ item, operation, resolvedData, context }) => {
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
      const { title } = resolvedData;
      let siteId = (item && item.siteId) ? item!.siteId : context.session.data.siteId;
      const url = resolvedData.title
          ? `${convertStringToURL(title)}`
          : item!.url;

      return {
        ...resolvedData,
        url,
        siteId
      };
    },
  },
});
