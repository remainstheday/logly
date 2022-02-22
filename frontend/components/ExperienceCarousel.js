import Link from "next/link";
import React from "react";
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
      <div className="carousel-container relative w-full">
        <div className="carousel">
          <ChevronBackOutline
            onClick={previousImage}
            className="arrow absolute left-1"
            width="2em"
            height="2em"
            role="img"
            aria-label="Arrow Left"
          />

          {items.map((item, index) => (
            <Link href={`/experiences${item.slug}`} key={index} passHref>
              <a className="carousel-card w-full flex-shrink-0">
                <img
                  src={
                    item.poster ? item.poster.publicUrl : "/stock-museum-1.jpg"
                  }
                  className="w-full"
                  ref={refs[index]}
                />
                <strong>{item.title}</strong>
              </a>
            </Link>
          ))}
          <ChevronForwardOutline
            onClick={nextImage}
            className="arrow absolute right-2"
            width="2em"
            height="2em"
          />
        </div>
      </div>
    </div>
  );
}
