import Header from "@/components/header";
import MasonryGrid from "@/components/masonry-grid";
import Wrapper from "@/components/wrapper";
import { generateOgImageUrl } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { COLLECTION_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { data: project } = await sanityFetch({
    query: COLLECTION_QUERY,
    params: params,
  });

  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  if (!project) {
    return notFound();
  }

  return {
    title: project.seo?.seoTitle || project.title,
    description: project.seo?.seoDescription,
    openGraph: {
      images: await generateOgImageUrl(
        project.seo?.seoImage || project.mainImage || settings?.seo?.seoImage
      ),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { data: page } = await sanityFetch({ query: COLLECTION_QUERY, params: await params });

  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return (
    <>
      <Header settings={settings} work={false} />
      <Wrapper>
        <h1 className="sr-only">{page.title}</h1>
        <MasonryGrid projects={page.projects} />
      </Wrapper>
    </>
  );
}
