import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: Settings,
  groups: [
    {
      name: "navigation",
      title: "Navigation",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "contact",
      title: "Contact",
    },
  ],
  fields: [
    defineField({
      name: "headerNavigation",
      type: "array",
      of: [{ type: "link" }],
      group: "navigation",
    }),

    defineField({
      name: "logo",
      type: "object",
      fields: [
        {
          name: "primary",
          type: "image",
        },
        {
          name: "secondary",
          type: "image",
        },
      ],
      group: "navigation",
    }),

    /*defineField({
      name: "footerNavigation",
      type: "array",
      of: [{ type: "link" }],
      group: "navigation",
    }),*/
    defineField({
      name: "contact",
      title: "Contact information",
      type: "object",
      group: "contact",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "email",
        },

        /*{
          name: "phone",
          title: "Phone number",
          type: "string",
        },*/
      ],
    }),

    /*defineField({
      name: "address",
      type: "object",
      fields: [
        {
          name: "address",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "postalCode",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "location",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
      group: "contact",
    }),

    defineField({
      name: "socialMedia",
      title: "Social media",
      type: "object",
      fields: [
        {
          title: "LinkedIn",
          name: "linkedIn",
          type: "url",
        },
      ],
      group: "contact",
    }),*/
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
});
