import Head from "next/head";
import { getAllExperiences, getExperienceBySlug } from "../../lib/api";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Experience({ experience }) {
  if (!experience) return <>loading...</>;
  return (
    <>
      <Header />
      <main>
        <h1>{experience.title}</h1>
      </main>
      <Footer />
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
