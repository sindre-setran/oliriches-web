import Header from "@/components/header";
import MasonryGrid from "@/components/masonry-grid";
import Wrapper from "@/components/wrapper";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";

//import Link from "next/link";

export default async function Page() {
  const { data: page } = await sanityFetch({ query: HOMEPAGE_QUERY });

  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return (
    <>
      <Header settings={settings} work />
      <Wrapper>
        <h1 className="sr-only">{page.title}</h1>
        <MasonryGrid projects={page.projects} />
      </Wrapper>
    </>
  );
}
