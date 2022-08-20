import Footer from "components/Footer";
import Section from "./Section";
import Header from "./Header";

export default function PageLoading({ siteId }) {
  return (
    <>
      <Header siteId={siteId} />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section className="pt-32">
          <div className="text-center space-x-1 space-y-1 mt-10">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
            <h2>loading</h2>
          </div>
        </Section>
      </div>
      <Footer />
    </>
  );
}
