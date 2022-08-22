import PublicHeader from "../components/PublicHeader";
import Section from "../components/Section";
import PublicFooter from "../components/PublicFooter";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section className="pt-32">
          <h1 className="text-8xl text-center font-extrabold mb-10">404</h1>
          <p className="text-center">
            Sorry but that page does not exist.{" "}
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
