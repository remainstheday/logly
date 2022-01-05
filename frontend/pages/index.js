import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Logly</title>
        <meta name="description" content="Next generation museum tours" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header className="container flex justify-between px-4 py-4">
          <img src="logly.png" className="w-1/3" />
          <div className="space-y-2">
            {/* https://www.notimedad.dev/responsive-navbar-tailwind-react/ */}
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
          </div>
        </header>
        <h1 className="text-3xl text-center font-bold">
          Welcome to <br /> LOGLY
        </h1>

        <section className="intro mt-4">
          <img src="stock-museum-1.jpg" />
          <h3 className="px-4">
            Brief intro Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nobis aut impedit, minus doloribus cumque nulla eum molestiae
            eligendi obcaecati. Ratione magnam repudiandae dolorum minima
            aspernatur nostrum sit iusto rem iure.
          </h3>
        </section>

        <section className="experiences mt-10 mx-auto w-5/6">
          <h3 className="pb-3">Pick an Experience</h3>
          <hr />
          <div className="experience-slider mt-5">
            {posts.map((post) => (
              <Link key={post.id} href={post.slug}>
                <div className="experience-post">
                  <img src="stock-museum-2.jpg" />
                  <strong>{post.title}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer></footer>
    </div>
  );
}

export async function getStaticProps() {
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
  return { props: { posts: data.posts } };
}
