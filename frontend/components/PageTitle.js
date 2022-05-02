import React from "react";

export default function PageTitle({ smallText, largeText }) {
  if (!smallText && !largeText) return <></>;
  return (
    <div className="mt-8 mb-16">
      {smallText && (
        <p className="small-title uppercase text-center">{smallText}</p>
      )}
      {largeText && (
        <h1 className="page-title text-6xl">
          <br /> {largeText}
        </h1>
      )}
    </div>
  );
}
