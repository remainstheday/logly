import {
  GET_ALL_COMMENTS,
  GET_EXPERIENCES_BY_SITE_ID,
  GET_SITE_CONTENT,
} from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import CommentCard from "components/CommentCard";
import DescriptionContent from "components/DescriptionContent";
import Footer from "components/Footer";
import Header from "components/Header";
import PageLoading from "components/PageLoading";
import PageTitle from "components/PageTitle";
import PosterImage from "components/PosterImage";
import RelatedItemsGrid from "components/RelatedItemsGrid";
import Section from "components/Section";
import SectionLink from "components/SectionLink";
import { useRouter } from "next/router";

export default function IndexPage({ content, experiences, comments }) {
  console.log(content);
  const { query, router } = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if ((router && router.isFallback) || !content)
    return <PageLoading siteId={query.site} />;
  const metaTitle = `${query.site
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")} - Home`;
  console.log({ height: content.logoHeight, width: content.logoWidth });
  return (
    <div className="flex flex-col h-screen">
      <Header
        siteId={query.site}
        logo={{
          siteLogo: content.siteLogo,
          logoWidth: content.logoWidth,
          logoHeight: content.logoHeight,
        }}
        title={metaTitle}
      />
      <div className="flex-grow w-full max-w-4xl mx-auto">
        <Section>
          <PageTitle smallText={"welcome to"} largeText={content.title} />
          <PosterImage image={content.staticPageImages} title={content.title} />
          <DescriptionContent content={content.description.document} />
        </Section>

        {experiences.length > 0 && (
          <Section title="Pick an Experience">
            <RelatedItemsGrid items={experiences} />
            <SectionLink
              href={`/${query.site}/experiences`}
              text={"See all experiences"}
            />
          </Section>
        )}

        {comments.length > 0 && (
          <Section title="See What the Community has Shared">
            <div className="py-6 grid md:grid-cols-2 gap-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
            <div className="mt-6 px-6 md:px-0">
              <SectionLink
                href={`${query.site}/community`}
                text={"Discover the Community"}
              />
            </div>
          </Section>
        )}
      </div>
      <Footer siteId={query.site} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const content = await apolloClient.query({
    query: GET_SITE_CONTENT,
    variables: { siteId: params.site },
  });
  const homepageContent = content.data.siteContents.find(
    (item) => item.name === "Home"
  );

  const experiences = await apolloClient.query({
    query: GET_EXPERIENCES_BY_SITE_ID,
    variables: { siteId: params.site },
  });

  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
    variables: { siteId: params.site },
  });

  const filteredExperiences = experiences.data.experiences
    .map((experience) => ({
      ...experience,
      image: experience.experienceImages,
    }))
    .filter((item) => item.status === "published");

  if (!content || (content.data && content.data.siteContents.length < 1)) {
    console.log("page not found");
    return {
      notFound: true,
    };
  }
  return addApolloState(apolloClient, {
    props: {
      content: homepageContent,
      experiences: filteredExperiences,
      comments: comments.data.comments,
    },
  });
}
