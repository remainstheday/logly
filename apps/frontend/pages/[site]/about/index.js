import { DocumentRenderer } from "@keystone-6/document-renderer";
import { GET_SITE_CONTENT } from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import PageLoading from "components/PageLoading";
import PageTitle from "components/PageTitle";
import PosterImage from "components/PosterImage";
import Section from "components/Section";
import { useRouter } from "next/router";

export default function About({ logo, content }) {
  const { query } = useRouter();
  if (!content) return <PageLoading siteId={query.site} />;

  const metaTitle = `${query.site
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")} - About`;
  return (
    <div className="flex flex-col h-screen">
      <Header siteId={query.site} logo={logo} title={metaTitle} />
      <div className="flex-grow w-full max-w-4xl mx-auto">
        <Section>
          <BackLink href={`/${query.site}`} text={"Home"} />
          <PageTitle largeText={content.title} />
          <div className="mt-6">
            {content.staticPageImages && (
              <PosterImage
                image={content.staticPageImages}
                title={content.title}
              />
            )}
            {content.description && (
              <div className="wysiwyg-editor">
                <DocumentRenderer document={content.description.document} />
              </div>
            )}
          </div>
        </Section>
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
  return addApolloState(apolloClient, {
    props: {
      logo: homepageContent,
      content: content.data.siteContents.find(
        (item) => item.url === `${params.site}/about`
      ),
    },
  });
}
