import {
  json,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const defaults = {
  artist: text({ validation: { isRequired: true } }),
  title: text({ label: "Page Title", validation: { isRequired: true } }),
  qrCodes: json({
    defaultValue: [],
    ui: {
      views: require.resolve("../fields/qrcode/view.tsx"),
      createView: { fieldMode: "hidden" },
      itemView: { fieldMode: "read" },
      listView: { fieldMode: "hidden" },
    },
  }),
  relatedExperiences: relationship({
    ref: "Experience.relatedArtifacts",
    many: true,
    ui: {
      createView: { fieldMode: "edit" },
      listView: { fieldMode: "read" },
      itemView: { fieldMode: "edit" },
    },
  }),
  images: (label = "Image Uploads") =>
    text({
      label,
      ui: {
        views: require.resolve("../fields/image-uploader/view.tsx"),
        createView: { fieldMode: "edit" },
        listView: { fieldMode: "hidden" },
        itemView: { fieldMode: "edit" },
      },
    }),
  audioFile: text({
    ui: {
      views: require.resolve("../fields/audiofile/view.tsx"),
      createView: { fieldMode: "edit" },
      listView: { fieldMode: "hidden" },
      itemView: { fieldMode: "edit" },
    },
  }),
  status: select({
    type: "enum",
    options: [
      { label: "Published", value: "published" },
      { label: "Draft", value: "draft" },
    ],
    validation: {
      isRequired: true,
    },
    defaultValue: "draft",
    ui: {
      displayMode: "segmented-control",
    },
  }),
  document: document({
    formatting: {
      headingLevels: [2, 3, 4, 5, 6],
      inlineMarks: {
        bold: true,
        italic: true,
        underline: true,
        strikethrough: true,
      },
      listTypes: {
        ordered: true,
        unordered: true,
      },
      blockTypes: {
        blockquote: true,
      },
      softBreaks: true,
    },
    dividers: true,
    links: true,
  }),
  url: text({
    isIndexed: "unique",
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
  siteId: text({
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
  comment: {
    timestamp: timestamp({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: {
          fieldMode: ({ session, context }) => "read",
        },
      },
    }),
    username: text({
      ui: {
        createView: { fieldMode: "edit" },
        itemView: { fieldMode: "read" },
        listView: {
          fieldMode: ({ session, context }) => "read",
        },
      },
    }),
    image: text({
      ui: {
        views: require.resolve("../fields/comment/view.tsx"),
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
      label: "Image",
    }),
    comment: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
    }),
    experienceURL: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
    }),
    artifactURL: text({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: { fieldMode: "read" },
      },
    }),
  },
};
