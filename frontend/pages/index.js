import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function Home({ posts = [] }) {
  return (
    <div>
      <Head>
        <title>Logly</title>
        <meta name="description" content="Next generation museum tours" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header className="container flex justify-between px-4 py-4">
          <Image
            src="/logly.png"
            className="w-1/3"
            alt="logly-logo"
            width="50"
            height="50"
          />
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
          <Image src="/stock-museum-1.jpg" alt="stock-image" layout="fill" />
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
            {posts.map((post, index) => (
              <div key={index} className="experience-post">
                <Image
                  src="/stock-museum-2.jpg"
                  alt="stock-image-2"
                  layout="fill"
                />
                <strong>{post.title}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer></footer>
    </div>
  );
}

// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: gql`
//       query {
//         posts {
//           slug
//           title
//         }
//       }
//     `,
//   });

//   return { props: { posts: data.posts } };
// }
