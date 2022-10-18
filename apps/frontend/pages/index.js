import PublicFooter from "components/PublicFooter";
import PublicHeader from "components/PublicHeader";
import Section from "components/Section";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowForwardOutline } from "react-ionicons";

export default function IndexPage() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen sm:mx-auto">
        <Section>
          <h1 className="text-3xl uppercase font-bold md:text-5xl text-center mb-10">
            Logly is a community, a classroom, and an archive.
          </h1>
          <div className="flex flex-col sm:flex-row justify-between">
            <p className="sm:w-3/4 text-lg">
              Our platform enables cultural institutions to{" "}
              <strong>
                easily build digital guides and instantly create immersive
                experiences for guests.
              </strong>
              <br />
              <br />
              By providing an <strong>interactive space</strong>, visitors can
              share their thoughts with others — and{" "}
              <strong>
                cultural institutions can learn from their audience.
              </strong>
              <Link href="/register" passHref>
                <a
                  style={{ backgroundColor: "#002FA7" }}
                  className="w-44 mt-4 flex flex-row justify-between text-center block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Get Started
                  <ArrowForwardOutline
                    style={{ verticalAlign: "middle", color: "#fff" }}
                    height="1.5em"
                    width="1.5em"
                  />
                </a>
              </Link>
            </p>

            <div className="block -mt-12 text-right hidden sm:block">
              <Image
                priority
                src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067460/website/illu_5_qlpdrh.png"
                alt="logly-illustration"
                width="350"
                height="350"
              />
            </div>
          </div>
        </Section>
        <section className="mt-24 px-3">
          <h2 className="text-3xl text-center font-bold uppercase">
            What your visitors see
          </h2>
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="w-full mt-12 sm:w-1/3">
              <div className="block text-center">
                <Image
                  src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067467/website/mobile-logly-homepage_lixjre.png"
                  alt="logly-logo"
                  width="175"
                  height="355"
                  className="mx-auto block text-center"
                />
                <h3>A digital tool with your branding.</h3>
              </div>
            </div>
            <div className="mt-12 sm:w-1/3">
              <div className="block text-center">
                <Image
                  src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067467/website/mobile-logly-experiences_inqxnc.png"
                  alt="logly-logo"
                  width="175"
                  height="355"
                />
                <h3>Tour guides with interpretive materials.</h3>
              </div>
            </div>
            <div className="mt-12 sm:w-1/3">
              <div className="block text-center">
                <Image
                  src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067467/website/mobile-logly-community_wqdgiu.png"
                  alt="logly-logo"
                  width="175"
                  height="355"
                />
                <h3>A space to share their thoughts + connect with others.</h3>
              </div>
            </div>
          </div>
          <Link href="/register" passHref>
            <a
              style={{ backgroundColor: "#002FA7" }}
              className="w-44 mx-auto mt-4 text-center block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Get Started
            </a>
          </Link>
        </section>

        <section className="mt-24 px-3">
          <h2 className="text-3xl text-center font-bold uppercase">
            What you see
          </h2>
          <div>
            <div className="flex flex-col sm:flex-row mt-12">
              <div className="block text-center order-2 sm:order-1 sm:w-1/2">
                <Image
                  src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067473/website/homepage-desktop-admin-3_wwikgj.png"
                  alt="logly admin interface"
                  width="425"
                  height="250"
                />
              </div>

              <div className="sm:w-1/2 mb-4">
                <h3 className="font-bold text-center sm:text-left text-2xl">
                  A Digital Guide Builder
                </h3>
                <p>
                  With Logly you can easily upload rich text, images, & audio
                  clips for your digital guides — no programming needed!
                </p>
                <div className="block text-right hidden sm:block">
                  <Image
                    src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067451/website/illu_1_sq93cm.png"
                    alt="logly illustration 1"
                    width="350"
                    height="350"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-20 sm:mt-48">
              <div className="sm:w-1/2 mb-4">
                <h3 className="font-bold text-center sm:text-left text-2xl">
                  A Publishing Tool
                </h3>
                <p>
                  Share the guides with your visitors instantly and create
                  engaging experiences
                </p>
                <div className="block text-left hidden sm:block">
                  <Image
                    src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067451/website/illu_1_sq93cm.png"
                    alt="logly illustration 2"
                    width="350"
                    height="350"
                  />
                </div>
              </div>
              <div className="block text-center sm:w-1/2">
                <Image
                  src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067473/website/homepage-desktop-admin-1_ltpjdk.png"
                  alt="logly-logo"
                  width="425"
                  height="250"
                />
                <Link href="/register" passHref>
                  <a
                    style={{ backgroundColor: "#002FA7" }}
                    className="w-44 mx-auto mt-20 sm:mt-4 mb-4 text-center block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Give Logly a Try
                  </a>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row mt-20 sm:mt-48">
              <div className="block text-center sm:w-1/2 order-2 sm:order-1">
                <Image
                  src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067473/website/homepage-desktop-admin-2_afscgf.png"
                  alt="logly-logo"
                  width="425"
                  height="250"
                />
              </div>
              <div className="sm:w-1/2 mb-4">
                <h3 className="font-bold text-2xl text-center order-1 sm:order-2 sm:text-left">
                  A Content Management System
                </h3>
                <p>
                  See what your community thinks and decide what you want to
                  share + archive
                </p>
                <div className="block text-right hidden sm:block">
                  <Image
                    src="https://res.cloudinary.com/djfxpvrca/image/upload/v1666067460/website/illu_3_zvjnjr.png"
                    alt="logly illustration 3"
                    width="350"
                    height="350"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-24">
          <strong className="block text-center">
            Sign up for Logly News and Updates
          </strong>
          <i className="block text-center">
            We respect your privacy. Unsubscribe at any time.
          </i>

          <Script src="https://f.convertkit.com/ckjs/ck.5.js"></Script>
          <form
            action="https://app.convertkit.com/forms/3337562/subscriptions"
            className="seva-form formkit-form block text-center"
            method="post"
            data-sv-form="3337562"
            data-uid="32f877138b"
            data-format="inline"
            data-version="5"
            data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Thank you for subscribing!","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"hide","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
            min-width="400 500 600 700 800"
          >
            <div data-style="clean">
              <ul
                className="formkit-alert formkit-alert-error"
                data-element="errors"
                data-group="alert"
              ></ul>
              <div
                data-element="fields"
                data-stacked="false"
                className="seva-fields formkit-fields flex flex-inline justify-center mt-5"
              >
                <div className="formkit-field w-1/2">
                  <input
                    className="formkit-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email_address"
                    aria-label="Email Address"
                    placeholder="Email Address"
                    required="required"
                    type="email"
                  />
                </div>
                <button
                  data-element="submit"
                  style={{ backgroundColor: "#002FA7" }}
                  className="formkit-submit formkit-submit ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  <div className="formkit-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <PublicFooter />
    </>
  );
}
