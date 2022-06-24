import { list } from "@keystone-6/core";
import { json, relationship, text } from "@keystone-6/core/fields";
import convertStringToURL from "../utils/convertStringToURL";
import { defaults } from "./defaults";
import { ItemAccess, OperationAccess } from "./access";

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
      initialColumns: ["title", "status", "relatedExperiences"],
    },
  },

  hooks: {
    resolveInput: async ({ resolvedData, item, context }) => {
      const { relatedExperiences, title } = resolvedData;
      const siteId = resolvedData.siteId
        ? undefined
        : context.session.data.siteId;
      const url = resolvedData.title
        ? `${convertStringToURL(title)}`
        : undefined;

      if (relatedExperiences && relatedExperiences.disconnect.length > 0) {
        // todo: remove qr code by experienceId from list
        relatedExperiences.disconnect.map(
          async (relatedExperience: { id: string }) => {
            const experience = await context.prisma.experience.findUnique({
              where: { id: relatedExperience.id },
            });
          }
        );
      }
      return {
        ...resolvedData,
        url,
        siteId,
      };
    },
  },
});
