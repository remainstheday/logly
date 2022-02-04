import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

import { getAllExperiences } from "../lib/api";
import SectionLink from "../components/SectionLink";

export default function Home({ experiences = [] }) {
  return (
    <>
      <div className="max-w-4xl mx-auto min-h-screen mx-1 md:mx-auto">
        <Header />
        <main>
          <p className="uppercase text-center">Welcome to</p>
          <h1 className="text-3xl leading-3 text-center font-bold mt-0 pt-0">
            <br /> LOGLY
          </h1>

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

          <section className="container mt-4 mt-10 mx-auto">
            <h3 className="pb-3 section-title">Pick an Experience</h3>
            <hr />
            <div className="w-full mt-4">
              <Carousel experiences={experiences} />
              <SectionLink href={`/experiences`} text={"See all experiences"} />
            </div>
          </section>

          <section className="container mt-4  mt-10 mx-auto">
            <h3 className="pb-3 section-title">Art Social</h3>
            <hr />
            <div className="w-full mt-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium alias aut autem blanditiis consectetur doloribus
                eius eos, et ipsam itaque laboriosam magnam minus molestiae,
                numquam, officiis possimus provident sed. Ipsam.
              </p>
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

  return {
    props: { experiences },
  };
}
