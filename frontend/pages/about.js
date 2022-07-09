import React from "react";
import Section from "components/Section";
import PublicHeader from "components/PublicHeader";
import PublicFooter from "components/PublicFooter";

export default function About() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <h1 className="text-5xl text-center mb-10">About</h1>
          <p>
            Logly is an educational tool and digital conversation space for
            cultural institutions of all sizes. Our mission is to enhance
            visitor interaction and help museums build communities by providing
            accessible digital technologies.
          </p>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
