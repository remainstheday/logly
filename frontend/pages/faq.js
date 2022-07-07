import React from "react";
import Section from "components/Section";
import PublicHeader from "components/PublicHeader";
import PublicFooter from "components/PublicFooter";

export default function Faq() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <h1 className="text-5xl text-center mb-10">FAQ</h1>
          <h3>How can I start using Logly?</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            atque eius, eos ipsa iusto nostrum nulla quas? Aliquid animi modi
            non provident velit. Assumenda laborum magni molestias, mollitia
            odio reiciendis.
          </p>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
