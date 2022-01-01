import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import { query } from ".keystone/api";
import { DocumentRenderer } from "@keystone-6/document-renderer";

type Post = {
  id: string;
  title: string;
  content: { document: any };
};

export default function PostPage({ post }: any) {
  return (
    <div>
      <main style={{ margin: "3rem" }}>
        <div>
          <Link href="/">
            <a>&larr; back home</a>
          </Link>
        </div>
        {/* <h1>{post.title}</h1> */}
        <DocumentRenderer document={post.content.document} />
      </main>
    </div>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = (await query.Post.findMany({
    query: `slug`,
  })) as { slug: string }[];

  const paths = posts
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => `/post/${slug}`);

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }: GetStaticPropsContext) {
  const post = (await query.Post.findOne({
    where: { slug: params!.slug as string },
    query: "id title content { document }",
  })) as Post | null;
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
}
