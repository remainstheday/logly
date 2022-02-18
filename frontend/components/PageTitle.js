import React from "react";

export default function PageTitle({ smallText, largeText }) {
  if (!smallText && !largeText) return <></>;
  return (
    <div className="mt-8 mb-16">
      {smallText && <p className="uppercase text-center">{smallText}</p>}
      {largeText && (
        <h1 className="text-6xl leading-8 text-center uppercase font-bold">
          <br /> {largeText}
        </h1>
      )}
    </div>
  );
}
