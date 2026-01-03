
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error("FATAL: NEXT_PUBLIC_BASE_URL is not defined in .env");
}
if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
  throw new Error("FATAL: NEXT_PUBLIC_GRAPHQL_URL is not defined in .env");
}

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;