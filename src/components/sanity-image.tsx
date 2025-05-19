/* eslint-disable @typescript-eslint/no-unused-vars */
import { client } from "@/sanity/lib/client";
import type { SanityImageAsset } from "@/sanity/types";
import {
  ImageUrlBuilder,
  UseNextSanityImageBuilderOptions,
  useNextSanityImage,
} from "next-sanity-image";
import Img, { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "width" | "height" | "src" | "loader" | "alt"> {
  aspect?: number;
  className?: string;
  height?: number;
  image: {
    asset?: SanityImageAsset | { _ref: string; _type: "reference" };
    altText?: string;
    _type: "image";
    lqip: string;
  };
  priority?: boolean;
  quality?: number;
  width?: number;
}

export default function SanityImage({ image, aspect, className, priority, ...props }: Props) {
  const nextSanityImage = useNextSanityImage(client, image);

  // Calculate aspect ratio from image dimensions if not provided
  const calculatedAspect =
    aspect ??
    (nextSanityImage.width && nextSanityImage.height
      ? nextSanityImage.width / nextSanityImage.height
      : 1);

  const options = { imageBuilder: createRatioImageBuilder(calculatedAspect, props.width) };
  const nextSanityImageWithAspect = useNextSanityImage(client, image, options);

  // eslint-disable-next-line no-unused-vars
  const { loader, ...imageProps } = nextSanityImageWithAspect;
  return (
    <Img
      {...props}
      {...imageProps}
      alt={image.altText || ""}
      sizes="(max-width: 1280px) 100vw, 800px"
      className={className}
      placeholder={"blur"}
      blurDataURL={image.lqip}
      priority={priority}
    />
  );
}

export function createRatioImageBuilder(ratio: number, width?: number) {
  return function ratioImageBuilder(
    imageUrlBuilder: ImageUrlBuilder,
    options: UseNextSanityImageBuilderOptions
  ) {
    const usedWidth =
      width || options.width || Math.min(options.originalImageDimensions.width, 1920);
    const height = Math.round(usedWidth * (1 / ratio));
    return imageUrlBuilder
      .width(usedWidth)
      .height(height)
      .quality(options.quality || 75);
  };
}
