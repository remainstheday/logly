import { list } from "@keystone-6/core";
import { defaults } from "./defaults";

export const Comment = list({
  fields: {
    username: defaults.comment.username,
    timestamp: defaults.comment.timestamp,
    comment: defaults.comment.comment,
    image: defaults.comment.image,
    query: defaults.comment.query,
    siteId: defaults.comment.siteId,
  },
  ui: {
    hideCreate: true,
    listView: {
      initialColumns: ["username", "timestamp", "comment"],
    },
    itemView: {
      defaultFieldMode: ({}) => "read",
    },
  },
  access: {
    item: {
      create: () => true,
      update: () => false,
      delete: ({ session, context, item }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
    },
    filter: {
      query: ({ session }) => {
        if (session && session.data.isAdmin) return true;
        if (session && session?.data.siteId) {
          return {
            siteId: {
              equals: session.data.siteId,
            },
          };
        }
        return true;
      },
      update: ({ session }) => {
        if (session && session.data.isAdmin) return true;
        return session?.data.siteId
          ? { siteId: { equals: session.data.siteId } }
          : { isAdmin: { equals: true } };
      },
      delete: ({ session }) => {
        if (session && session.data.isAdmin) return true;
        return session?.data.siteId
          ? { siteId: { equals: session.data.siteId } }
          : { isAdmin: { equals: true } };
      },
    },
  },
});
