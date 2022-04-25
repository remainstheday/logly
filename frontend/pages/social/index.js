import Header from "components/Header";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import Footer from "components/Footer";
import React, { useState } from "react";

import Image from "next/image";
import ClientOnly from "components/ClientOnly";
import client from "lib/apollo-client";
import { GET_ALL_COMMENTS } from "lib/api";
import PageLoading from "components/PageLoading";
import ImageUploader from "components/ImageUploader";

export default function Social({ comments }) {
  const [uploadedImage, setUploadedImage] = useState();

  const processImage = (file) => {
    const url = `https://api.cloudinary.com/v1_1/djfxpvrca/image/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", (e) => {
      // setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);

        // setImage(response.secure_url);
        console.log(response.secure_url);
      }
    };

    fd.append("upload_preset", "ekqp8s1g");
    fd.append("file", file[0]);
    xhr.send(fd);
  };

  const handleFormSubmit = () => {
    processImage(uploadedImage);
  };

  if (!comments) return <PageLoading />;
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto">
        <BackLink href={"/"} text={"Home"} />
        <PageTitle largeText={"ART Social"} />
        <section className="container mt-20 md:mt-32 mx-auto">
          <h3 className="pb-3 section-title">Share Thoughts and Images</h3>
          <hr />

          <ClientOnly>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                handleFormSubmit();
              }}
              className="social-form"
            >
              <input type="text" placeholder="Full Name" />
              <textarea
                className="w-full"
                name="comment"
                rows="5"
                placeholder="Leave your thoughts and images at the moment"
              />
              <div className="space-y-3">
                <ImageUploader onUpload={(image) => setUploadedImage(image)} />
                <button type="submit" className="submit-btn w-full">
                  Share
                </button>
              </div>
            </form>
          </ClientOnly>
        </section>
      </div>
      <section className="mt-20 md:mt-32 ">
        <div className="filter max-w-4xl mx-auto">
          <h3 className="pb-3 section-title">
            See what the community has shared
          </h3>
        </div>
        <div className="w-full bg-slate-100 shadow-inner py-6 px-3">
          <div className="grid grid-cols-2 gap-2 mx-auto lg:grid-cols-3">
            {comments.map((post, index) => (
              <div
                key={index}
                className="w-full bg-white rounded overflow-hidden shadow-lg"
              >
                <Image src={`/stock-museum-1.jpg`} width="1080" height="720" />
                <div className="px-3 py-3">
                  <p className="text-gray-700 text-base">{post.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <br />
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const comments = await client.query({
    query: GET_ALL_COMMENTS,
  });

  return {
    props: { comments: comments.data.comments },
  };
}
