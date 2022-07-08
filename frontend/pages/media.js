import React from "react";
import Link from "next/link";
import PublicFooter from "components/PublicFooter";
import PublicHeader from "components/PublicHeader";
import Section from "components/Section";

export default function Media() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <h1 className="text-5xl text-center mb-10">Media</h1>
          <p>
            <strong>February 15, 2022: </strong>
            <Link href="https://medium.com/@louisapotthast/digital-futures-x-museums-how-does-digital-technology-impact-the-way-we-engage-with-art-2e4f33975b4d">
              <a className="text-sky-500">
                Digital Futures x Museums: How does digital technology impact
                the way we engage with art?
              </a>
            </Link>
          </p>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
