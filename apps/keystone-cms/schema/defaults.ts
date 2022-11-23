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
  dateCreated: timestamp({
    defaultValue: { kind: "now" },
    validation: { isRequired: true },
    ui: {
      createView: { fieldMode: "hidden" },
      listView: { fieldMode: "read" },
      itemView: { fieldMode: "read" },
    },
  }),
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
      hideCreate: true,
      createView: { fieldMode: "edit" },
      listView: { fieldMode: "read" },
      itemView: { fieldMode: "edit" },
    },
  }),
  images: (label = "Image Uploads", canCreate = true) =>
    text({
      label,
      ui: {
        views: require.resolve("../fields/image-uploader/view.tsx"),
        createView: { fieldMode: canCreate ? "edit" : "hidden" },
        listView: { fieldMode: "hidden" },
        itemView: { fieldMode: "edit" },
      },
    }),
  caption: text({ label: "Image Caption" }),
  altText: text({ label: "Image Alt Text" }),
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
      displayMode: "radio",
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
        fieldMode: ({ session }) => (session.data.isAdmin ? "edit" : "hidden"),
      },
      itemView: {
        fieldMode: ({ session }) => (session.data.isAdmin ? "edit" : "hidden"),
      },
      listView: {
        fieldMode: ({ session }) => (session.data.isAdmin ? "read" : "hidden"),
      },
    },
  }),
  artifactUrl: text({
    ui: {
      createView: {
        fieldMode: ({ session }) => (session.data.isAdmin ? "edit" : "hidden"),
      },
      itemView: {
        fieldMode: ({ session }) => (session.data.isAdmin ? "edit" : "hidden"),
      },
      listView: {
        fieldMode: ({ session }) => (session.data.isAdmin ? "read" : "hidden"),
      },
    },
  }),
  siteId: text({
    ui: {
      createView: {
        fieldMode: ({ session }) => (session.data.isAdmin ? "edit" : "hidden"),
      },
      itemView: {
        fieldMode: ({ session }) => (session.data.isAdmin ? "read" : "hidden"),
      },
      listView: {
        fieldMode: ({ session }) => (session.data.isAdmin ? "read" : "hidden"),
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
  comment: {
    query: json({
      defaultValue: {},
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "hidden" },
        listView: { fieldMode: "hidden" },
      },
    }),
    timestamp: timestamp({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        listView: {
          fieldMode: () => "read",
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
    siteId: text({
      ui: {
        createView: {
          fieldMode: () => "hidden",
        },
        itemView: {
          fieldMode: ({ session }) =>
            session.data.isAdmin ? "read" : "hidden",
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
  },
};
