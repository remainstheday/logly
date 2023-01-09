import { gql } from "@apollo/client";

export const GET_SITE_CONTENT = gql`
  query SiteContents($siteId: String) {
    siteContents(where: { siteId: { equals: $siteId } }) {
      id
      url
      name
      title
      siteId
      siteLogo
      logoWidth
      logoHeight
      staticPageImages
      altText
      description {
        document
      }
    }
  }
`;

export const GET_EXPERIENCES_BY_SITE_ID = gql`
  query Experiences($siteId: String) {
    experiences(where: { siteId: { equals: $siteId } }) {
      id
      title
      url
      siteId
      audioFile
      dateCreated
      relatedArtifacts {
        id
        title
        artist
        url
        status
        dateCreated
        description {
          document
        }
        artifactImages
        altText
        caption
      }
      description {
        document
      }
      experienceImages
      altText
      experienceStart
      experienceEnd
      status
    }
  }
`;

export const GET_ARTIFACTS = gql`
  query Artifacts($url: String) {
    artifacts(where: { url: { equals: $url } }) {
      id
      title
      artist
      url
      status
      siteId
      caption
      altText
      audioFile
      dateCreated
      relatedExperiences {
        id
        title
        url
        siteId
        dateCreated
        relatedArtifacts {
          id
          title
          artist
          url
          artifactImages
          dateCreated
        }
        experienceImages
        altText
        experienceStart
        experienceEnd
        status
      }
      description {
        document
      }
      artifactImages
    }
  }
`;

export const GET_ALL_COMMENTS = gql`
  query Comments($siteId: String) {
    comments(where: { siteId: { equals: $siteId } }) {
      id
      username
      comment
      image
      timestamp
      siteId
      query
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation CreateComment(
    $username: String!
    $comment: String!
    $image: String!
    $query: JSON!
    $timestamp: DateTime!
    $siteId: String!
  ) {
    createComment(
      data: {
        username: $username
        comment: $comment
        image: $image
        timestamp: $timestamp
        query: $query
        siteId: $siteId
      }
    ) {
      id
      username
      comment
      image
      timestamp
      query
      siteId
    }
  }
`;

export const GET_SITE_LOGO = gql`
  query SiteContents($siteId: String) {
    siteContents(where: { siteId: { equals: $siteId } }) {
      siteLogo
      logoWidth
      logoHeight
    }
  }
`;
