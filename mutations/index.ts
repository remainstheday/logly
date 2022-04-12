import { graphQLSchemaExtension } from "@keystone-6/core";
import addComment from "./addComment";

const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addComment(comment: String!): Comment
    }
  `,
  resolvers: {
    Mutation: {
      addComment,
    },
  },
});
