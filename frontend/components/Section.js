import React from "react";

export default function Section({ title, children }) {
  return (
    <section className="px-6 lg:px-0 my-4 md:mx-auto">
      {title && (
        <>
          <h3 className="pb-3 section-title">{title}</h3> <hr />
        </>
      )}
      {children}
    </section>
  );
}
