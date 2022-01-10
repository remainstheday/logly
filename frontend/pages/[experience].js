import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllExperiences, getExperienceBySlug } from "../lib/api";

export default function Experience({ experience = {} }) {
  return (
    <div>
      <Head>
        <title>Logly</title>
        <meta name="description" content="Next generation museum tours" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{experience.title}</h1>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const experience = await getExperienceBySlug(`/${params.experience}`);
  return {
    props: { experience },
  };
}

export async function getStaticPaths() {
  const experiences = await getAllExperiences();
  const paths =
    experiences.map((item) => ({ params: { experience: item.slug } })) || [];

  return {
    paths,
    fallback: true,
  };
}
