import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

export const Comment = list({
  fields: {
    experienceId: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
      hooks: {
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
      },
    }),
    siteId: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
      },
      hooks: {
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
      },
    }),
    artworkId: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
      hooks: {
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
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
      hooks: {
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
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
      ui: {
        createView: { fieldMode: "edit" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
      hooks: {
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
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
