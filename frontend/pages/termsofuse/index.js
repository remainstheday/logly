import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import { getStaticContents } from "lib/api";

export default function Terms({
  content = [{ name: "blah", title: "blah", description: "blah" }],
}) {
  if (!content) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto min-h-screen mx-1 md:mx-auto">
          <BackLink
            href={"/experiences?viewAll=true"}
            text={"Pick Experience"}
          />
          <p className="text-center">loading...</p>
        </div>
      </>
    );
  }
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
  const content = await getStaticContents("termsofuse");
  return {
    props: { content },
  };
}
