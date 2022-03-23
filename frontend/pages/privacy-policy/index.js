import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import { getStaticContents } from "lib/api";

export default function Privacy({
  content = [{ name: "blah", title: "blah", description: "blah" }],
}) {
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
  const content = await getStaticContents("privacy-policy");
  return {
    props: { content },
  };
}
