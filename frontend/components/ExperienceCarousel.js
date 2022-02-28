import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ChevronBackOutline, ChevronForwardOutline } from "react-ionicons";

export default function ExperienceCarousel({ items }) {
  const [currentItem, setCurrentItem] = React.useState(0);
  if (!items) return <></>;
  const refs = items
    ? items.reduce((acc, val, i) => {
        acc[i] = React.createRef();
        return acc;
      }, {})
    : {};

  const scrollToImage = (i) => {
    setCurrentItem(i);
    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  // Some validation for checking the array length could be added if needed
  const totalItems = items.length;

  const nextImage = () => {
    if (currentItem >= totalItems - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentItem + 1);
    }
  };

  const previousImage = () => {
    if (currentItem === 0) {
      scrollToImage(totalItems - 1);
    } else {
      scrollToImage(currentItem - 1);
    }
  };

  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <div className="relative w-full mb-16">
        <div className="carousel">
          {items.length > 1 && (
            <ChevronBackOutline
              onClick={previousImage}
              className="absolute left-0 z-10 cursor-pointer bg-white top-0 bottom-0 flex items-center"
              width="1.5em"
              height="2em"
              role="img"
              aria-label="Arrow Left"
            />
          )}

          {items.map((item, index) => (
            <div
              key={index}
              ref={refs[index]}
              className="carousel-card w-full flex-shrink-0"
            >
              <Link href={`/experiences${item.slug}`} key={index} passHref>
                <a>
                  <Image
                    src={
                      item.poster
                        ? item.poster.publicUrl
                        : "/stock-museum-1.jpg"
                    }
                    className="w-full mx-auto"
                    width={896}
                    height={384}
                  />
                  <strong className="pl-7">{item.title}</strong>
                </a>
              </Link>
            </div>
          ))}

          {items.length > 1 && (
            <ChevronForwardOutline
              onClick={nextImage}
              className="absolute  z-10 cursor-pointer bg-white right-0 top-0 bottom-0 flex items-center"
              width="1.5em"
              height="2em"
            />
          )}
        </div>
      </div>
    </div>
  );
}
