import Link from "next/link";
import { LogoInstagram, LogoLinkedin } from "react-ionicons";

export default function Footer() {
  return (
    <footer className="w-full py-4 mt-20 bg-zinc-900 text-white">
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
            <Link href={"https://logly.world"} passHref>
              <a>About Logly</a>
            </Link>
          </li>
          <li>
            <Link href={"https://logly.world"} passHref>
              <a>Media</a>
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <h3 className="uppercase font-bold">Legal</h3>
          </li>
          <li>
            <Link href={"https://logly.world"} passHref>
              <a>Terms of Use</a>
            </Link>
          </li>
          <li>
            <Link href={"/"} passHref>
              <a>Privacy Policy</a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
