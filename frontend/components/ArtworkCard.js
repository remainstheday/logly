import React from "react";
import Image from "next/image";

export default function ArtworkCard({ img }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image src={img} width="1080" height="720" />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
    </div>
  );
}
