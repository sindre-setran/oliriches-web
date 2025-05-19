import type { Link, LinkExternal, LinkInternal } from "@/sanity/types";
import { ExternalLink, Link as LinkIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const title = defineField({
  name: "title",
  title: "Title",
  type: "string",
});

const internalReference = defineField({
  name: "reference",
  title: "Reference",
  type: "reference",
  to: [{ type: "project" }, { type: "category" }, { type: "page" }],
  hidden: ({
    parent,
    value,
  }: {
    parent: Partial<Link | LinkInternal | LinkExternal>;
    value: { _ref: string; _type: "reference" } | undefined;
  }) => !value && parent?._type === "linkExternal" && parent?.externalUrl !== undefined,
});

const externalUrl = defineField({
  name: "externalUrl",
  title: "External URL",
  description: "Opens in a new tab. Only use this field to link to other websites.",
  type: "url",
  hidden: ({
    parent,
    value,
  }: {
    parent: Partial<Link | LinkInternal | LinkExternal>;
    value: string | undefined;
  }) => !value && parent?._type === "linkInternal" && parent?.reference !== undefined,
});

const linkType = defineType({
  title: "Link",
  name: "link",
  type: "object",
  icon: LinkIcon,
  fields: [title, internalReference, externalUrl],
});

const linkInternalType = defineType({
  title: "Internal Link",
  name: "linkInternal",
  type: "object",
  icon: LinkIcon,
  fields: [title, internalReference],
});

const linkExternalType = defineType({
  title: "External Link",
  name: "linkExternal",
  type: "object",
  icon: ExternalLink,
  fields: [title, externalUrl],
});

export { linkType, linkInternalType, linkExternalType };
