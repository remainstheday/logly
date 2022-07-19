import { list } from "@keystone-6/core";
import { defaults } from "./defaults";

export const Comment = list({
  fields: {
    timestamp: defaults.comment.timestamp,
    username: defaults.comment.username,
    image: defaults.comment.image,
    comment: defaults.comment.comment,
    experienceURL: defaults.comment.experienceURL,
    experienceTitle: defaults.comment.experienceTitle,
    artifactURL: defaults.comment.artifactURL,
    artifactTitle: defaults.comment.artifactTitle,
    siteId: defaults.siteId,
  },
  access: {
    item: {
      create: () => true,
      update: () => false,
      delete: ({ session, context, item }) =>
        !!session?.data.isAdmin || !!session?.data.siteId,
    },
  },
});
