import React from "react";
import Section from "components/Section";
import PublicHeader from "components/PublicHeader";
import PublicFooter from "components/PublicFooter";
import Link from "next/link";
import { ArrowForwardOutline } from "react-ionicons";

export default function Pricing() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <h1 className="text-5xl text-center mb-10">Pricing</h1>
          <div className="w-1/2 mx-auto block">
            <div className="mt-12">
              <h3 className="font-bold uppercase text-2xl">Logly Premium</h3>
              <ul className="mt-2 pl-6 list-disc space-y-2">
                <li>Mobile Optimized Digital Guides</li>
                <li>Audio Tours</li>
                <li>QR Code Generator</li>
                <li>Unlimited Bandwidth</li>
                <li>Photo and Audio Storage</li>
                <li>Community Management</li>
                <li>Password Protection</li>
                <li>Basic Website Metrics</li>
                <li>Priority Customer Support</li>
              </ul>
              <h3 className="font-bold text-1xl my-4">
                $99/month (or save with annual billing)
              </h3>
              <Link href="/register" passHref>
                <a
                  style={{ backgroundColor: "#002FA7" }}
                  className="w-44 flex flex-row justify-between text-center block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Get Started
                  <ArrowForwardOutline
                    style={{ verticalAlign: "middle", color: "#fff" }}
                    height="1.5em"
                    width="1.5em"
                  />
                </a>
              </Link>
            </div>

            <div className="mt-12">
              <h3 className="font-bold uppercase text-2xl">Custom</h3>
              <i className="mt-4 block">
                Looking for something different? Logly is a team of skilled tech
                practitioners and experienced museum professionals. Let us
                assist you in implementing Logly in your space or developing a
                custom solution for your organization’s needs. Reach out and let
                us help you realize your vision.
              </i>
              <br />
              <Link href="/contact">
                <a
                  style={{ backgroundColor: "#002FA7" }}
                  className="w-44 text-center block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Get in Touch
                </a>
              </Link>
            </div>
          </div>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
