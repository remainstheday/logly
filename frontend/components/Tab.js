import Link from "next/link";

export default function Tab({ href, isSelected, title }) {
  return (
    <Link href={href}>
      <a
        className={`uppercase mr-5 ${isSelected ? "font-bold underline" : ""}`}
      >
        {title}
      </a>
    </Link>
  );
}
