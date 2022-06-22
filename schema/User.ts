import { list } from "@keystone-6/core";
import { checkbox, password, text } from "@keystone-6/core/fields";
import { defaults } from "./defaults";

// todo: create a new boolean hasPaid
// todo: add hasPaid to session
// todo: create custom fields in stripe for username, museumId, password, email
// todo: listen to stripe API for hasPaid
export const User = list({
  fields: {
    siteId: defaults.siteId,
    isAdmin: checkbox({
      defaultValue: false,
      ui: {
        createView: {
          fieldMode: ({ session, context }) =>
            session.data.isAdmin ? "edit" : "hidden",
        },
        itemView: {
          fieldMode: ({ session, context, item }) =>
            session.data.isAdmin ? "edit" : "hidden",
        },
        listView: {
          fieldMode: ({ session, context }) =>
            session.data.isAdmin ? "read" : "hidden",
        },
      },
    }),
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
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
    // isHidden: ({ session }: { session: Session }) => !session?.data.isAdmin,
    isHidden: false,
  },
});
