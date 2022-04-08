require("dotenv").config();
import { list } from "@keystone-6/core";
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  file,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { Lists } from ".keystone/types";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.CLOUDINARY_KEY || "",
  apiSecret: process.env.CLOUDINARY_SECRET || "",
  folder: "experiences",
  resource_type: "auto",
};

export const lists: Lists = {
  User: list({
    fields: {
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
  }),

  StaticContent: list({
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
  }),

  Experience: list({
    access: {
      operation: {
        query: ({ context, listKey, operation }) => true,
      },
    },
    fields: {
      title: text({
        label: "Experience Title",
      }),
      slug: text({
        label: "URL Slug (e.g. /experience-name)",
        isIndexed: "unique",
        isFilterable: true,
        validation: {
          isRequired: true,
          match: { regex: new RegExp("^[^\\/\\ ]*$") },
        },
      }),
      poster: cloudinaryImage({
        cloudinary,
        label: "Poster",
      }),
      startDate: timestamp(),
      endDate: timestamp(),
      status: select({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control",
        },
      }),
      description: text({
        ui: {
          displayMode: "textarea",
        },
      }),
      artworks: relationship({ ref: "Artwork.experiences", many: true }),
    },
  }),

  Artwork: list({
    access: {
      operation: {
        query: ({ context, listKey, operation }) => true,
      },
    },
    fields: {
      title: text(),
      artist: text(),
      slug: text({ isIndexed: "unique", isFilterable: true }),
      startDate: timestamp(),
      endDate: timestamp(),
      status: select({
        options: [
          { label: "Published", value: "published" },
          { label: "Draft", value: "draft" },
        ],
        defaultValue: "draft",
        ui: {
          displayMode: "segmented-control",
        },
      }),
      audioFile: file(),
      images: cloudinaryImage({
        cloudinary,
        label: "Artwork",
      }),
      description: text({
        ui: {
          displayMode: "textarea",
        },
      }),
      experiences: relationship({ ref: "Experience.artworks", many: true }),
    },
  }),
};
