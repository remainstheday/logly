import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import { GET_STATIC_CONTENTS } from "lib/api";
import client from "lib/apollo-client";
import Loading from "components/Loading";

export default function Privacy({ content = [] }) {
  if (!content) return <Loading />;
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
  const content = await client.query({
    query: GET_STATIC_CONTENTS,
    variables: { slug: "privacy-policy" },
  });
  return {
    props: { content: content.data.staticContents },
  };
}
