import Header from "components/Header";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import Footer from "components/Footer";
import React from "react";

import Image from "next/image";
import ClientOnly from "components/ClientOnly";
import { addComment } from "lib/api";

export default function Social({}) {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen">
        <BackLink href={"/"} text={"Home"} />
        <PageTitle largeText={"ART Social"} />
        <section className="container mt-20 md:mt-32 mx-auto">
          <h3 className="pb-3 section-title">Share Thoughts and Images</h3>
          <hr />
          <ClientOnly>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await addComment("Im working");
              }}
              className="social-form"
            >
              <textarea
                className="w-full"
                name="comment"
                rows="5"
                placeholder="Leave your thoughts and images at the moment"
              />
              <button type="submit" className="w-full">
                Share
              </button>
            </form>
          </ClientOnly>
        </section>
        <section className="container mt-20 md:mt-32 mx-auto">
          <h3 className="pb-3 section-title">
            See what the community has shared
          </h3>
          <hr />
          <div className="flex flex-wrap">
            {[1, 2, 3, 4].map((post, index) => (
              <div key={index} className="flex w-1/2">
                <Image src={`/stock-museum-1.jpg`} width="1080" height="720" />
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <div className="px-6 py-4">
                    <p className="text-gray-700 text-base">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptatibus quia, nulla! Maiores et perferendis eaque,
                      exercitationem praesentium nihil.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <br />
        </section>
      </div>
      <Footer />
    </>
  );
}
