import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

export const Comment = list({
  access: {
    item: {
      create: ({ session, context, listKey, operation, inputData }) => true,
      update: ({ session, context, listKey, operation, inputData, item }) => true,
      delete: ({ session, context, listKey, operation, item }) => true,
    }
  },
  fields: {
    username: text({
      ui: {
        createView: {
          fieldMode: ({ session, context }) => "edit",
        },
        itemView: {
          fieldMode: ({ session, context, item }) => "read",
        },
        listView: {
          fieldMode: ({ session, context }) => "read",
        },
      },
      hooks: {
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
      },
    }),
    relatedExperienceId: text({
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
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
      },
    }),

    relatedMuseumId: text({
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
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
      },
    }),
    relatedArtworkId: text({
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
        beforeOperation: async (args) => {},
        afterOperation: async (args) => {},
      },
    }),
    comment: text({
      ui: {
        createView: {
          fieldMode: ({ session, context }) => "edit",
        },
        itemView: {
          fieldMode: ({ session, context, item }) => "read",
        },
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
        createView: {
          fieldMode: ({ session, context }) => "edit",
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
