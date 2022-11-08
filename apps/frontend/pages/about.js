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
            Our mission at Logly is to lower the barrier of entry for building
            digital experiences in the museum space. We provide a self-service
            toolkit that helps cultural institutions of all sizes grow their
            community and enhance the guest experience. Our team is made up of
            art historians, designers, developers, and business strategists who
            are all passionate about art and immersive experiences.
          </p>
        </Section>
        <Section>
          <h2 className="font-bold text-3xl mb-3">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1667946499/website/IMG_6270_copy_abu70l.jpg"
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
              <p>Founder, Art Historian, Museum Technologist</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1667946514/website/7DEA7F05-5BE0-4ABC-824D-3D84CA06734B_1_201_a_eqvjng.jpg"
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
                  <span>Tyler Roberts</span>{" "}
                  <LogoLinkedin
                    style={{ marginLeft: "10px", verticalAliegn: "middle" }}
                  />
                </a>
              </span>
              <p>Strategy, Partnerships, Growth</p>
            </div>

            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1667946508/website/E10D9515-8A29-4E7E-A487-D4A7E0008B84_1_201_a_qctvel.jpg"
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
              <p>Project Management, Quality Assurance</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1667950401/website/greyscale_headshot_vtazzk.png"
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
              <p>Product, Technology, Engineering</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1667950646/website/image_kqgbi1.png"
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
              <p>Operations</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1667946540/website/IMG_9060_qstnup.jpg"
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
              <p>Engineering</p>
            </div>
          </div>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
