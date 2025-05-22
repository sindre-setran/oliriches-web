import MasonryGrid from "@/components/masonry-grid";
import Wrapper from "@/components/wrapper";
import { generateOgImageUrl } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY, STORIES_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return {
    title: "Stories",
    openGraph: {
      images: await generateOgImageUrl(settings?.seo?.seoImage),
    },
  };
}

export default async function CategoryPage() {
  const { data: stories } = await sanityFetch({
    query: STORIES_QUERY,
  });

  if (!stories) {
    notFound();
  }

  return (
    <Wrapper>
      <h1 className="sr-only">Stories</h1>
      <MasonryGrid projects={stories} />
    </Wrapper>
  );
}
