import { gql } from "@apollo/client";

export const GET_ALL_SITES = gql`
  {
    sites {
      siteId
      title
      url
    }
  }
`;

export const GET_SITE_CONTENT = gql`
  query SiteContents($siteId: String) {
    siteContents(where: { siteId: { equals: $siteId } }) {
      id
      url
      name
      title
      siteId
      staticPageImages
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
      relatedArtifacts {
        url
        artifactImages
        title
        artist
        status
      }
      description {
        document
      }
      experienceImages
      startDate
      endDate
      status
    }
  }
`;

export const GET_ALL_EXPERIENCES = gql`
  query Experiences {
    experiences {
      id
      title
      url
      siteId
      description {
        document
      }
      experienceImages
      startDate
      endDate
      status
    }
  }
`;

export const GET_ARTIFACTS_BY_SITE_ID = gql`
  query Experiences($siteId: String) {
    artifacts(where: { siteId: { equals: $siteId } }) {
      id
      title
      artist
      url
      status
      siteId
      audioFile
      description {
        document
      }
      artifactImages
    }
  }
`;

export const GET_ALL_ARTIFACTS = gql`
  {
    artifacts {
      id
      title
      artist
      url
      status
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
      experienceURL
      artifactURL
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation CreateComment(
    $username: String!
    $comment: String!
    $image: String!
    $artifactURL: String
    $experienceURL: String
    $timestamp: DateTime!
    $siteId: String!
  ) {
    createComment(
      data: {
        username: $username
        comment: $comment
        image: $image
        artifactURL: $artifactURL
        experienceURL: $experienceURL
        timestamp: $timestamp
        siteId: $siteId
      }
    ) {
      id
      username
      comment
      image
      experienceURL
      artifactURL
      timestamp
      siteId
    }
  }
`;
