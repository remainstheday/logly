import React from "react";
import Link from "next/link";

const Carousel = ({ experiences }) => {
  const [currentExperience, setCurrentExperience] = React.useState(0);
  const refs = experiences.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    setCurrentExperience(i);
    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  // Some validation for checking the array length could be added if needed
  const totalImages = experiences.length;

  const nextImage = () => {
    if (currentExperience >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentExperience + 1);
    }
  };

  const previousImage = () => {
    if (currentExperience === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentExperience - 1);
    }
  };

  // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
  const arrowStyle =
    "absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center";

  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "40%" }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        {isLeft ? "◀" : "▶"}
      </span>
    </button>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-center items-center">
        <div className="relative w-full">
          <div className="carousel h-96">
            {sliderControl(true)}
            {experiences.map((experience, index) => (
              <Link
                key={index}
                href={`/experiences${experience.slug}`}
                passHref
              >
                <div className="w-full flex-shrink-0">
                  <img
                    src={
                      experience.poster
                        ? experience.poster.publicUrl
                        : "/stock-museum-1.jpg"
                    }
                    ref={refs[index]}
                    className="w-full object-contain"
                  />

                  <strong>{experience.title}</strong>
                </div>
              </Link>
            ))}
            {sliderControl()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
