import React from "react";
import Link from "next/link";
import { ChevronBackOutline, ChevronForwardOutline } from "react-ionicons";

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

          {experiences.map((experience, index) => (
            <div className="carousel-card w-full flex-shrink-0">
              <Link
                key={index}
                href={`/experiences${experience.slug}`}
                passHref
              >
                <>
                  <img
                    src={
                      experience.poster
                        ? experience.poster.publicUrl
                        : "/stock-museum-1.jpg"
                    }
                    className="w-full"
                    ref={refs[index]}
                  />
                  <strong>{experience.title}</strong>
                </>
              </Link>
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
};

export default Carousel;
