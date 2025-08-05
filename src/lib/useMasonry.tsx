import { useEffect, useRef, useState } from "react";

const useMasonry = () => {
  const masonryContainer = useRef<HTMLDivElement | null>(null);
  const [isLayoutComplete, setIsLayoutComplete] = useState(false);

  useEffect(() => {
    const handleMasonry = () => {
      if (!masonryContainer.current) return;

      const container = masonryContainer.current;
      const items = Array.from(container.children) as HTMLElement[];
      if (items.length === 0) return;

      // Wait for images to load before calculating layout
      const images = container.querySelectorAll("img");
      const imagePromises = Array.from(images).map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        // Get container width and calculate number of columns
        const containerWidth = container.offsetWidth;
        const gap = 20; // 5 * 4 (gap-5 = 1.25rem = 20px)

        // Calculate number of columns based on container width
        let numColumns = 1;
        if (containerWidth >= 640) numColumns = 2; // sm:grid-cols-2
        if (containerWidth >= 768) numColumns = 3; // md:grid-cols-3

        // Calculate item width based on container and columns
        const itemWidth = (containerWidth - gap * (numColumns - 1)) / numColumns;

        console.log("Masonry Debug:", {
          containerWidth,
          numColumns,
          itemWidth,
          gap,
          itemsCount: items.length,
        });

        // Reset positioning and set item width
        items.forEach((item) => {
          item.style.position = "absolute";
          item.style.top = "0";
          item.style.left = "0";
          item.style.width = `${itemWidth}px`;
        });

        // Calculate column heights
        const columnHeights = new Array(numColumns).fill(0);
        const columnWidth = itemWidth + gap;

        // Position items
        items.forEach((item, index) => {
          // Find the shortest column
          const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));

          // Calculate position
          const left = shortestColumn * columnWidth;
          const top = columnHeights[shortestColumn];

          // Position the item
          item.style.left = `${left}px`;
          item.style.top = `${top}px`;

          // Update column height
          columnHeights[shortestColumn] += item.offsetHeight + gap;

          console.log(`Item ${index}:`, {
            shortestColumn,
            left,
            top,
            height: item.offsetHeight,
            columnHeights: [...columnHeights],
          });
        });

        // Set container height to accommodate all items
        const maxHeight = Math.max(...columnHeights);
        container.style.height = `${maxHeight}px`;
        container.style.position = "relative";

        setIsLayoutComplete(true);
      });
    };

    // Initial layout with a small delay to ensure DOM is ready
    const timer = setTimeout(handleMasonry, 100);

    // Handle resize
    const resizeObserver = new ResizeObserver(handleMasonry);
    if (masonryContainer.current) {
      resizeObserver.observe(masonryContainer.current);
    }

    // Handle window resize
    window.addEventListener("resize", handleMasonry);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleMasonry);
    };
  }, []);

  return { masonryContainer, isLayoutComplete };
};

export default useMasonry;
