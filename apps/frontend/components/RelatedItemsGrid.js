import Image from "next/image";
import Link from "next/link";

export default function RelatedItemsGrid({ items, mobileSideScroll = true }) {
  if (!items || items.length < 1) return <></>;

  return (
    <div
      className={
        mobileSideScroll
          ? "custom-scrollbar snap-x snap-mandatory overflow-x-auto relative w-full flex gap-6 my-6 md:inline-grid md:gap-2 md:grid-cols-2"
          : "relative w-full gap-6 my-6 md:inline-grid md:gap-2 md:grid-cols-2"
      }
    >
      {items.map((item, index) => (
        <div className="snap-center shrink-0 w-full my-3" key={index}>
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
  );
}
