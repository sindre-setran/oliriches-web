import BlockContent from "@/components/block-content";
import Wrapper from "@/components/wrapper";
import { generateOgImageUrl } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params,
  });

  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  if (!page) {
    return notFound();
  }

  return {
    title: page.seo?.seoTitle || page.title,
    description: page.seo?.seoDescription,
    openGraph: {
      images: await generateOgImageUrl(
        page.seo?.seoImage || page.mainImage || settings?.seo?.seoImage
      ),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: await params,
  });

  if (!page) {
    notFound();
  }

  return (
    <Wrapper>
      <h1 className="sr-only">{page.title}</h1>
      <BlockContent className="pt-40 max-w-screen-md mx-auto" value={page.content} />
    </Wrapper>
  );
}
