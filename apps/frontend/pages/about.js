import PublicFooter from "components/PublicFooter";
import PublicHeader from "components/PublicHeader";
import Section from "components/Section";
import Image from "next/image";
import { LogoLinkedin } from "react-ionicons";

export default function About() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <h1 className="text-5xl text-center mb-10">About Logly</h1>
          <p>
            Logly is an educational tool and digital conversation space for
            cultural institutions of all sizes. Our mission is to enhance
            visitor interaction and help museums build communities by providing
            accessible digital technologies.
          </p>
        </Section>
        <Section>
          <h2 className="font-bold text-3xl mb-3">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666120342/website/IMG_0375_xrpbmm.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <span className="flex flex-row justify-between">
                <a
                  className="font-bold flex flex-row justify-between content-center"
                  href="https://www.linkedin.com/in/tdhroberts/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span> Tyler Roberts</span>{" "}
                  <LogoLinkedin
                    style={{ marginLeft: "10px", verticalAliegn: "middle" }}
                  />
                </a>
              </span>
              <p>Business Strategy & Customer Engagement</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666120341/website/IMG_0374_zxrkfb.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <span className="flex flex-row justify-between">
                <a
                  className="font-bold flex flex-row justify-between content-center"
                  href="https://www.linkedin.com/in/louisa-potthast-47129a148/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Louisa Potthast</span>{" "}
                  <LogoLinkedin
                    style={{ marginLeft: "10px", verticalAliegn: "middle" }}
                  />
                </a>
              </span>
              <p>Content Strategy & Marketing</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666120341/website/IMG_0373_k1jv0h.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <span className="flex flex-row justify-between">
                <a
                  className="font-bold flex flex-row justify-between content-center"
                  href="https://www.linkedin.com/in/gregory-smith-b74b0433/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Gregory Smith</span>{" "}
                  <LogoLinkedin
                    style={{ marginLeft: "10px", verticalAliegn: "middle" }}
                  />
                </a>
              </span>
              <p>Project Management</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666120319/website/IMG_0376_ojsdwa.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <span className="flex flex-row justify-between">
                <a
                  className="font-bold flex flex-row justify-between content-center"
                  href="https://www.linkedin.com/in/trentonk/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Trenton Kennedy</span>{" "}
                  <LogoLinkedin
                    style={{ marginLeft: "10px", verticalAliegn: "middle" }}
                  />
                </a>
              </span>
              <p>Tech Lead</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666158394/website/IMG_0382_y6h0oa.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <span className="flex flex-row justify-between">
                <a
                  className="font-bold flex flex-row justify-between content-center"
                  href="https://www.linkedin.com/in/asa-smith-b882261a5/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Asa Smith</span>{" "}
                  <LogoLinkedin
                    style={{ marginLeft: "10px", verticalAliegn: "middle" }}
                  />
                </a>
              </span>
              <p>QA Testing</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666155602/website/IMG_0380_cjoe97.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <span className="flex flex-row justify-between">
                <a
                  className="font-bold flex flex-row justify-between content-center"
                  href="https://www.linkedin.com/in/bryant-r-young-2543a6238/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Bryant Young</span>{" "}
                  <LogoLinkedin
                    style={{ marginLeft: "10px", verticalAliegn: "middle" }}
                  />
                </a>
              </span>
              <p>UI Development</p>
            </div>
          </div>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
