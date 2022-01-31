import Link from "next/link";
import { LogoInstagram, LogoLinkedin } from "react-ionicons";

export default function Footer() {
  return (
    <footer className="w-full py-4 mt-20 bg-zinc-900 text-white">
      <div className="flex justify-between max-w-4xl mx-auto">
        <ul>
          <li>
            <h3 className="uppercase font-bold">My account</h3>
          </li>
          <li>Sign In</li>
          <li>Register</li>
          <li>
            <div className="flex">
              <LogoInstagram className="mr-4" color={"#fff"} />
              <LogoLinkedin color={"#fff"} />
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <h3 className="uppercase font-bold">About</h3>
          </li>
          <li>About Logly</li>
          <li>Media</li>
        </ul>

        <ul>
          <li>
            <h3 className="uppercase font-bold">Legal</h3>
          </li>
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </footer>
  );
}
