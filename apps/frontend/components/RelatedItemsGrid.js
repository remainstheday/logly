import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function RelatedItemsGrid({ items, mobileSideScroll = true }) {
  const carouselContainer = useRef(null);
  const carouselIndicatorsContainer = useRef(null);
  const [itemInView, setItemInView] = useState(0);
  const sortedItems = items.sort((a, b) => {
    return a.dateCreated > b.dateCreated
      ? 1
      : a.dateCreated < b.dateCreated
      ? -1
      : 0;
  });

  useEffect(() => {
    if (carouselIndicatorsContainer.current) {
      const carouselCircles = carouselIndicatorsContainer.current.childNodes;

      carouselCircles.forEach((circle, index) => {
        circle.classList.remove("active");
        if (index === itemInView) circle.classList.add("active");
      });
    }
    // add and remove the classes of carousel indicator circles that are/aren't active
    // every time the item in view changes
  }, [itemInView]);

  const handleScroll = () => {
    const numOfItems = items.length > 2 ? 3 : items.length;
    const itemWidth = carouselContainer.current.scrollWidth / numOfItems;

    if (carouselContainer.current.scrollLeft === 0) {
      setItemInView(0);
      return;
    }

    if (carouselContainer.current.scrollLeft % itemWidth === 0) {
      // item is essentially the index of the item in view
      // if there is no remainder when dividing the scrollbar position
      // by the width of one item, then we need to subtract 1 from that index,
      // because the index would be 1 greater than the actual item in view
      const item = Math.floor(
        carouselContainer.current.scrollLeft / itemWidth - 1
      );
      setItemInView(item);
    } else {
      const item = Math.floor(carouselContainer.current.scrollLeft / itemWidth);
      setItemInView(item);
    }
  };

  const handleClick = (e) => {
    const numOfItems = items.length > 2 ? 3 : items.length;
    // access the first property of e.target, which has dynamically generated name
    const firstIndex = Object.keys(e.target)[0];
    const indicatorIndex = e.target[firstIndex]["key"]; // index of the indicator clicked
    // if the last indicator is clicked, move the scrollbar to the end of the container
    if (
      parseInt(indicatorIndex) ===
      carouselIndicatorsContainer.current.childElementCount - 1
    ) {
      carouselContainer.current.scrollLeft =
        carouselContainer.current.scrollWidth;
    } else {
      const itemWidth = carouselContainer.current.scrollWidth / numOfItems;
      const newScrollPos =
        itemWidth * indicatorIndex + Math.floor((itemWidth * 1) / 2);
      carouselContainer.current.scrollLeft = newScrollPos;
    }
  };

  if (!items || items.length < 1) return <></>;

  return (
    <div>
      <div
        ref={carouselContainer}
        onScroll={handleScroll}
        className={
          mobileSideScroll
            ? "scroll-smooth carousel custom-scrollbar snap-x snap-mandatory overflow-x-auto relative w-full flex gap-6 my-6 md:inline-grid md:gap-2 md:grid-cols-2"
            : "relative w-full gap-6 my-6 md:inline-grid md:gap-2 md:grid-cols-2"
        }
      >
        {sortedItems.slice(0, 3).map((item, index) => (
          <div className="snap-center shrink-0 w-full my-3 " key={index}>
            <div className="shrink-0 flex flex-col">
              <Link href={item.url} passHref>
                <a className="aspect-w-16 aspect-h-9">
                  <Image
                    layout="fill"
                    placeholder="blur"
                    blurDataURL="/images/loading-skeleton.gif"
                    src={item.image ? item.image : "/images/stock-museum-2.jpg"}
                    alt={item.altText || item.title}
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
      {mobileSideScroll && items.length > 1 ? (
        <div
          className="w-full -translate-y-[40px] h-10 z-10 flex justify-center items-center gap-4 md:opacity-0"
          ref={carouselIndicatorsContainer}
        >
          {sortedItems.slice(0, 3).map((item, index) => {
            return (
              <div
                className="carousel-indicator w-4 h-4 rounded-full border-black border"
                key={index}
                onClick={handleClick}
              ></div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
