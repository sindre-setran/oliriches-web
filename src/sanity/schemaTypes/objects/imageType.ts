import { Image } from "lucide-react";
import { defineField, defineType } from "sanity";

export const imageType = defineType({
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
  ],
  options: {
    hotspot: true,
  },
});
