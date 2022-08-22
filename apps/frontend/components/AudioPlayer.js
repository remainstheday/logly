import React from "react";

export default function AudioPlayer({ audioFile, title }) {
  return (
    <>
      <figure>
        <i>{title}</i>
        <audio controls src={audioFile} className="w-full">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure>
    </>
  );
}
