import React from "react";

export default function Section({ title, className = "", children }) {
  return (
    <section className={`px-6 lg:px-0 my-8 md:mx-auto ${className}`}>
      {title && (
        <>
          <h3 className="pb-3 section-title">{title}</h3> <hr />
        </>
      )}
      {children}
    </section>
  );
}
