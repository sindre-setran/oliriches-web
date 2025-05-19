import { defineQuery } from "next-sanity";
import { groq } from "next-sanity";

const IMAGE_FIELDS = groq`
  ...,
  altText,
  ...asset-> {
    ...metadata {
      lqip,
      ...dimensions {
        width,
        height
      }
    }
  }
`;

const LINK_FIELD = groq`
  "reference": reference -> {
    _id,
    _type,
    "slug": slug.current,
  },
  externalUrl,
  title,
  _type,
  _key,
`;

/*const BLOCKS_FIELD = groq`
  _key,
  _type,
  _type == "board" => {
    title,
    lead,
    image {
      ...,
      asset ->
    },
    buttonGroup[] {
      ${LINK_FIELD}
    },
  },
`;*/

const GALLERY_FIELD = groq`
  _key,
  _type,
  gridLayout,
  _type == "imageObject" => {
    ${IMAGE_FIELDS},
  },
  _type == "videoObject" => {
    asset ->
  },
  _type == "textObject" => {
    content
  },
`;

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
  headerNavigation[] {
    ${LINK_FIELD} 
  },
  footerNavigation[] {
    ${LINK_FIELD}
  },
  address,
  contact,
  socialMedia,
  seo,
  "categories": *[_type == "category"] {
    _id,
    _type,
    title,
    "slug": slug.current,
  }
}`);

export const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0]{
  _id,
  _type,
  title,
  projects[] -> {
    _id,
    _type,
    title,
    "slug": slug.current,
    mainImage {
      ${IMAGE_FIELDS},
    },
  }
}`);

export const CATEGORY_QUERY = defineQuery(`*[_type == "category" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  "relatedProjects": *[_type == "project" && references(^._id)]{
    _id,
    _type,
    title,
    "slug": slug.current,
    mainImage {
      ${IMAGE_FIELDS}
    }
  }
}`);

/*export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id,
  title,
  slug
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title,
  body,
  mainImage,
  blocks[] {
    ${BLOCKS_FIELD}
  },
  seo,
}`);*/

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  blocks[] {
    ${GALLERY_FIELD}
  },
  seo,
}`);

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  content,
  seo,
}`);

export const PAGE_PATHS_QUERY = defineQuery(`*[slug != null && !(_id in path('drafts.**'))]{
  _type,
  _id,
  "slug": slug.current
}`);
