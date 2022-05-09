import { list } from "@keystone-6/core";
import {checkbox, password, text} from "@keystone-6/core/fields";

export const User = list({
  fields: {
    museumId: text({}),
    isAdmin: checkbox({
      defaultValue: false,
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
    listView: {
      initialColumns: ["name"],
    },
  },
});
