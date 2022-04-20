import Header from "components/Header";
import BackLink from "components/BackLink";
import Footer from "components/Footer";
export default function PageLoading() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen mx-1 md:mx-auto">
        <BackLink href={"/"} text={"Home"} />
        <div className="text-center space-x-1 space-y-1 mt-10">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
          <h2>loading</h2>
        </div>
      </div>
      <Footer />
    </>
  );
}
