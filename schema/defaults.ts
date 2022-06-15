import { select, text } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const defaults = {
  title: text({ label: "Page Title", validation: { isRequired: true } }),
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
      createView: { fieldMode: "hidden" },
      itemView: { fieldMode: "hidden" },
      listView: { fieldMode: "hidden" },
    },
  }),
  siteId: text({
    isIndexed: "unique",
    ui: {
      createView: { fieldMode: "edit" },
      itemView: { fieldMode: "read" },
      listView: { fieldMode: "read" },
    },
  }),
};
