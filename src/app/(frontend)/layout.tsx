import Footer from "@/components/footer";
import { SanityLive } from "@/sanity/lib/live";
import { sanityFetch } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </div>
      <SanityLive />
    </>
  );
}
