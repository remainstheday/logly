import { list } from "@keystone-6/core";
import { checkbox, password, text } from "@keystone-6/core/fields";
import { defaults } from "./defaults";

export const User = list({
  fields: {
    siteId: defaults.siteId,
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
