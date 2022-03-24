import BackLink from "components/BackLink";
import ContentSlider from "components/ContentSlider";
import Footer from "components/Footer";
import Header from "components/Header";
import SectionLink from "components/SectionLink";
import { format } from "date-fns";
import { getAllExperiences, getExperienceBySlug } from "lib/api";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Index({ experience, experiences }) {
  if (!experience) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto min-h-screen mx-1 md:mx-auto">
          <BackLink
            href={"/experiences?viewAll=true"}
            text={"Pick Experience"}
          />
          <p className="text-center">loading...</p>
        </div>
      </>
    );
  }
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

        <p className="mt-6">{experience.description}</p>

        <section className="container mt-4 mt-10 mx-auto">
          <h3 className="pb-3 section-title">Exhibition Preview</h3>
          <hr />
          <div className="w-full mt-4">
            <div className="flex flex-wrap">
              {experience.artworks.map((artwork, index) => (
                <div className="w-1/2 my-4" key={index}>
                  <Link
                    href={`/experiences/${experience.slug}/${artwork.slug}`}
                    passHref
                  >
                    <a>
                      <Image
                        src={
                          artwork.images
                            ? artwork.images.publicUrl
                            : "/stock-museum-1.jpg"
                        }
                        width="430"
                        height="281"
                        className="w-full px-1"
                      />
                      <h3 className="font-bold">{artwork.artist}</h3>
                      <h4>{artwork.title}</h4>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="container mt-12 mt-10 mx-auto">
          <h3 className="pb-3 section-title">Similar Experiences</h3>
          <hr />
          <div className="w-full mt-4">
            <ContentSlider items={experiences} contentType="experience" />
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
  const experience = await getExperienceBySlug(`${params.experience}`);
  const experiences = await getAllExperiences();
  return {
    props: { experience, experiences },
    revalidate: 1,
  };
}
