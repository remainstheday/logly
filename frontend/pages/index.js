import ContentSlider from "components/ContentSlider";
import Footer from "components/Footer";
import Header from "components/Header";
import PageTitle from "components/PageTitle";
import SectionLink from "components/SectionLink";
import { getAllArtworks, getAllExperiences } from "lib/api";
import Image from "next/image";

export default function Home({ experiences = [], artworks = [] }) {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen mx-1 md:mx-auto">
        <main>
          <PageTitle smallText={"welcome to"} largeText={"Logly"} />
          <div className="flex relative max-w-full w-full h-96 my-16">
            <Image src="/stock-museum-1.jpg" className="w-full" layout="fill" />
          </div>

          <section className="container mx-auto mt-4">
            <h3>
              Brief intro Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nobis aut impedit, minus doloribus cumque nulla eum
              molestiae eligendi obcaecati. Ratione magnam repudiandae dolorum
              minima aspernatur nostrum sit iusto rem iure.
            </h3>
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
  const experiences = await getAllExperiences();
  const artworks = await getAllArtworks();

  return {
    props: { experiences, artworks },
  };
}
