import React from "react";

export default function Banner({ image, title }) {
  return (
    <div className="mt-16 mb-8 aspect-w-16 aspect-h-9">
      <img src={image} alt={title} />
    </div>
  );
}
