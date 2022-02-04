import Link from "next/link";
import { getAllExperiences, getExperienceBySlug } from "../../lib/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { LogoInstagram, LogoLinkedin, ChevronBack } from "react-ionicons";

export default function Experience({ experience }) {
  if (!experience) return <>loading...</>;
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen mx-3 md:mx-0">
        <Link href="/" passHref>
          <span className="inline-flex uppercase my-8">
            <ChevronBack />
            Pick Experience
          </span>
        </Link>

        <h1 className="experience-title">{experience.title}</h1>
        <h2>{experience.startDate}</h2>
        <h2>{experience.endDate}</h2>

        <p className="mt-6">
          Brief intro Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nobis aut impedit, minus doloribus cumque nulla eum molestiae eligendi
          obcaecati. Ratione magnam repudiandae dolorum minima aspernatur
          nostrum sit iusto rem iure.
        </p>

        <section className="container mt-4 mt-10 mx-auto">
          <h3 className="pb-3">Exhibition Preview</h3>
          <hr />
          <div className="w-full mt-4">
            <div className="flex">
              {experience.artworks.map((art, index) => (
                <Link key={index} href={`/experiences`} passHref>
                  <div className="w-1/2">
                    <img
                      src={`https://admin.logly.world${art.images.url}`}
                      width="50"
                      height="50"
                    />
                    <h3>{art.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

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
