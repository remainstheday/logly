import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

export const Museum = list({
  fields: {
    Title: text({ label: "Name" }),
    slug: text({
      label: "url",
      validation: {
        isRequired: true,
      },
    }),
  },
});
