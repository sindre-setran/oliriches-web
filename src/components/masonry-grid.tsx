"use client";

import { useEffect, useRef, useState } from "react";

import SanityImage from "@/components/sanity-image";
import docToUrl from "@/lib/docToUrl";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    const handleMasonry = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const items = Array.from(container.children) as HTMLElement[];
      if (items.length === 0) return;

      // Get container width
      const containerWidth = container.offsetWidth;
      const gap = 20; // gap-5 = 1.25rem = 20px

      // Calculate number of columns
      let numColumns = 1;
      if (containerWidth >= 640) numColumns = 2;
      if (containerWidth >= 768) numColumns = 3;

      // Calculate item width
      const itemWidth = (containerWidth - gap * (numColumns - 1)) / numColumns;

      // Reset styles
      items.forEach((item) => {
        item.style.position = "absolute";
        item.style.width = `${itemWidth}px`;
        item.style.left = "0";
        item.style.top = "0";
      });

      // Calculate positions
      const columnHeights = new Array(numColumns).fill(0);
      const columnWidth = itemWidth + gap;

      items.forEach((item) => {
        // Find shortest column
        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));

        // Position item
        const left = shortestColumn * columnWidth;
        const top = columnHeights[shortestColumn];

        item.style.left = `${left}px`;
        item.style.top = `${top}px`;

        // Update column height
        columnHeights[shortestColumn] += item.offsetHeight + gap;
      });

      // Set container height
      const maxHeight = Math.max(...columnHeights);
      container.style.height = `${maxHeight}px`;
      container.style.position = "relative";

      // Mark layout as ready
      setIsLayoutReady(true);
    };

    // Initial layout
    const timer = setTimeout(handleMasonry, 100);

    // Handle resize
    const resizeObserver = new ResizeObserver(handleMasonry);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", handleMasonry);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleMasonry);
    };
  }, [projects]);

  return (
    <div ref={containerRef} className={cn("mt-40", className)}>
      {projects?.map((project: Project.Project, index: number) => (
        <div key={project._id + index}>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            animate={isLayoutReady ? undefined : "offscreen"}
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
