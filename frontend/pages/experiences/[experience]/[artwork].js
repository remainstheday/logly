import {
  getAllArtworks,
  getAllExperiences,
  getArtworkBySlug,
  getExperienceBySlug,
} from "../../../lib/api";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function Artwork({ artwork }) {
  if (!artwork) return <>loading...</>;
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen">
        <h1>{artwork.title}</h1>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const experiences = await getAllExperiences();
  const artworks = await getAllArtworks();

  const paths = experiences
    .map((experience) => {
      return artworks.map((artwork) => {
        console.log(`${experience.slug}/${artwork.slug}`)
        return {
          params: {
            experience: experience.slug,
            artwork: `${experience.slug}/${artwork.slug}`,
          },
        };
      });
    })
    .flat();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const artwork = await getArtworkBySlug(`${params.artwork}`);

  return {
    props: { artwork },
  };
}
