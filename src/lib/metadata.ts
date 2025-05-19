import { sanityImage } from "@/sanity/lib/client";

export async function generateOgImageUrl(
  ogImageAsset: Project.Image | undefined
): Promise<string | undefined> {
  const OG_IMAGE_WIDTH = 1200;
  const OG_IMAGE_HEIGHT = 630;

  if (!ogImageAsset) {
    return undefined;
  }

  return sanityImage.image(ogImageAsset).size(OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT).fit("crop").url();
}
