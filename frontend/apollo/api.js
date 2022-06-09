import { gql } from "@apollo/client";

export const GET_STATIC_CONTENTS = gql`
  query staticContents($url: String) {
    staticContents(where: { url: { equals: $url } }) {
      id
      url
      name
      title
      staticPageImages
      description {
        document
      }
    }
  }
`;

export const GET_ALL_EXPERIENCES = gql`
  {
    experiences {
      id
      title
      url
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

export const GET_EXPERIENCE_BY_SLUG = gql`
  query Experience($url: String) {
    experience(where: { url: $url }) {
      title
      url
      startDate
      endDate
      status
      description {
        document
      }
      experienceImages
      relatedArtifacts {
        title
        artist
        url
        artifactImages
      }
    }
  }
`;

export const GET_ARTIFACT_BY_SLUG = gql`
  query Object($url: String) {
    artifact(where: { url: $url }) {
      id
      title
      artist
      url
      status
      description {
        document
      }
      audioFile
      qrCodes
      relatedExperiences {
        id
        title
        url
        startDate
        endDate
      }
      artifactImages
    }
  }
`;

export const GET_ALL_COMMENTS = gql`
  {
    comments {
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
  ) {
    createComment(
      data: {
        username: $username
        comment: $comment
        image: $image
        artifactURL: $artifactURL
        experienceURL: $experienceURL
        timestamp: $timestamp
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
