"use client";

import { Suspense, useEffect } from "react";

import Blocks from "@/components/blocks";
import MasonryGrid from "@/components/masonry-grid";
import Wrapper from "@/components/wrapper";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

function WorkPageContentInner({
  project,
  homepageProjects,
}: {
  project: Project.Project;
  homepageProjects: Project.Project[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (project.projectType === "story") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("type", "story");
      router.replace(`?${params.toString()}`);
    }
  }, [project.projectType, router, searchParams]);

  return (
    <>
      <Wrapper
        className={cn("pt-40 pb-8 md:pb-12", project.projectType === "story" && "bg-[#848484]")}
      >
        <h1 className="sr-only">{project?.title}</h1>
        <Blocks blocks={project.blocks || []} />
      </Wrapper>
      <Wrapper className="bg-white">
        <MasonryGrid projects={homepageProjects} className="py-8 md:py-12" />
      </Wrapper>
    </>
  );
}

export default function WorkPageContent({
  project,
  homepageProjects,
}: {
  project: Project.Project;
  homepageProjects: Project.Project[];
}) {
  return (
    <Suspense>
      <WorkPageContentInner project={project} homepageProjects={homepageProjects} />
    </Suspense>
  );
}
