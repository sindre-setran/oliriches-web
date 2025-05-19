"use client";

import BlockContent from "@/components/block-content";
import SanityImage from "@/components/sanity-image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const getGridLayoutClass = (layout: Project.GridLayout) => {
  switch (layout) {
    case "full":
      return "col-span-full";
    case "two-column":
      return "col-span-6";
    case "three-column":
      return "col-span-4";
    default:
      return "col-span-full";
  }
};

const blockVariants: Variants = {
  offscreen: {
    y: 24,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.8,
    },
  },
};

export default function Blocks({ blocks }: { blocks: Project.Blocks[] }) {
  if (!blocks) {
    return null;
  }

  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-[34px]">
      {blocks.map((block, index) => {
        switch (block._type) {
          case "imageObject": {
            return (
              <motion.div
                key={block._key}
                className={getGridLayoutClass(block.gridLayout)}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={blockVariants}
                custom={index}
              >
                <SanityImage
                  image={block}
                  width={block.gridLayout === "full" ? 2560 : 1280}
                  quality={90}
                />
              </motion.div>
            );
          }
          case "videoObject": {
            return (
              <motion.div
                key={block._key}
                className={getGridLayoutClass(block.gridLayout)}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={blockVariants}
                custom={index}
              >
                <video src={block.asset.url} autoPlay muted loop playsInline className="w-full" />
              </motion.div>
            );
          }
          case "textObject": {
            return (
              <motion.div
                key={block._key}
                className={cn(getGridLayoutClass(block.gridLayout), "text-center py-6")}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={blockVariants}
                custom={index}
              >
                <BlockContent
                  className="max-w-screen-md mx-auto text-balance"
                  value={block.content}
                />
              </motion.div>
            );
          }
        }
      })}
    </div>
  );
}
