import { Briefcase, Image, LetterText, Video } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

const gridLayout = defineField({
  name: "gridLayout",
  title: "Layout",
  type: "string",
  options: {
    list: [
      { title: "Full Width", value: "full" },
      { title: "Two Column", value: "two-column" },
      { title: "Three Column", value: "three-column" },
    ],
  },
  initialValue: "full",
});

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: Briefcase,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      type: "array",
      title: "Categories",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      group: "content",
    }),
    defineField({
      name: "projectType",
      type: "string",
      title: "Project Type",
      options: {
        list: [
          { title: "Project", value: "project" },
          { title: "Story", value: "story" },
          { title: "Sketch", value: "sketch" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "project",
      group: "content",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Cover Image",
      options: {
        hotspot: true,
      },
      group: "content",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocks",
      title: "Page Content",
      type: "array",
      options: {
        layout: "grid",
      },
      of: [
        defineArrayMember({
          name: "imageObject",
          title: "Image",
          type: "image",
          icon: Image,
          fields: [
            defineField({
              name: "altText",
              title: "Alternative text (for screen readers)",
              type: "string",
              description:
                "Describe the image for users who can't see it. Important for accessibility and SEO.",
              validation: (Rule) => Rule.required(),
            }),
            gridLayout,
          ],
        }),
        defineArrayMember({
          name: "videoObject",
          title: "Video",
          type: "file",
          icon: Video,
          fields: [gridLayout],
        }),
        defineArrayMember({
          name: "textObject",
          title: "Text",
          type: "object",
          icon: LetterText,
          fields: [
            defineField({
              name: "content",
              title: "Content",
              type: "blockContent",
            }),
            gridLayout,
          ],
        }),
      ],
      group: "content",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "projectType",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : "",
        media,
      };
    },
  },
});
