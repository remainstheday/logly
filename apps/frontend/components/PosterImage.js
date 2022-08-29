import Image from "next/image";

export default function PosterImage({
  image,
  title,
  altText = "",
  caption = "",
}) {
  if (!image) return <></>;
  return (
    <div className="mt-16 mb-8">
      <div className="mb-2 aspect-w-16 aspect-h-9">
        <Image
          layout="fill"
          placeholder="blur"
          blurDataURL="/images/loading-skeleton.gif"
          src={image}
          alt={altText || title}
        />
      </div>
      {caption.length > 1 && <i>{caption}</i>}
    </div>
  );
}
