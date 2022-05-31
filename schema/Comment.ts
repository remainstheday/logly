import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

export const Comment = list({
  fields: {
    timestamp: text({
      ui: {
        createView: { fieldMode: "edit" },
        itemView: { fieldMode: "read" },
        listView: {
          fieldMode: ({ session, context }) => "read",
        },
      },
    }),
    username: text({
      ui: {
        createView: { fieldMode: "edit" },
        itemView: { fieldMode: "read" },
        listView: {
          fieldMode: ({ session, context }) => "read",
        },
      },
    }),
    image: text({
      ui: {
        views: require.resolve("../fields/comment/view.tsx"),
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
      label: "Image",
    }),
    comment: text({
      ui: {},
    }),
    experienceURL: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
    }),
    artworkURL: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
    }),
    siteId: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
      },
    }),
  },
  access: {
    item: {
      create: ({ session, context, listKey, operation, inputData }) => true,
      update: ({ session, context, listKey, operation, inputData, item }) =>
        true,
      delete: ({ session, context, listKey, operation, item }) => true,
    },
  },
});
