import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import Link from "next/link";
import React from "react";
import {
  DocumentRenderer,
  DocumentRendererProps,
} from "@keystone-6/document-renderer";
import { gql } from "@apollo/client";
import client from "../apollo-client";

const renderers = {
  // Render heading blocks
  block: {
    heading({ level, children, textAlign }) {
      const Comp = `h${level}`;
      return (
        <Comp style={{ textAlign, textTransform: "uppercase" }}>
          {children}
        </Comp>
      );
    },
  },
  // Render inline relationships
  inline: {
    relationship({ relationship, data }) {
      // If there is more than one inline relationship defined on the document
      // field we need to handle each of them separately by checking the `relationship` argument.
      // It is good practice to include this check even if you only have a single inline relationship.
      if (relationship === "mention") {
        if (data === null || data.data === undefined) {
          // data can be null if the content writer inserted a mention but didn't select an author to mention.
          // data.data can be undefined if the logged in user does not have permission to read the linked item
          // or if the linked item no longer exists.
          return <span>[unknown author]</span>;
        } else {
          // If the data exists then we render the mention as a link to the author's bio.
          // We have access to `id` an `name` fields here because we named them in the
          // `selection` config argument.
          return <Link href={`/author/${data.data.id}`}>{data.data.name}</Link>;
        }
      }
      return null;
    },
  },
};

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>

      {post.content.document && (
        <DocumentRenderer
          document={post.content.document}
          renderers={renderers}
        />
      )}
    </article>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        posts {
          slug
        }
      }
    `,
  });
  return {
    paths: data.posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const data = await client.query({
    query: gql`
      query ($slug: String!) {
        post(where: { slug: $slug }) {
          title
          content {
            document(hydrateRelationships: true)
          }
          publishDate
          author {
            id
            name
          }
        }
      }
    `,
  });
  return { props: { post: data.post }, revalidate: 60 };
}
