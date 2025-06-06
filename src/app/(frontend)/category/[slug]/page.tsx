import Header from "@/components/header";
import MasonryGrid from "@/components/masonry-grid";
import Wrapper from "@/components/wrapper";
import { generateOgImageUrl } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { CATEGORY_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { data: category } = await sanityFetch({
    query: CATEGORY_QUERY,
    params: params,
  });

  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  if (!category) {
    return notFound();
  }

  return {
    title: category.seo?.seoTitle || category.title,
    description: category.seo?.seoDescription,
    openGraph: {
      images: await generateOgImageUrl(
        category.seo?.seoImage || category.mainImage || settings?.seo?.seoImage
      ),
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { data: category } = await sanityFetch({
    query: CATEGORY_QUERY,
    params: await params,
  });

  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header settings={settings} work />
      <Wrapper>
        <h1 className="sr-only">{category?.title}</h1>
        <MasonryGrid projects={category.relatedProjects} />
      </Wrapper>
    </>
  );
}
