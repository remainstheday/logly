const API_URL = process.env.API_URL;

async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };
  // todo: check for authorization headers

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("failed to fetch API");
  }

  return json.data;
}

export async function getStaticContents(name) {
  const data = await fetchAPI(
    `query staticContents($name: String) {
      staticContents(where: {name: {equals: $name}}) {
        id
        name
        title
        description
      }
    }`,
    { variables: { name } }
  );

  return data?.staticContents;
}

export async function getAllExperiences() {
  const data = await fetchAPI(`{
  experiences {
    id
    title
    slug
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
}`);

  return data?.experiences;
}

export async function getAllArtworks() {
  const data = await fetchAPI(`{
  artworks {
    id
    title
    artist
    slug
    images {
      id
      filename
      mimetype
      encoding
      publicUrl
    }
  }
}`);

  return data?.artworks;
}

export async function getExperienceBySlug(slug) {
  const data = await fetchAPI(
    `query Experience($slug: String){
      experience(where: {slug: $slug}) {
        title
        slug
        startDate
        endDate
        artworks {
          title
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
}`,
    { variables: { slug } }
  );

  return data?.experience;
}

export async function getArtworkBySlug(slug) {
  const data = await fetchAPI(
    `query Artwork($slug: String) {
      artwork(where: {slug: $slug}) {
        id
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
    }`,
    { variables: { slug } }
  );

  return data?.artwork;
}
