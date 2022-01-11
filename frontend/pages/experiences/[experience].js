import Head from "next/head";
import { getAllExperiences, getExperienceBySlug } from "../../lib/api";
import { useRouter } from "next/router";

export default function Experience({ experience }) {
  if (!experience) return <>loading...</>;
  return (
    <>
      <Head>
        <title>Logly</title>
        <meta name="description" content="Next generation museum tours" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{experience.title}</h1>
      </main>
    </>
  );
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

export async function getStaticProps({ params }) {
  const experience = await getExperienceBySlug(`/${params.experience}`);
  return {
    props: { experience },
  };
}
