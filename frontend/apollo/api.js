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

export const GET_ALL_ARTWORKS = gql`
  {
    artworks {
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
      relatedArtworks {
        title
        artist
        url
        artworkImages
      }
    }
  }
`;

export const GET_ARTWORK_BY_SLUG = gql`
  query Artwork($url: String) {
    artwork(where: { url: $url }) {
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
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation CreateComment(
    $username: String!
    $comment: String!
    $image: String!
    $artworkId: String
    $experienceId: String
  ) {
    createComment(
      data: {
        username: $username
        comment: $comment
        image: $image
        artworkId: $artworkId
        experienceId: $experienceId
      }
    ) {
      id
      username
      comment
      image
      experienceId
      artworkId
    }
  }
`;
