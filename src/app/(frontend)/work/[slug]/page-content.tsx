"use client";

import { useEffect } from "react";

import Blocks from "@/components/blocks";
import MasonryGrid from "@/components/masonry-grid";
import Wrapper from "@/components/wrapper";

export default function WorkPageContent({
  project,
  homepageProjects,
}: {
  project: Project.Project;
  homepageProjects: Project.Project[];
}) {
  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.style.backgroundColor = "white";
    }
  }, []);

  return (
    <>
      <Wrapper className="pt-40 pb-8 md:pb-12">
        <h1 className="sr-only">{project?.title}</h1>
        <Blocks blocks={project.blocks || []} />
      </Wrapper>
      <Wrapper className="bg-white">
        <MasonryGrid projects={homepageProjects} className="py-8 md:py-12" />
      </Wrapper>
    </>
  );
}
