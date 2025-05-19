import docToUrl from "@/lib/docToUrl";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_PATHS_QUERY } from "@/sanity/lib/queries";
import { getServerSideSitemapIndex } from "next-sitemap";

export async function GET() {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const { data: pagePaths } = await sanityFetch({ query: PAGE_PATHS_QUERY });

  const urls = pagePaths.map((page: any) => `${process.env.NEXT_PUBLIC_BASE_URL}${docToUrl(page)}`);

  return getServerSideSitemapIndex(urls);
}
