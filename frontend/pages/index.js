import ContentSlider from "components/ContentSlider";
import Footer from "components/Footer";
import Header from "components/Header";
import PageTitle from "components/PageTitle";
import SectionLink from "components/SectionLink";
import { getAllArtworks, getAllExperiences, getStaticContents } from "lib/api";
import Image from "next/image";

export default function Home({
  experiences = [],
  artworks = [],
  content = [{ name: "blah", title: "blah", description: "blah" }],
}) {
  const homepage = content[0];
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen mx-1 md:mx-auto">
        <main>
          <PageTitle smallText={"welcome to"} largeText={homepage.title} />
          <div className="flex relative max-w-full w-full h-96 my-16">
            <Image src="/stock-museum-1.jpg" className="w-full" layout="fill" />
          </div>

          <section className="container mx-auto mt-4">
            <h3>{homepage.description}</h3>
          </section>

          <section className="container mt-20 md:mt-32 mx-auto">
            <h3 className="pb-3 section-title">Pick an Experience</h3>
            <hr />
            <div className="w-full mt-4">
              <ContentSlider items={experiences} contentType="experience" />
              <SectionLink
                href={`/experiences?viewAll=true`}
                text={"See all experiences"}
              />
            </div>
          </section>

          <section className="container mt-20 md:mt-32 mx-auto">
            <h3 className="pb-3 section-title">Art Social</h3>
            <hr />
            <div className="w-full mt-4">
              <ContentSlider items={artworks} contentType="artwork" />
              <SectionLink href={`/`} text={"Discover Art Social"} />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const content = await getStaticContents("Home");
  const experiences = await getAllExperiences();
  const artworks = await getAllArtworks();

  return {
    props: { experiences, artworks, content },
  };
}
