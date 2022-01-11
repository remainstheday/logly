import Head from "next/head";
import { getAllExperiences, getExperienceBySlug } from "../../lib/api";

export default function Experience({ experiences }) {
  if (!experiences) return <>loading...</>;
  return (
    <>
      {experiences.map((experience) => (
        <h1 key={experience.id}>{experience.title}</h1>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const experiences = await getAllExperiences();

  return {
    props: { experiences },
  };
}
