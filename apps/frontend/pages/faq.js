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
          <h3 className="text-lg mt-12 font-bold">1. Why do I need Logly?</h3>
          <p>
            Logly offers a low barrier of entry for users of all skill levels to
            create interactive digital guides and audio tours. It can be used by
            institutions of all sizes, is cost-effective, and easy to use. Logly
            also provides museums and cultural institutions with a sophisticated
            research tool that enables collection and management of
            user-generated content.
          </p>
          <h3 className="text-lg mt-12 font-bold">
            2. How easy is Logly to use?
          </h3>
          <p>
            Logly is designed for users of all skill levels. Logly users can
            create complete digital guides and audio tours for their exhibitions
            in under an hour.
          </p>
          <h3 className="text-lg mt-12 font-bold">
            3. Do I need to be an IT specialist to use Logly?
          </h3>
          <p>
            No. Logly is designed so that uploading and managing content is as
            easy as using Instagram, Facebook, Twitter, or other platforms.
          </p>
          <h3 className="text-lg mt-12 font-bold">4. Is Logly accessible?</h3>
          <p>
            Logly is designed from the ground up to be accessible and
            approachable for all visitors. Visitors can access Logly via QR code
            and directly view interpretive material from within their preferred
            browser. Logly enables visitors to enjoy a digital experience
            without having to download a separate application.
          </p>
          <h3 className="text-lg mt-12 font-bold">
            5. How much content do I have to upload?
          </h3>
          <p>
            You can upload as much or as little material as you wish. Logly
            offers unlimited bandwidth for users to upload images, text, and
            audio. Logly also renders well with minimal content.
          </p>
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
            Logly is available at a monthly fee of $99 per month or $990 per
            year if users select to pay annually. As our product evolves with
            the help of partner institutions, new features, and pricing tiers
            will be available to support institutions of all sizes.
          </p>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
