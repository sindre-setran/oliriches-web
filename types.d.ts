/* eslint-disable no-unused-vars */
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

declare global {
  namespace Project {
    type BlockContent = PortableTextBlock[];

    /* Objects */

    type Image = {
      _key: string;
      _type: "image";
      asset: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
      };
      hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
      };
      crop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
      altText?: string;
      width: number;
      height: number;
      lqip: string;
    };

    type SEO = {
      seoDescription?: string;
      seoImage?: Image;
      seoTitle?: string;
    };

    type Link = {
      _key: string;
      _type: string;
      title: string;
      reference?: {
        _id: string;
        _type: string;
        slug: string;
      };
      externalUrl?: string;
      url?: string;
    };

    /* Grid Layout */
    type GridLayout = "full" | "two-column" | "three-column";

    /* Project Blocks */
    type ImageObject = Image & {
      gridLayout: GridLayout;
    };

    type VideoObject = {
      _type: "videoObject";
      _key: string;
      asset: {
        _type: "file";
        asset: {
          _ref: string;
          _type: "reference";
        };
      };
      gridLayout: GridLayout;
    };

    type TextObject = {
      _type: "textObject";
      _key: string;
      content: BlockContent;
      gridLayout: GridLayout;
    };

    type ProjectBlock = ImageObject | VideoObject | TextObject;

    /* Blocks Array */

    type Blocks = Board & SanityArrayItem;

    /* Blocks */

    type Board = {
      _type: "board";
      image?: Image;
      title: string;
      lead?: string;
      buttonGroup: Link[];
    };

    /* Documents */

    type Homepage = {
      _id: string;
      _type: "homepage";
      title: string;
      projects?: Project[];
    };

    export type Post = {
      _id: string;
      _type: "post";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      title?: string;
      slug?: string;
      mainImage?: Image;
      blocks?: Blocks[];
    };

    type Project = {
      _id: string;
      _type: "project";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      title: string;
      slug: string;
      mainImage: Image;
      blocks?: ProjectBlock[];
      seo?: SEO;
      projectType: "story" | "work";
    };

    type Page = {
      _id: string;
      _type: "page";
      title: string;
      slug: string;
      content: BlockContent;
      seo?: SEO;
    };

    type Category = {
      _id: string;
      _type: "category";
      slug: string;
      title: string;
      relatedProjects?: Project[];
      seo?: SEO;
    };

    /* Settings */

    type Settings = {
      _id: string;
      _type: "settings";
      headerNavigation: Link[];
      footerNavigation: Link[];
      contact?: {
        name?: string;
        email?: string;
        phone?: string;
      };
      socialMedia?: {
        linkedIn?: string;
      };
      address?: {
        address: string;
        postalCode: string;
        location: string;
      };
      categories: Category[];
      seo: SEO;
    };
  }
}

export {};
