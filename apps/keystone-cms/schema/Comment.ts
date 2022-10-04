import { list, graphql } from "@keystone-6/core";
import { text, virtual } from "@keystone-6/core/fields";
import { defaults } from "./defaults";
import { Site } from "./Site";

export const Comment = list({
  fields: {
    username: defaults.comment.username,
    timestamp: defaults.comment.timestamp,
    comment: defaults.comment.comment,
    link: virtual({
      ui: {
        listView: { fieldMode: 'hidden' },
        views: require.resolve('../fields/comment-link/comment-link')
      },
      field: graphql.field({
        type: graphql.String,
        resolve: (item:any) => {

          let res = `${process.env.FRONTEND_URL}/${item?.query?.site || '' }`

          if (item.query?.experience) {
          
            res += `/experiences/${item.query.experience}`
            if (item.query?.artifact) {
              res += `/${item.query.artifact}`
            }
          
          }
          return res
        }
      })
    }),
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
      update: ({ session }) =>
        session?.data.isAdmin || session?.data.siteId,
      delete: ({ session }) =>
        session?.data.isAdmin || session?.data.siteId,
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
