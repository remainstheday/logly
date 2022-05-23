import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import { GET_STATIC_CONTENTS } from "apollo/api";
import PageTitle from "components/PageTitle";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import Image from "next/image";
import Section from "components/Section";
import { DocumentRenderer } from "@keystone-6/document-renderer";

export default function About({ content = [] }) {
  if (!content) return <PageLoading />;
  const page = content[0];
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen">
        <BackLink href={"/"} text={"Home"} />
        <PageTitle largeText={page.title} />
        <section className="mt-4 px-6 mt-10 mx-auto">
          {page.poster && (
            <Image
              src={page.poster.publicUrl}
              width="720"
              height="500"
              alt={page.title}
            />
          )}
          {page.description && (
            <Section>
              <DocumentRenderer document={page.description.document} />
            </Section>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_STATIC_CONTENTS,
    variables: { url: "about" },
  });
  return addApolloState(apolloClient, {
    props: { content: data.staticContents },
    revalidate: 1,
  });
}
