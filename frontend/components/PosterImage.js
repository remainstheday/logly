import React from "react";
import Image from "next/image";

export default function PosterImage({ image, title }) {
  if (!image) return <></>;
  return (
    <div className="mt-16 mb-8 aspect-w-16 aspect-h-9">
      <Image
        layout="fill"
        placeholder="blur"
        blurDataURL="/stock-museum-1.jpg"
        src={image}
        alt={title}
      />
    </div>
  );
}
