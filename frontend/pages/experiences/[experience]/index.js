import Link from "next/link";
import { getAllExperiences, getExperienceBySlug } from "lib/api";
import Header from "components/Header";
import Footer from "components/Footer";
import Carousel from "components/Carousel";
import SectionLink from "components/SectionLink";
import { format } from "date-fns";
import React from "react";
import BackLink from "components/BackLink";

export default function Index({ experience, experiences }) {
  if (!experience) return <>loading...</>;
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen mx-1 md:mx-auto">
        <BackLink href={"/experiences?viewAll=true"} text={"Pick Experience"} />

        <h1 className="experience-title">{experience.title}</h1>

        <span className="date-tag">
          {format(new Date(experience.startDate), "MMMM dd, yyyy")}
          {experience.endDate &&
            ` - ${format(new Date(experience.endDate), "MMM dd, yyyy")}`}
        </span>

        <p className="mt-6">
          Brief intro Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nobis aut impedit, minus doloribus cumque nulla eum molestiae eligendi
          obcaecati. Ratione magnam repudiandae dolorum minima aspernatur
          nostrum sit iusto rem iure.
        </p>

        <section className="container mt-4 mt-10 mx-auto">
          <h3 className="pb-3 section-title">Exhibition Preview</h3>
          <hr />
          <div className="w-full mt-4">
            <div className="flex">
              {experience.artworks.map((artwork, index) => (
                <div className="w-1/2" key={index}>
                  <Link
                    href={`/experiences${experience.slug}/${artwork.slug}`}
                    passHref
                  >
                    <a>
                      <img
                        src={
                          artwork.images
                            ? artwork.images.publicUrl
                            : "/stock-museum-1.jpg"
                        }
                        className="w-full px-1"
                      />
                      <h3>{artwork.title}</h3>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="container mt-4 mt-10 mx-auto">
          <h3 className="pb-3 section-title">Similar Experiences</h3>
          <hr />
          <div className="w-full mt-4">
            <Carousel experiences={experiences} />
            <SectionLink
              href={`/experiences?viewAll=true`}
              text={"See all experiences"}
            />
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
  const experiences = await getAllExperiences();
  return {
    props: { experience, experiences },
  };
}
