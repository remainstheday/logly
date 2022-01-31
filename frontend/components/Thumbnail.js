import Link from "next/link";

export default function Thumbnail({ href, image, title }) {
  return (
    <Link href={href}>
      <>
        <img src={image} width="50" height="50" />
        <p>{title}</p>
      </>
    </Link>
  );
}
