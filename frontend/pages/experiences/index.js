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

  const onGoingExperiences = experiences.filter(
    (experience) => experience.endDate
  );
  const closingSoonExpriences = experiences.filter(
    (experience) => experience.endDate
  );
  const longTermExpriences = experiences.filter(
    (experience) => experience.endDate
  );

  console.log(experiences);

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

        {isViewAllSelected &&
          experiences.map((experience) => (
            <div key={experience.id} className="w-1/2">
              <Thumbnail
                href={
                  `/stock-museum-1.jpg` ||
                  `https://admin.logly.world${experience.slug}`
                }
                title={experience.title}
                image={`https://admin.logly.world${experience.poster.url}`}
              />
            </div>
          ))}
        {isOngoingSelected &&
          onGoingExperiences.map((experience) => (
            <h1 key={experience.id}>{experience.title}</h1>
          ))}
        {isClosingSoonSelected &&
          closingSoonExpriences.map((experience) => (
            <h1 key={experience.id}>{experience.title}</h1>
          ))}
        {isLongTermSelected &&
          longTermExpriences.map((experience) => (
            <h1 key={experience.id}>{experience.title}</h1>
          ))}
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
