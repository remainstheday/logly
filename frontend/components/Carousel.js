import React from "react";

const Carousel = ({ images }) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const refs = images.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  // Some validation for checking the array length could be added if needed
  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
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
    <div className="w-screen flex justify-center">
      <div className="p-12 flex justify-center w-screen md:w-1/2 items-center">
        <div className="relative w-full">
          <div className="carousel">
            {sliderControl(true)}
            {images.map((img, i) => (
              <div className="w-full flex-shrink-0" key={img} ref={refs[i]}>
                <img src={img} className="w-full object-contain" />
              </div>
            ))}
            {sliderControl()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
