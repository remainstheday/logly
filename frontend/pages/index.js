import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllExperiences, getExperienceBySlug } from "../lib/api";

export default function Home({ experiences = [] }) {
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
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
          </div>
        </header>
        <h1 className="text-3xl text-center font-bold">
          Welcome to <br /> LOGLY
        </h1>

        <section className="container mx-auto mt-4 px-4">
          <h3 className="px-4">
            Brief intro Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nobis aut impedit, minus doloribus cumque nulla eum molestiae
            eligendi obcaecati. Ratione magnam repudiandae dolorum minima
            aspernatur nostrum sit iusto rem iure.
          </h3>
        </section>

        <section className="container  mt-4 px-4 mt-10 mx-auto ">
          <h3 className="pb-3">Pick an Experience</h3>
          <hr />
          <div className="experience-slider max-w-md mt-5 w-5/6">
            {experiences.map((experience, index) => (
              <div key={index} className="experience-post">
                <Link href={`/experiences${experience.slug}`} passHref>
                  <strong>{experience.title}</strong>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const experiences = await getAllExperiences();

  return {
    props: { experiences },
  };
}
