require("dotenv").config();
import { list } from "@keystone-6/core";
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image,
  file,
} from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  apiKey: process.env.CLOUDINARY_KEY || "",
  apiSecret: process.env.CLOUDINARY_SECRET || "",
  folder: "experiences",
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
      password: password({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ["name"],
      },
    },
  }),

  Experience: list({
    access: {
      operation: {
        query: ({ context, listKey, operation }) => true,
      },
    },
    fields: {
      title: text(),
      secondaryTitle: text(),
      slug: text({ isIndexed: "unique", isFilterable: true }),
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
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      artworks: relationship({ ref: "Artwork", many: true }),
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
      spotifyUrl: text(),
      soundcloudUrl: text(),
      audioFile: file(),
      images: cloudinaryImage({
        cloudinary,
        label: "Artwork",
      }),
      overview: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
    },
  }),
};
