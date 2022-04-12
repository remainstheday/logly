import { list } from "@keystone-6/core";
import { text } from "@keystone-6/core/fields";

export const Comment = list({
  fields: {
    comment: text({
     ui: {
         createView: {
             fieldMode: ({ session, context }) => 'hidden',
         },
         itemView: {
             fieldMode: ({ session, context, item }) => 'read',
         },
         listView: {
             fieldMode: ({ session, context }) => 'read',
         },

     }
    }),
  },
});
