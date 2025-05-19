import { Columns2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const boardType = defineType({
  name: "board",
  icon: Columns2,
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lead",
      title: "Lead",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "buttonGroup",
      type: "array",
      of: [{ type: "linkInternal" }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: "image",
      type: "imageObject",
    }),
  ],
});
