import React from "react";
import Section from "components/Section";
import PublicHeader from "components/PublicHeader";
import PublicFooter from "components/PublicFooter";

export default function Contact() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <h1 className="text-5xl text-center mb-10">Contact</h1>
          <p>
            For more information or to request a demo please contact us at
            hello@logly.world
          </p>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
