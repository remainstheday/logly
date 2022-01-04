export const gql = (content) => content;

export async function fetchGraphQL(query, variables) {
  return fetch("https://admin.tovech.com/api/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables }),
    headers: { "Content-Type": "application/json" },
  })
    .then((x) => x.json())
    .then(({ data, errors }) => {
      if (errors) {
        throw new Error(
          `GraphQL errors occurred:\n${errors.map((x) => x.message).join("\n")}`
        );
      }
      return data;
    });
}
