import React from "react";
import Link from "next/link";

export default function RelatedItemsGrid({ items }) {
  if (!items || items.length < 1) return <></>;

  return (
    <div className="custom-scrollbar relative w-full flex gap-6 my-6 snap-x snap-mandatory overflow-x-auto md:inline-grid md:gap-2 md:grid-cols-2">
      {items.map((item, index) => (
        <div className="snap-center shrink-0 w-full my-3" key={index}>
          <div className="shrink-0 flex flex-col">
            <Link href={item.url} passHref>
              <a className="aspect-w-16 aspect-h-9">
                <img
                  src={item.image ? item.image : "/stock-museum-1.jpg"}
                  alt={item.title}
                />
              </a>
            </Link>
            <Link href={item.url} passHref>
              <a>
                <strong>{item.title}</strong>
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
