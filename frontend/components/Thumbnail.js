import Link from "next/link";

export default function Thumbnail({ href, image, title }) {
  return (
    <Link href={href}>
      <>
        <img src={image} width="250" height="250" />
        <p>{title}</p>
      </>
    </Link>
  );
}
