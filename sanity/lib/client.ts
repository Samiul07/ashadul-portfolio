import { createClient } from "next-sanity";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "g8mj4pfg";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = createClient({
  apiVersion: "2026-08-10",
  dataset,
  projectId,
  useCdn: true,
});
