import React from "react";
import { GetStaticProps } from "next";
import {
  DocumentRenderer,
  DocumentRendererProps,
} from "@keystone-6/document-renderer";
import { gql } from "@apollo/client";
import client from "../../apollo-client";

export default function Experience() {
  return (
    <article>
      <h1>hello world</h1>
      {/* <h1>{post.title}</h1> */}
    </article>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        posts {
          slug
          title
        }
      }
    `,
  });
  return {
    paths: data.posts.map((post) => ({
      params: { slug: "/abstract-visions" },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query Post($slug: String!) {
        post(where: { slug: $slug }) {
          slug
          title
        }
      }
    `,
  });
  return { props: { post: data.post } };
}
