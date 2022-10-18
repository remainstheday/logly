import PublicFooter from "components/PublicFooter";
import PublicHeader from "components/PublicHeader";
import Section from "components/Section";
import Image from "next/image";

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
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666120342/website/IMG_0375_xrpbmm.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <h3 className="font-bold">Tyler Roberts</h3>
              <p>
                Building interactive digital tools for cultural institutions to
                increase engagement, collect stories, and start conversations.
              </p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666120341/website/IMG_0374_zxrkfb.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <h3 className="font-bold">Louisa Potthast</h3>
              <p>
                My focus is on bridging the gap between museums and their
                audiences by building engaging museum experiences.
              </p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666120341/website/IMG_0373_k1jv0h.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <h3 className="font-bold">Gregory Smith</h3>
              <p>Software and Data</p>
            </div>
            <div>
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666120319/website/IMG_0376_ojsdwa.jpg"
                alt="logly-logo"
                width="250"
                height="250"
              />
              <h3 className="font-bold">Trenton Kennedy</h3>
              <p>Software engineer</p>
            </div>
          </div>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
