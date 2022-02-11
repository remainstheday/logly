import { useRouter } from "next/router";
import Link from "next/link";
import { getAllExperiences } from "../../lib/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Tab from "../../components/Tab";
import Thumbnail from "../../components/Thumbnail";

export default function Experience({ experiences }) {
  const { query } = useRouter();
  const isViewAllSelected = !!query.viewAll;
  const isOngoingSelected = !!query.onGoing;
  const isClosingSoonSelected = !!query.closingSoon;
  const isLongTermSelected = !!query.longTerm;

  if (!experiences) return <>loading...</>;

  const renderExperiences = (filteredExperience, title) => {
    return (
      <>
        <h3 className="pb-3 mt-6 section-title">{title}</h3>
        <hr />
        <div className="mt-6 flex flex-row flex-wrap space-y-1">
          {filteredExperience.map((experience) => (
            <div key={experience.id} className="w-1/2">
              <Thumbnail
                href={
                  `/stock-museum-1.jpg` ||
                  `https://admin.logly.world${experience.slug}`
                }
                title={experience.title}
                image={experience.poster.publicUrl}
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
        <Link href={`/`}>HOME</Link>
        <h1 className="text-5xl text-center">Pick Your Experience</h1>
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

export async function getStaticProps() {
  const experiences = await getAllExperiences();

  return {
    props: { experiences },
  };
}
