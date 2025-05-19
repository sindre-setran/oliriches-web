import { cn } from "@/lib/utils";
import {
  PortableText,
  PortableTextComponents,
  PortableTextProps, //PortableTextComponent,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  marks: {
    //link: LinkComponent,
  },
};

export type PortableTextValue = PortableTextProps["value"];

interface Props {
  className?: string;
  value: PortableTextBlock[];
}

export default function BlockContent({ value, className }: Props) {
  return (
    <div className={cn("prose", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
