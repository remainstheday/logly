import { list } from "@keystone-6/core";
import { relationship, text, timestamp } from "@keystone-6/core/fields";
import convertStringToURL from "../utils/convertStringToURL";
import { defaults } from "./defaults";

// const ItemAccess = {
//   // logly internal manage any data, logly customers manage their own data only
//   adminOrMuseumCuratorOnly: ({ session, inputData, item }: { session: Session, inputData: InputData, item: Item }) => { // fix the TypeScript defs if wrong
//     if (session?.data.isAdmin) return true;
//
//     // is a museum curator
//     const museumId = session?.data.museumId;
//     if (museumId) {
//       // for create or update
//       if (inputData) {
//         // confirm data doesn't use wrong museum
//         if (inputData.museumId !== museumId) {
//           return false;
//         }
//
//         // existing items must match
//         if (item && item.museumId === museumId) {
//           return true;
//         }
//
//         // allow create
//         return true;
//       }
//       // for delete
//       else if (item) {
//         // museum must match
//         return (item.museumId === museumId);
//       }
//     }
//
//     return false;
//   }
// }
export const Experience = list({
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
  ui: {
    listView: {
      // These are the default columns that will be displayed in the list view
      initialColumns: ["title", "status", "startDate", "endDate"],
    },
  },
  hooks: {
    resolveInput: async ({ resolvedData, item, context }) => {
      const { relatedArtifacts, title } = resolvedData;
      if (relatedArtifacts && relatedArtifacts.connect.length > 0) {
        const artifacts = await relatedArtifacts.connect.map(
          (artifactId: { id: string }) =>
            context.query.Artifact.findOne({
              where: { id: artifactId.id },
              query: "id url",
            })
        );

        Promise.all(artifacts).then((values) => {
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
        });
      }

      return {
        ...resolvedData,
        url: resolvedData.title ? convertStringToURL(title) : undefined,
        siteId: resolvedData.siteId ? undefined : context.session.data.siteId,
      };
    },
  },
});
