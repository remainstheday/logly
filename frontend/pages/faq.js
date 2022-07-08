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
          <h3 className="text-lg mt-12 font-bold">
            {" "}
            1. How can I start using Logly?
          </h3>
          <p>
            Upon signing into your Logly account, you can immediately start
            creating experiences. You can upload text, images, and audio. Logly
            will provide you with QR codes that you can place as an access point
            on-site.
          </p>
          <h3 className="text-lg mt-12 font-bold">
            {" "}
            2. How easy is Logly to use?{" "}
          </h3>
          <p>
            {" "}
            Logly is designed for users of all skill levels. Logly users can
            create complete digital guides for their exhibitions in under an
            hour.
          </p>
          <h3 className="text-lg mt-12 font-bold">
            3. Do I need to be a IT specialist to use it?
          </h3>
          <p>
            No, Logly is designed so that uploading and managing content is as
            easy as using Instagram, Facebook, Twitter, or other platforms.
          </p>
          <h3 className="text-lg mt-12 font-bold">
            4. How much content do I have to upload?
          </h3>{" "}
          <p>
            You can upload as much and as little material as you wish. Logly
            offers unlimited space for users to upload images, text, and audio,
            Logly also looks good if with with minimal content.
          </p>
          <h3 className="text-lg mt-12 font-bold"> 5. Is Logly accessible?</h3>
          <p>
            Logly is designed from the ground up to be accessible and
            approachable for all visitors. Both technological accessibility, as
            well as accessibility for people with low vision, are crucial
            components. Visitors can access Logly via QR code and directly view
            information, instead of having to download and navigate an app. We
            also provide Alt text for screen readers and audio.
          </p>{" "}
          <h3 className="text-lg mt-12 font-bold">
            6. Is Logly a social media platform?
          </h3>
          <p>
            No, Logly is not replicating the behavior of social media platforms.
            Instead, the goal is to enable community members to stay connected
            when they’re most motivated in the museum space.
          </p>
          <h3 className="text-lg mt-12 font-bold">
            7. How much does Logly cost?
          </h3>
          <p>
            Logly is available at a monthly fee of $99 a month. As our product
            evolves with the help of our partner institutions, new features, and
            pricing tiers will be available to support institutions of all
            sizes.
          </p>{" "}
          <h3 className="text-lg mt-12 font-bold">8. Why do I need Logly?</h3>
          <p>
            Logly offers a low barrier of entry for people on a skill-levels, it
            can be used in institutions of all sizes, and it is cost-effective
            and quick and easy to use. Logly is also a sophisticated research
            tool for institutions that allows the collecting and archiving of
            user-generated data.
          </p>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
