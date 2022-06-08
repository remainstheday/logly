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

export const GET_ALL_OBJECTS = gql`
  {
    objects {
      id
      title
      artist
      url
      description {
        document
      }
      artworkImages
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
      description {
        document
      }
      experienceImages
      relatedObject {
        title
        artist
        url
        artworkImages
      }
    }
  }
`;

export const GET_OBJECT_BY_SLUG = gql`
  query Object($url: String) {
    object(where: { url: $url }) {
      id
      title
      artist
      url
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
      artworkImages
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
      artworkURL
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation CreateComment(
    $username: String!
    $comment: String!
    $image: String!
    $artworkURL: String
    $experienceURL: String
    $timestamp: String!
  ) {
    createComment(
      data: {
        username: $username
        comment: $comment
        image: $image
        artworkURL: $artworkURL
        experienceURL: $experienceURL
        timestamp: $timestamp
      }
    ) {
      id
      username
      comment
      image
      experienceURL
      artworkURL
      timestamp
      siteId
    }
  }
`;
