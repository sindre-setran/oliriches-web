"use client";

import SanityImage from "@/components/sanity-image";
import docToUrl from "@/lib/docToUrl";
import useMasonry from "@/lib/useMasonry";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";

export default function MasonryGrid({
  projects,
  className,
}: {
  projects: Project.Project[];
  className?: string;
}) {
  const masonryContainer = useMasonry();

  return (
    <div
      className={cn(
        "grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-40",
        className
      )}
      ref={masonryContainer}
    >
      {projects?.map((project: Project.Project, index: number) => (
        <div key={project._id + index}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <Link href={docToUrl(project)}>
              <SanityImage
                image={project.mainImage}
                className="w-full hover:opacity-75 transition-opacity duration-150 ease-out"
              />
            </Link>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

const cardVariants: Variants = {
  offscreen: {
    y: 24,
    opacity: 0,
  },
  onscreen: () => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.8,
      delay: 0,
    },
  }),
};
