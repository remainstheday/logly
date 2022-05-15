import Link from "next/link";
import { ChevronBack } from "react-ionicons";
import React from "react";

export default function BackLink({ href, text }) {
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
