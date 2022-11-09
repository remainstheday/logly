import PublicFooter from "components/PublicFooter";
import PublicHeader from "components/PublicHeader";
import Section from "components/Section";
import Link from "next/link";
import {
  AnalyticsOutline,
  PeopleOutline,
  PhonePortraitOutline,
  QrCodeOutline,
  RadioOutline,
} from "react-ionicons";

export default function Pricing() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <h1 className="text-5xl text-center mb-10">Pricing</h1>
          <div className="antialiased max-w-6xl mx-auto my-12">
            <div className="relative block md:flex items-center">
              <div className="w-full border border-gray-200 md:w-1/2 relative z-1 bg-gray-100 overflow-hidden">
                <div className="text-lg font-medium uppercase p-8 text-center border-b border-gray-200 tracking-wide">
                  Logly Premium
                </div>
                <div className="block sm:flex md:block lg:flex items-center justify-center">
                  <div className="mt-8 sm:m-8 md:m-0 md:mt-8 lg:m-8 text-center">
                    <div className="inline-flex items-center">
                      <span className="text-3xl font-medium">$99/month</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-3 ">
                  <ul>
                    <li className="flex items-center">
                      <PhonePortraitOutline />
                      <span className="text-gray-700 text-lg ml-3">
                        Mobile Optimized Digital Guides
                      </span>
                    </li>
                    <li className="flex items-center mt-3">
                      <RadioOutline />
                      <span className="text-gray-700 text-lg ml-3">
                        Audio Tours
                      </span>
                    </li>
                    <li className="flex items-center mt-3">
                      <QrCodeOutline />
                      <span className="text-gray-700 text-lg ml-3">
                        QR Code Generator
                      </span>
                    </li>
                    <li className="flex items-center mt-3">
                      <PeopleOutline />
                      <span className="text-gray-700 text-lg ml-3">
                        Community Engagement
                      </span>
                    </li>
                    <li className="flex items-center mt-3">
                      <AnalyticsOutline />
                      <span className="text-gray-700 text-lg ml-3">
                        Site Performance Metrics
                      </span>
                    </li>
                  </ul>
                </div>
                <Link href="/register">
                  <a className="block flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-8 text-md font-semibold text-gray-800 uppercase mt-16">
                    <span>Create account</span>
                    <span className="font-medium text-gray-700 ml-2">➔</span>
                  </a>
                </Link>
              </div>
              <div className="w-full md:w-1/2 relative z-0 my-6 mx-4">
                <div className="border-solid border-2 overflow-hidden">
                  <div className="text-lg font-medium uppercase p-8 text-center border-b tracking-wide">
                    Enterprise
                  </div>
                  <div className="text-sm sm:text-md max-w-sm mx-auto mt-8 px-8 lg:px-0">
                    Looking for something different? Logly is a team of
                    experienced museum professionals and skilled tech
                    practitioners. Let us assist you in implementing Logly in
                    your space or developing a custom solution for your
                    organization’s needs. Reach out and let us help you realize
                    your vision.
                  </div>
                  <div className="mt-8 border mx-8 lg:mx-16 flex flex-wrap">
                    <div className="flex items-center justify-center w-1/2 text-center p-4 border-r border-b">
                      Develop Interpretive Materials
                    </div>
                    <div className="flex items-center justify-center w-1/2 text-center p-4 border-b">
                      Digitize Collections
                    </div>
                    <div className="flex items-center justify-center w-1/2 text-center p-4 border-b border-r">
                      Dedicated Support
                    </div>
                    <div className="flex items-center justify-center w-1/2 text-center p-4 border-b">
                      Account Management
                    </div>
                    {/*<div className="flex items-center justify-center w-1/2 text-center p-4 border-b border-r">*/}
                    {/*  Migration Assistance*/}
                    {/*</div>*/}
                    {/*<div className="flex items-center justify-center w-1/2 text-center p-4">*/}
                    {/*  Early Access to New Features*/}
                    {/*</div>*/}
                  </div>
                  <Link href="/contact">
                    <a className="block flex items-center justify-center bg-blue-800 hover:bg-blue-700 p-8 text-md font-semibold text-gray-300 uppercase mt-8">
                      <span>Contact sales</span>
                      <span className="font-medium text-gray-300 ml-2">➔</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
