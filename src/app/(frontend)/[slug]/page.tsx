import BlockContent from "@/components/block-content";
import Header from "@/components/header";
import SanityImage from "@/components/sanity-image";
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

  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      <Header settings={settings} work={false} />
      <Wrapper className="pt-40 flex flex-col-reverse md:flex-row justify-center gap-8 lg:gap-10">
        {page.image && (
          <div className="max-w-full sm:max-w-xs lg:max-w-sm w-full">
            <SanityImage image={page.image} width={1280} quality={90} />
          </div>
        )}
        <div>
          <h1 className="sr-only">{page.title}</h1>
          <BlockContent className="max-w-[720px]" value={page.content} />
        </div>
      </Wrapper>
    </>
  );
}
