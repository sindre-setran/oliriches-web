"use client";

import Blocks from "@/components/blocks";
import MasonryGrid from "@/components/masonry-grid";
import Wrapper from "@/components/wrapper";
import { cn } from "@/lib/utils";

export default function WorkPageContent({
  project,
  homepageProjects,
}: {
  project: Project.Project;
  homepageProjects: Project.Project[];
}) {
  return (
    <>
      <Wrapper className={cn("pt-40 pb-8 md:pb-12")}>
        <h1 className="sr-only">{project?.title}</h1>
        <Blocks blocks={project.blocks || []} />
      </Wrapper>
      <Wrapper className="bg-white">
        <MasonryGrid projects={homepageProjects} className="py-8 md:py-12" />
      </Wrapper>
    </>
  );
}
