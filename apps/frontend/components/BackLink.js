import Link from "next/link";
import { ChevronBack } from "react-ionicons";

export default function BackLink({ href, text }) {
  if (!href || !text) return <></>;
  return (
    <Link href={href} passHref>
      <a className="inline-flex text-xs uppercase">
        <ChevronBack
          height="16px"
          width="16px"
          style={{ verticalAlign: "middle" }}
        />
        {text}
      </a>
    </Link>
  );
}
