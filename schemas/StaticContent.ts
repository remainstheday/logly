import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { cloudinary } from "../cloudinary";

export const StaticContent = list({
  ui: {
    hideCreate: true,
    hideDelete: false,
  },
  fields: {
    name: text({
      ui: {
        itemView: {
          fieldMode: ({ session, context, item }) => "read",
        },
      },
    }),
    title: text({}),
    poster: cloudinaryImage({
      cloudinary,
      label: "Poster",
    }),
    slug: text({
      label: "URL",
      isIndexed: "unique",
      isFilterable: true,
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
    }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
  },
});
