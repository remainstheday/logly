import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import { GET_STATIC_CONTENTS } from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import Section from "components/Section";
import { DocumentRenderer } from "@keystone-6/document-renderer";

export default function Terms({ content = [] }) {
  if (!content) return <PageLoading />;
  const page = content[0];
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen">
        <BackLink href={"/"} text={"Home"} />
        <PageTitle largeText={page.title} />
        {page.description && (
          <Section>
            <DocumentRenderer document={page.description.document} />
          </Section>
        )}
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_STATIC_CONTENTS,
    variables: { slug: "termsofuse" },
  });

  return addApolloState(apolloClient, {
    props: { content: data.staticContents },
    revalidate: 1,
  });
}
