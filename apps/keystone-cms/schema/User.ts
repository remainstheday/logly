import { list } from "@keystone-6/core";
import { checkbox, password, text } from "@keystone-6/core/fields";

// todo: create a new boolean hasPaid
// todo: add hasPaid to session
// todo: create custom fields in stripe for username, museumId, password, email
// todo: listen to stripe API for hasPaid
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
      hooks: {
        validateInput: async ({
          listKey,
          operation,
          inputData,
          item,
          resolvedData,
          context,
          addValidationError,
        }) => {
          const reservedSites = [
            "contact",
            "faq",
            "pricing",
            "register",
            "about",
            "media",
            "terms of use",
            "privacy policy",
            "terms-of-use",
            "privacy-policy",
          ];

          let error;
          if (reservedSites.some((site) => site === inputData.siteId)) {
            error = "reserved keywords cannot be used as an organization name";
            addValidationError(error);
          }
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
  ui: {
    isHidden: ({ session }) => !session?.data.isAdmin,
  },
});
