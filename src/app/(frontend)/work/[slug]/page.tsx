import Header from "@/components/header";
import { generateOgImageUrl } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY, PROJECT_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import WorkPageContent from "./page-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
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
  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: await params,
  });

  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  const { data: homepage } = await sanityFetch({
    query: HOMEPAGE_QUERY,
  });

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header settings={settings} work={project.projectType === "project"} />
      <WorkPageContent project={project} homepageProjects={homepage.projects} />
    </>
  );
}
