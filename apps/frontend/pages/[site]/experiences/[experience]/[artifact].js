import { DocumentRenderer } from "@keystone-6/document-renderer";
import {
  GET_ALL_COMMENTS,
  GET_ARTIFACTS,
  GET_EXPERIENCES_BY_SITE_ID,
  GET_SITE_LOGO,
} from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import AudioPlayer from "components/AudioPlayer";
import BackLink from "components/BackLink";
import CommentCard from "components/CommentCard";
import Footer from "components/Footer";
import Header from "components/Header";
import PageLoading from "components/PageLoading";
import PosterImage from "components/PosterImage";
import RelatedItemsGrid from "components/RelatedItemsGrid";
import Section from "components/Section";
import SectionLink from "components/SectionLink";
import SocialForm from "components/SocialForm";
import { useRouter } from "next/router";

export default function Artifact({
  logo,
  artifact,
  experience,
  comments,
  relatedArtifacts,
}) {
  const { query, router } = useRouter();
  if ((router && router.isFallback) || !artifact || !experience)
    return <PageLoading siteId={query.site} />;

  const hasDescription =
    artifact.description && artifact.description.document.length > 0;
  const hasAudioFile = artifact.audioFile && artifact.audioFile.length > 0;
  const metaTitle = `${query.site
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")}-${artifact.title}`;
  return (
    <div className="flex flex-col h-screen">
      <Header siteId={query.site} logo={logo} title={metaTitle} />
      <div className="flex-grow w-full max-w-4xl mx-auto">
        <Section>
          <BackLink href={`${experience.url}`} text={"Back to Experience"} />
          <div className="section-title space-y-1 mt-6 mb-6 md:mt-20">
            <h1>{artifact.title}</h1>
            <h2>{artifact.artist}</h2>
          </div>

          <PosterImage
            image={
              artifact.artifactImages
                ? artifact.artifactImages
                : "/images/stock-museum-1.jpg"
            }
            title={artifact.title}
            altText={artifact.altText}
            caption={artifact.caption}
          />

          {hasAudioFile && (
            <div className="my-6">
              <AudioPlayer audioFile={artifact.audioFile} />
            </div>
          )}

          {hasDescription && (
            <div className="formatted-content wysiwyg-editor">
              <DocumentRenderer document={artifact.description.document} />
            </div>
          )}
          {relatedArtifacts.length > 0 && (
            <Section title="Exhibition Preview">
              <div className="w-full mt-4">
                <RelatedItemsGrid items={relatedArtifacts} />
              </div>
            </Section>
          )}
        </Section>

        {query.social === "true" && (
          <Section title="Share Thoughts and Images">
            <SocialForm query={query} />
          </Section>
        )}

        {comments.length > 0 && (
          <Section title="See What the Community has Shared">
            <div className="py-6 grid md:grid-cols-2 gap-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
            <div className="mt-6 px-6 md:px-0">
              <SectionLink
                href={`/${query.site}/community`}
                text={"Discover the Community"}
              />
            </div>
          </Section>
        )}
      </div>
      <Footer siteId={query.site} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const siteContents = await apolloClient.query({
    query: GET_SITE_LOGO,
    variables: { siteId: params.site },
  });
  const logo = siteContents.data.siteContents[1];

  const experiences = await apolloClient.query({
    query: GET_EXPERIENCES_BY_SITE_ID,
    variables: { siteId: params.site },
  });
  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
    variables: { siteId: params.site },
  });

  const experience = experiences.data.experiences.filter(
    (experience) =>
      experience.url === `/${params.site}/experiences/${params.experience}`
  )[0];
  const artifacts = await apolloClient.query({
    query: GET_ARTIFACTS,
    variables: { url: params.artifact },
  });
  const artifact = artifacts.data.artifacts.filter(
    (artifact) => artifact.siteId === params.site
  )[0];

  const relatedArtifacts = experience.relatedArtifacts
    .map((artifact) => ({
      ...artifact,
      url: `${experience.url}/${artifact.url}`,
      image: artifact.artifactImages,
    }))
    .filter(
      (item) =>
        item.status === "published" &&
        item.url !== `${experience.url}/${artifact.url}` // we shouldn't recommend the current page
    );

  if (!artifact || !experience || artifact.status !== "published") {
    return {
      notFound: true,
    };
  }

  const filteredComments = comments.data.comments.filter(
    (comment) => comment.query.artifact === artifact.url
  );

  return addApolloState(apolloClient, {
    props: {
      logo,
      artifact,
      comments: filteredComments,
      experience,
      relatedArtifacts,
    },
  });
}
