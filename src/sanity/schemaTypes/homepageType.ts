import { Home } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projects",
      type: "array",
      title: "Projects",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
    }),
  ],
});
