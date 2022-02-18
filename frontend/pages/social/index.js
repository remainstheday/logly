import Header from "components/Header";
import Footer from "components/Footer";
import React from "react";
import PageTitle from "components/PageTitle";
import SocialForm from "components/SocialForm";

export default function Social({}) {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen">
        <PageTitle largeText={"Art Social"} />

        <SocialForm />
      </div>
      <Footer />
    </>
  );
}
