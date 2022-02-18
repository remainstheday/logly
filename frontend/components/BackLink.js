import Link from "next/link";
import { ChevronBack } from "react-ionicons";
import React from "react";

export default function BackLink({ href, text }) {
  return (
    <Link href={href} passHref>
      <a className="inline-flex uppercase">
        <ChevronBack />
        {text}
      </a>
    </Link>
  );
}
