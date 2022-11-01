import { list } from "@keystone-6/core";
import { checkbox, password, text } from "@keystone-6/core/fields";

export const User = list({
  fields: {
    siteId: text({
      ui: {
        createView: {
          fieldMode: ({ session }) =>
            session.data.isAdmin ? "edit" : "hidden",
        },
        itemView: {
          fieldMode: ({ session }) =>
            session.data.isAdmin ? "edit" : "hidden",
        },
        listView: {
          fieldMode: ({ session }) =>
            session.data.isAdmin ? "read" : "hidden",
        },
      },
    }),
    isAdmin: checkbox({
      defaultValue: false,
      ui: {
        createView: {
          fieldMode: ({ session }) =>
            session.data.isAdmin ? "edit" : "hidden",
        },
        itemView: {
          fieldMode: ({ session }) =>
            session.data.isAdmin ? "edit" : "hidden",
        },
        listView: {
          fieldMode: ({ session }) =>
            session.data.isAdmin ? "read" : "hidden",
        },
      },
    }),
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: {
        isRequired: true,
        match: {
          regex:
            /^(([^A-Z<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/,
          explanation: "emails should be written in lowercase and be valid",
        },
      },
      isIndexed: "unique",
      isFilterable: true,
    }),
    password: password({
      validation: {
        length: { min: 7, max: 1000 },
        isRequired: true,
        rejectCommon: true,
      },
    }),
  },
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: ({ session }) => session?.data.isAdmin,
      delete: ({ session }) => session?.data.isAdmin,
    },
  },
  ui: {
    isHidden: ({ session }) => !session?.data.isAdmin,
  },
});
