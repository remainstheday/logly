import { gql } from "@apollo/client";

export const GET_STATIC_CONTENTS = gql`
  query staticContents($slug: String) {
    staticContents(where: { slug: { equals: $slug } }) {
      id
      slug
      name
      title
      poster {
        id
        filename
        mimetype
        encoding
        publicUrl
      }
      description
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
      poster {
        id
        filename
        mimetype
        encoding
        publicUrl
      }
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
      slug
      description
      images {
        id
        filename
        mimetype
        encoding
        publicUrl
      }
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
      artworks {
        title
        artist
        slug
        startDate
        endDate
        images {
          id
          filename
          mimetype
          encoding
          publicUrl
        }
      }
    }
  }
`;

export const GET_ARTWORK_BY_SLUG = gql`
  query Artwork($slug: String) {
    artwork(where: { slug: $slug }) {
      id
      title
      artist
      slug
      startDate
      endDate
      description
      audioFile
      images {
        id
        filename
        mimetype
        encoding
        publicUrl
      }
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

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $relatedExperienceId: String
    $relatedArtworkId: String
    $username: String!
    $comment: String!
    $image: String!
  ) {
    createComment(
      data: {
        relatedExperienceId: $relatedExperienceId
        relatedArtworkId: $relatedArtworkId
        username: $username
        comment: $comment
        image: $image
      }
    ) {
      id
      username
      relatedExperienceId
      relatedArtworkId
      comment
      image
    }
  }
`;

// todo: submit comments from frontend to keystone
// export const CREATE_COMMENT = gql`
//   mutation CreateComment(
//     $username: String!
//     $comment: String!
//     $image: String
//     $relatedExperienceId: String
//     $relatedArtworkId: String
//   ) {
//     createComment(
//       data: {
//         username: $username
//         comment: $comment
//         relatedExperienceId: $relatedExperienceId
//         relatedArtworkId: $relatedArtworkId
//         image: $image
//       }
//     ) {
//       id
//       comment
//       image
//       username
//       relatedExperienceId
//       relatedArtworkId
//     }
//   }
// `;
