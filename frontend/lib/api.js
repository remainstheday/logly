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
      audioFile {
        filename
        filesize
        ref
        url
      }
      endDate
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

export const GET_ALL_COMMENTS = gql`
  {
    comments {
      id
      comment
      image
    }
  }
`;

// todo: submit comments from frontend to keystone
export const CREATE_COMMENT = gql`
  mutation CreateComment($name: String!, $comment: String!, $image: String) {
    createComment(data: { name: $name, comment: $comment, image: $image }) {
      id
      comment
      image
      name
    }
  }
`;
