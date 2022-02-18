import Header from "components/Header";
import Footer from "components/Footer";
import React from "react";
import BackLink from "components/BackLink";

export default function About() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen">
        <BackLink href={"/"} text={"Home"} />
        <h1 className="artwork-title">Museum Information</h1>
        <p className="mt-6">
          Brief intro Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nobis aut impedit, minus doloribus cumque nulla eum molestiae eligendi
          obcaecati. Ratione magnam repudiandae dolorum minima aspernatur
          nostrum sit iusto rem iure.
        </p>
      </div>
      <Footer />
    </>
  );
}
