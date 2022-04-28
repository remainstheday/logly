import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

export const Comment = list({
  fields: {
    name: text({
      ui: {
        createView: {
          fieldMode: ({ session, context }) => "hidden",
        },
        itemView: {
          fieldMode: ({ session, context, item }) => "read",
        },
        listView: {
          fieldMode: ({ session, context }) => "read",
        },
      },
      hooks: {
        beforeOperation: async (args) => {
          console.log(args);
        },
        afterOperation: async (args) => {
          console.log(args);
        },
      },
    }),
    comment: text({
      ui: {
        createView: {
          fieldMode: ({ session, context }) => "hidden",
        },
        itemView: {
          fieldMode: ({ session, context, item }) => "read",
        },
        listView: {
          fieldMode: ({ session, context }) => "read",
        },
      },
      hooks: {
        beforeOperation: async (args) => {
          console.log(args);
        },
        afterOperation: async (args) => {
          console.log(args);
        },
      },
    }),
    image: text({
      ui: {
        createView: {
          fieldMode: ({ session, context }) => "hidden",
        },
        itemView: {
          fieldMode: ({ session, context, item }) => "read",
        },
        listView: {
          fieldMode: ({ session, context }) => "read",
        },
      },
      label: "Comment Image",
    }),
  },
});
