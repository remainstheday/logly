import Link from "next/link";

export default function Footer({ siteId, className }) {
  return (
    <footer
      className={`w-full px-3 py-6 mt-20 bg-zinc-900 text-white ${className}`}
    >
      <div className="flex justify-between max-w-4xl mx-auto">
        <Link href={`/${siteId}/about`} passHref>
          <a>About</a>
        </Link>
        <Link href={"/terms-of-use"} passHref>
          <a>Terms of Use</a>
        </Link>
        <Link href={"/privacy-policy"} passHref>
          <a>Privacy Policy</a>
        </Link>
      </div>
    </footer>
  );
}
