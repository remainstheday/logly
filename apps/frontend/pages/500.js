import PublicHeader from "../components/PublicHeader";
import Section from "../components/Section";
import PublicFooter from "../components/PublicFooter";
import Link from "next/link";

export default function Custom500() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section className="pt-32">
          <h1 className="text-8xl text-center font-extrabold mb-10">500</h1>
          <p className="text-center">
            Sorry but something is wrong with this page.{" "}
            <Link href="/">
              <a className="text-blue-700">Return to Homepage</a>
            </Link>
          </p>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
