import { useRouter } from "next/router";
import { GET_ALL_EXPERIENCES } from "lib/api";
import Header from "components/Header";
import Footer from "components/Footer";
import Tab from "components/Tab";
import Thumbnail from "components/Thumbnail";
import BackLink from "components/BackLink";
import React from "react";
import PageTitle from "components/PageTitle";
import client from "lib/apollo-client";
import Loading from "components/Loading";

export default function Experience({ experiences }) {
  const { query } = useRouter();
  const isViewAllSelected = !!query.viewAll;
  const isOngoingSelected = !!query.onGoing;
  const isClosingSoonSelected = !!query.closingSoon;
  const isLongTermSelected = !!query.longTerm;

  if (!experiences) return <Loading />;

  const renderExperiences = (filteredExperience, title) => {
    return (
      <>
        <h3 className="pb-3 mt-6 section-title">{title}</h3>
        <hr />
        <div className="mt-6 flex flex-row flex-wrap space-y-8">
          {filteredExperience.map((experience) => (
            <div key={experience.id} className="w-1/2">
              <Thumbnail
                href={`/experiences/${experience.slug}`}
                title={experience.title}
                image={experience.poster ? experience.poster.publicUrl : ""}
                imgWidth={300}
                imgHeight={200}
              />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="max-w-4xl mx-auto min-h-screen">
        <Header />
        <BackLink href={"/"} text={"Home"} />
        <PageTitle smallText={"Pick Your"} largeText={"Experience"} />
        <nav className="mt-6 mb-6">
          <Tab
            href="/experiences?viewAll=true"
            title="View All"
            isSelected={isViewAllSelected}
          />
          <Tab
            href="/experiences?onGoing=true"
            title="On Going"
            isSelected={isOngoingSelected}
          />
          <Tab
            href="/experiences?closingSoon=true"
            title="Closing Soon"
            isSelected={isClosingSoonSelected}
          />
          <Tab
            href="/experiences?longTerm=true"
            title="Long Term"
            isSelected={isLongTermSelected}
          />
        </nav>

        <section className="container mt-4 mt-10 mx-auto">
          {(isViewAllSelected || isOngoingSelected) &&
            renderExperiences(
              experiences.filter((experience) => experience),
              "On Going"
            )}

          {(isViewAllSelected || isClosingSoonSelected) &&
            renderExperiences(
              experiences.filter((experience) => experience),
              "Closing Soon"
            )}

          {(isViewAllSelected || isLongTermSelected) &&
            renderExperiences(
              experiences.filter((experience) => experience),
              "Long Term"
            )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_ALL_EXPERIENCES,
  });

  return { props: { experiences: data.experiences } };
}
