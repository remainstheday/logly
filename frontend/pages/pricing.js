import React from "react";
import Section from "components/Section";
import PublicHeader from "components/PublicHeader";
import PublicFooter from "components/PublicFooter";
import Link from "next/link";

export default function Pricing() {
  return (
    <>
      <PublicHeader />

      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <h1 className="text-5xl text-center mb-10">Pricing</h1>
          <section className="mt-24 px-3">
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="w-full sm:w-80 mt-12">
                <h3 className="font-bold text-2xl text-center">
                  Logly Premium
                </h3>
                <ul className="text-center mt-2 space-y-2">
                  <li>~ Unlimited guides ~</li>
                  <li>~ Image & audio uploads ~ </li>
                  <li>~ QR Codes ~</li>
                  <li>~ Community comments ~</li>
                </ul>
                <h3 className="font-bold text-1xl text-center mt-8">
                  $80/month
                </h3>
                <Link href="/register">
                  <a
                    style={{ backgroundColor: "#002FA7" }}
                    className="mx-auto w-2/5 text-center block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Get Started
                  </a>
                </Link>
              </div>

              <div className="w-full sm:w-80 mt-12">
                <h3 className="font-bold text-2xl text-center">Custom</h3>
                <i className="mt-4 text-center  block">
                  Our custom plan includes all the features in premium, plus
                  consulting services
                </i>
                <ul className="text-center mt-4 space-y-2">
                  <li>~ creating interpretive materials ~</li>
                  <li>~ custom editing ~</li>
                </ul>
                <br />
                <Link href="/about">
                  <a
                    style={{ backgroundColor: "#002FA7" }}
                    className="mx-auto mt-4 w-2/5 text-center block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Get In Touch
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
