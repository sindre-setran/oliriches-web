"use client";

import { useEffect, useState } from "react";

import Wrapper from "@/components/wrapper";
import docToUrl from "@/lib/docToUrl";
import LinkHandler from "@/lib/linkHandler";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* eslint-disable @next/next/no-img-element */

export default function Header({
  settings,
  work = true,
}: {
  settings: Project.Settings;
  work: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {isOpen && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 z-30 flex items-center justify-center"
          >
            <nav>
              <ul className="text-white uppercase text-3xl sm:text-4xl lg:text-5xl leading-snug text-center">
                <li>
                  <Link
                    className={cn(
                      pathname === "/" ? "text-primary pointer-events-none" : "link-hover"
                    )}
                    href="/"
                  >
                    All
                  </Link>
                </li>
                {settings?.categories?.map((category: Project.Category, index: number) => (
                  <li key={index}>
                    <Link
                      className={cn(
                        pathname === docToUrl(category)
                          ? "text-primary pointer-events-none"
                          : "link-hover"
                      )}
                      href={docToUrl(category)}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </AnimatePresence>
      )}

      {isMenuOpen && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30 flex items-center justify-center"
          >
            <Wrapper className="content-x py-6 w-full absolute top-0 z-20 text-right text-4xl">
              <div className="cursor-pointer inline-block" onClick={() => setIsMenuOpen(false)}>
                <svg
                  className="menu-open-icon"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.97918 29.0208L29.0208 4.97919"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  ></path>
                  <path
                    d="M29.0208 29.0208L4.97919 4.97919"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  ></path>
                </svg>
              </div>
            </Wrapper>
            <nav className="text-white uppercase text-3xl sm:text-4xl leading-snug text-center">
              <ul className="py-16">
                <li>
                  <Link
                    className={cn(
                      pathname === "/" ? "text-primary pointer-events-none" : "link-hover"
                    )}
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Work
                  </Link>
                </li>
                {settings.headerNavigation.map((link: Project.Link, index: number) => (
                  <li key={index}>
                    <LinkHandler
                      link={link}
                      className="link-hover"
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </AnimatePresence>
      )}

      {work && (
        <div className="fixed py-6 z-40 left-1/2 -translate-x-1/2">
          <div
            className={cn(
              "hover:opacity-50 rotate-0 cursor-pointer transition duration-300",
              isOpen && "text-white rotate-45"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 16V0H16V16H0V18H16V34H18V18H34V16H18Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      )}
      <header className="py-6 w-full fixed z-20">
        <Wrapper className="flex justify-between items-center">
          <div>
            <Link href="/" className="inline-block link-hover">
              {work ? (
                <img src={settings.logo.primary.url} alt="Logo" className="h-[33px]" />
              ) : (
                <img src={settings.logo.secondary.url} alt="Logo" className="h-[33px]" />
              )}
            </Link>
          </div>
          <nav className="hidden xl:block text-sm uppercase text-right">
            <ul className="flex items-center gap-5">
              <li>
                <Link
                  className={cn(
                    pathname === "/" ? "text-primary pointer-events-none" : "link-hover"
                  )}
                  href="/"
                >
                  Work
                </Link>
              </li>
              {settings.headerNavigation.map((link: Project.Link, index: number) => (
                <li key={index}>
                  <LinkHandler link={link} className="link-hover" />
                </li>
              ))}
            </ul>
          </nav>
          <div className="xl:hidden">
            <div className="cursor-pointer link-hover" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="menu-closed-icon"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 6H34V8H0V6ZM0 26H34V28H0V26ZM34 16H0V18H34V16Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </Wrapper>
      </header>
    </>
  );
}
