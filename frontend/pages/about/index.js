import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import { GET_STATIC_CONTENTS } from "apollo/api";
import PageTitle from "components/PageTitle";
import client from "apollo/apollo-client";
import PageLoading from "components/PageLoading";

export default function About({ content = [] }) {
  if (!content) return <PageLoading />;
  const page = content[0];
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen">
        <BackLink href={"/"} text={"Home"} />
        <PageTitle largeText={page.title} />
        <p className="mt-6">{page.description}</p>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_STATIC_CONTENTS,
    variables: { slug: "about" },
  });
  return { props: { content: data.staticContents } };
}
