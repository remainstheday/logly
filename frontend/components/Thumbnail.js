import Link from "next/link";
import Image from "next/image";

export default function Thumbnail({
  href,
  image,
  title,
  imgWidth = 250,
  imgHeight = 175,
}) {
  return (
    <Link href={href} passHref>
      <a>
        <img src={image} width={`${imgWidth}`} height={`${imgHeight}`} />
        <p className="thumbnail-text">{title}</p>
      </a>
    </Link>
  );
}
