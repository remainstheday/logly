import Link from "next/link";

export default function Thumbnail({
  href,
  image,
  title = "",
  imgWidth = 250,
  imgHeight = 175,
}) {
  return (
    <Link href={href} passHref>
      <a className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          width={`${imgWidth}`}
          height={`${imgHeight}`}
          alt={title}
        />
        <p className="thumbnail-text">{title}</p>
      </a>
    </Link>
  );
}
