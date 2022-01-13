const API_URL = `https://admin.logly.world/api/graphql`;

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

export async function getAllExperiences() {
  const data = await fetchAPI(`{
  experiences {
    id
    title
    slug
    poster {
      id
      filesize
      width
      height
      extension
      ref
      url
    }
    startDate
    endDate
    status
  }
}`);

  return data?.experiences;
}

export async function getExperienceBySlug(slug) {
  const data = await fetchAPI(
    `query Experience($slug: String){
      experience(where: {slug: $slug}) {
        title
      }
}`,
    { variables: { slug } }
  );

  return data?.experience;
}
