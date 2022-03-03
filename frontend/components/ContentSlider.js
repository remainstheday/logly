import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ChevronBackOutline, ChevronForwardOutline } from "react-ionicons";

export default function ContentSlider({ items, contentType }) {
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

  const experiencesContent = () => {
    return items.map((item, index) => (
      <div
        key={index}
        ref={refs[index]}
        className="carousel-card w-full flex-shrink-0"
      >
        <Link href={`/experiences/${item.slug}`} key={index} passHref>
          <a>
            <Image
              src={item.poster ? item.poster.publicUrl : "/stock-museum-1.jpg"}
              className="w-full mx-auto"
              width={896}
              height={384}
            />
            <strong className="pl-7">{item.title}</strong>
          </a>
        </Link>
      </div>
    ));
  };

  const artworkContent = () => {
    return items.map((item, index) => (
      <div className="carousel-card w-full flex-shrink-0" key={index}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src={item.images ? item.images.publicUrl : "/stock-museum-2.jpg"}
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
    ));
  };

  return (
    <div className="w-full flex justify-center items-center overflow-hidden mb-10">
      <div className="relative w-full ">
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

          {contentType === "experience" && experiencesContent()}
          {contentType === "artwork" && artworkContent()}

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