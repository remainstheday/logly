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
    afterOperation: async ({
      listKey,
      operation,
      inputData,
      originalItem,
      item,
      resolvedData,
      context,
    }) => {
      // console.log(item);
      console.log(item);
      // if (item && resolvedData && resolvedData.relatedExperiences) {
      //   resolvedData.relatedExperiences.connect.map(
      //     async (relatedExperience: { id: string }) => {
      //       return await context.query.Artifact.updateOne({
      //         where: { id: `${item.id}` },
      //         data: {
      //           qrCodes: item.qrCodes.filter(
      //             (qrcode: {
      //               experienceId: string;
      //               artifactId: string;
      //               url: string;
      //             }) => qrcode.experienceId !== relatedExperience.id
      //           ),
      //         },
      //       });
      //     }
      //   );
      // }
    },
    resolveInput: async ({ resolvedData, item, context }) => {
      const { relatedExperiences, title } = resolvedData;
      const siteId = resolvedData.siteId
        ? undefined
        : context.session.data.siteId;
      const artifactId = item ? item.id : resolvedData.id;
      const url = resolvedData.title
        ? `${convertStringToURL(title)}`
        : undefined;
      // const artifact = await context.prisma.artifact.findUnique({
      //   where: { id: item ? item!.id : resolvedData.id },
      // });
      const artifact = { qrCodes: [] };

      // if (
      //   relatedExperiences &&
      //   relatedExperiences.connect &&
      //   relatedExperiences.connect.length > 0
      // ) {
      //   relatedExperiences.connect.map(
      //     async (relatedExperience: { id: string }) => {
      //       const experience = await context.prisma.experience.findUnique({
      //         where: { id: relatedExperience.id },
      //       });
      //
      //       await context.query.Artifact.updateOne({
      //         where: { id: artifactId },
      //         data: {
      //           qrCodes: [
      //             ...artifact.qrCodes,
      //             {
      //               experienceId: relatedExperience.id,
      //               artifactId,
      //               url: `${process.env.FRONTEND_URL}${experience.url}/${
      //                 item!.url
      //               }`,
      //             },
      //           ],
      //         },
      //       });
      //     }
      //   );
      // }
      //
      // if (
      //   relatedExperiences &&
      //   relatedExperiences.disconnect &&
      //   relatedExperiences.disconnect.length > 0
      // ) {
      //   relatedExperiences.disconnect.map(
      //     async (relatedExperience: { id: string }) => {
      //       return await context.query.Artifact.updateOne({
      //         where: { id: artifactId },
      //         data: {
      //           qrCodes: artifact.qrCodes.filter(
      //             (qrcode: {
      //               experienceId: string;
      //               artifactId: string;
      //               url: string;
      //             }) => qrcode.experienceId !== relatedExperience.id
      //           ),
      //         },
      //       });
      //     }
      //   );
      // }
      return {
        ...resolvedData,
        url,
        siteId,
      };
    },
  },
});
