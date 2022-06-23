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
    qrCodes: defaults.qrCodes,
  },
  access: {
    operation: {
      query: () => true,
      create: ({ session, context, operation }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
      update: ({ session, context }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
      delete: ({ session }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
    },
    item: {
      create: ({}) => true,
      update: ({ session, context, inputData, item }) => {
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
      initialColumns: ["title", "status", "startDate", "endDate"],
    },
  },
  hooks: {
    resolveInput: async ({ resolvedData, item, context }) => {
      const { relatedArtifacts, title } = resolvedData;

      // these should return undefined if the data already exists so we don't mutate them
      const siteId = resolvedData.siteId
        ? undefined
        : context.session.data.siteId;
      const url = resolvedData.title
        ? `/${siteId}/experiences/${convertStringToURL(title)}`
        : item!.url;
      const qrCodes = [`${process.env.FRONTEND_URL}${url}`];

      if (relatedArtifacts && relatedArtifacts.connect.length > 0) {
        relatedArtifacts.connect.map(
          async (relatedArtifact: { id: string }) => {
            const artifact = await context.prisma.artifact.findUnique({
              where: { id: relatedArtifact.id },
            });
            await context.query.Artifact.updateOne({
              where: { id: relatedArtifact.id },
              data: {
                qrCodes: [`${process.env.FRONTEND_URL}${url}/${artifact.url}`],
              },
            });
          }
        );

        // const artifacts = await relatedArtifacts.connect.map(
        //   (artifact: { id: string }) =>
        //     context.query.Artifact.findOne({
        //       where: { id: artifact.id },
        //     })
        // );
        // Promise.all(artifacts).then((values) => {
        //   return {
        //     ...resolvedData,
        //     qrCodes: [
        //       ...existingQRCodes,
        //       ...values.map(
        //         (value) =>
        //           `${process.env.FRONTEND_URL}/experiences/${value.url}/${
        //             item!.url
        //           }?social=true`
        //       ),
        //     ],
        //   };
        // });
      }

      return {
        ...resolvedData,
        qrCodes,
        url,
        siteId,
      };
    },
  },
});
