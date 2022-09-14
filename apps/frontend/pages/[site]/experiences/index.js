import {
  GET_EXPERIENCES_BY_SITE_ID,
  GET_SITE_CONTENT,
  GET_SITE_LOGO,
} from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import PageLoading from "components/PageLoading";
import PageTitle from "components/PageTitle";
import RelatedItemsGrid from "components/RelatedItemsGrid";
import Section from "components/Section";
import { useRouter } from "next/router";

export default function Experiences({ experiences, logo, homePage }) {
  const { query } = useRouter();
  if (!experiences) return <PageLoading siteId={query.site} />;
  const metaTitle = `${homePage.title}-Experiences`;
  console.log(experiences);
  return (
    <div className="flex flex-col h-screen">
      <Header siteId={query.site} logo={logo} title={metaTitle} />
      <div className="flex-grow w-full max-w-4xl mx-auto">
        <Section>
          <BackLink href={`/${query.site}`} text={"Home"} />
          <PageTitle smallText={"Pick Your"} largeText={"Experience"} />

          {experiences.length > 0 && (
            <div className="w-full mt-4">
              <RelatedItemsGrid items={experiences} mobileSideScroll={false} />
            </div>
          )}
        </Section>
      </div>
      <Footer siteId={query.site} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const siteContents = await apolloClient.query({
    query: GET_SITE_LOGO,
    variables: { siteId: params.site },
  });
  const experiences = await apolloClient.query({
    query: GET_EXPERIENCES_BY_SITE_ID,
    variables: { siteId: params.site },
  });
  const content = await apolloClient.query({
    query: GET_SITE_CONTENT,
    variables: { siteId: params.site },
  });
  const homepageContent = content.data.siteContents.find(
    (item) => item.name === "Home"
  );

  const filteredExperiences = experiences.data.experiences
    .map((experience) => ({
      ...experience,
      image: experience.experienceImages,
    }))
    .filter((experience) => experience.status === "published");

  return addApolloState(apolloClient, {
    props: {
      logo: siteContents.data.siteContents[1],
      experiences: filteredExperiences,
      homePage: homepageContent,
    },
  });
}
