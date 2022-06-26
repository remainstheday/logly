import Link from "next/link";
import { LogoInstagram, LogoLinkedin } from "react-ionicons";

export default function Footer({ siteId, className }) {
  return (
    <footer
      className={`w-full px-3 py-10 mt-20 bg-zinc-900 text-white ${className}`}
    >
      <div className="flex justify-between max-w-4xl mx-auto">
        <ul>
          <li>
            <h3 className="uppercase font-bold">Social</h3>
          </li>

          <li>
            <div className="flex">
              <LogoInstagram
                className="mr-4"
                color={"#fff"}
                onClick={() =>
                  window.open("https://www.instagram.com/_logly", "_blank")
                }
              />
              <LogoLinkedin
                color={"#fff"}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/company/logly-world/",
                    "_blank"
                  )
                }
              />
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <h3 className="uppercase font-bold">About</h3>
          </li>
          <li>
            <Link href={"/about"} passHref>
              <a>About Logly</a>
            </Link>
          </li>
          <li>
            <Link href={"/media"} passHref>
              <a>Media</a>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <h3 className="uppercase font-bold">Legal</h3>
          </li>
          <li>
            <Link href={"/termsofuse"} passHref>
              <a>Terms of Use</a>
            </Link>
          </li>
          <li>
            <Link href={"/privacy-policy"} passHref>
              <a>Privacy Policy</a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
