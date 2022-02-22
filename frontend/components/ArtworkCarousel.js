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

          {items.map((item, index) => (
            <div className="carousel-card w-full flex-shrink-0" key={index}>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  className="w-full"
                  src={
                    item.images ? item.images.publicUrl : "/stock-museum-2.jpg"
                  }
                />

                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus quia, nulla! Maiores et perferendis eaque,
                    exercitationem praesentium nihil.
                  </p>
                </div>
              </div>
            </div>
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
