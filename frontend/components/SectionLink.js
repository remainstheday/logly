import Link from "next/link";
import { ArrowForward } from "react-ionicons";

export default function SectionLink({ href, text }) {
  return (
    <Link href={href} passHref>
      <span className="flex flex-row justify-between content-center">
        <strong className="section-link-text">{text}</strong>
        <ArrowForward
          style={{ verticalAlign: "middle" }}
          height="2em"
          width="2em"
        />
      </span>
    </Link>
  );
}
