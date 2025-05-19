"use client";

import Wrapper from "@/components/wrapper";

export default function Footer({ settings }: { settings: Project.Settings }) {
  return (
    <footer className="pb-12 pt-24 relative z-10">
      <Wrapper className="flex">
        <div className="basis-1/3 hidden md:block">
          <a className="link-hover" href={`mailto:${settings.contact?.email}`}>
            {settings.contact?.email}
          </a>
        </div>
        <div className="basis-full md:basis-1/3 text-center">
          <div
            className="inline-block cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 24L17 10L31 24" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </div>
        </div>
        <div className="basis-1/3 text-center md:text-right hidden md:block">
          <p>
            {new Date().getFullYear()} © {settings.contact?.name}
          </p>
        </div>
      </Wrapper>
    </footer>
  );
}
