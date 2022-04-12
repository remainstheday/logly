import { KeystoneContext } from "@keystone-6/core/types";

async function addComment(
  root: any,
  { comment }: { comment: string },
  context: KeystoneContext
): Promise<any> {
  return await context.db.Comment.createOne({
    data: {
      comment,
    },
  });
}

export default addComment;
