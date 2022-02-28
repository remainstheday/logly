import React from "react";
import { ChevronBackOutline, ChevronForwardOutline } from "react-ionicons";

export default function ArtworkCarousel({ items }) {
  const [currentItem, setCurrentItem] = React.useState(0);
  const refs = items.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

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
