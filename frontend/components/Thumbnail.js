import Link from "next/link";
import Image from "next/image";

const customLoader = ({ src }) => {
  return src;
};

export default function Thumbnail({
  href,
  image,
  title = "",
  imgWidth = 250,
  imgHeight = 175,
}) {
  return (
    <Link href={href} passHref>
      <a>
        <Image
          loader={customLoader}
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
