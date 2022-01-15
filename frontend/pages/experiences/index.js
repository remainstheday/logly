import { getAllExperiences, getExperienceBySlug } from "../../lib/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Experience({ experiences }) {
  if (!experiences) return <>loading...</>;
  return (
    <div>
      <Header />
      {experiences.map((experience) => (
        <h1 key={experience.id}>{experience.title}</h1>
      ))}
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const experiences = await getAllExperiences();

  return {
    props: { experiences },
  };
}
