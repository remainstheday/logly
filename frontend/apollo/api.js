import { gql } from "@apollo/client";

export const GET_STATIC_CONTENTS = gql`
  query staticContents($slug: String) {
    staticContents(where: { slug: { equals: $slug } }) {
      id
      slug
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
      slug
      description
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
      description
      artworkImages
    }
  }
`;

export const GET_EXPERIENCE_BY_SLUG = gql`
  query Experience($slug: String) {
    experience(where: { slug: $slug }) {
      title
      slug
      startDate
      endDate
      description
      relatedArtworks {
        title
        artist
        url
        startDate
        endDate
        artworkImages
      }
    }
  }
`;

export const GET_ARTWORK_BY_SLUG = gql`
  query Artwork($slug: String) {
    artwork(where: { url: $slug }) {
      id
      title
      artist
      url
      startDate
      endDate
      description
      audioFile
      qrCodes
      relatedExperiences {
        id
        title
        slug
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
