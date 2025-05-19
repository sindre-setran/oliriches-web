import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  type: "object",
  title: "Fields for SEO",
  fields: [
    defineField({
      name: "seoTitle",
      type: "string",
      title: "Title for SEO and social media",
      description:
        "Title for social media and search engines. Ideally between 15 and 70 characters.",
      validation: (Rule) => Rule.min(3).max(100),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "Short paragraph for SEO and social media (meta description)",
      description:
        "Description for social media and search engines. Ideally between 70 and 160 characters.",
      validation: (Rule) => Rule.min(30).max(200),
    }),
    defineField({
      name: "seoImage",
      type: "image",
      title: "Image for SEO and social media",
      description: "Image for social media and search engines. Ideal size is 1200x630 pixels.",
      options: {
        hotspot: true,
      },
    }),
  ],
});
