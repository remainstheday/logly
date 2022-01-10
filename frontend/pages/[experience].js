import Head from "next/head";
import { getAllExperiences, getExperienceBySlug } from "../lib/api";
import { useRouter } from "next/router";

export default function Experience({ experience }) {
  const router = useRouter();

  if (!router.isFallback && !experience?.slug) {
    return <h1>routing error</h1>;
  }

  return (
    <>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
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
      )}
    </>
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
