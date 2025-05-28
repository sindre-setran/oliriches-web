"use client";

import { useEffect, useState } from "react";

import Wrapper from "@/components/wrapper";
import docToUrl from "@/lib/docToUrl";
import linkHandler from "@/lib/linkHandler";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

/* eslint-disable @next/next/no-img-element */

export default function Header({ settings }: { settings: Project.Settings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const shouldShowToggle =
    pathname === "/" ||
    pathname.startsWith("/category") ||
    (pathname.startsWith("/work") && searchParams.get("type") !== "story");

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
                  <Link className="link-hover" href="/">
                    Work
                  </Link>
                </li>
                {settings.headerNavigation.map((link: Project.Link, index: number) => (
                  <li key={index}>{linkHandler(link, "link-hover")}</li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </AnimatePresence>
      )}

      {shouldShowToggle && (
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
              {pathname === "/about" ? (
                <img src="/images/oli-logo.png" alt="Logo" className="h-[33px]" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="33"
                  viewBox="0 0 50 33"
                  fill="none"
                >
                  <path
                    d="M43.4 0H27.4H20.8H6.8H0V6.6V26.3V33H6.6H20.6H27.2V26.4V6.6H43.2V15.2H50V6.6V0H43.4ZM20.7 26.4H6.7V6.6H20.7V26.4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M35.7 8.39999H29.1V17.1L44.9 33L49.6 28.3L35.7 14.4V8.39999Z"
                    fill="currentColor"
                  ></path>
                </svg>
              )}
            </Link>
          </div>
          <nav className="hidden lg:block text-sm uppercase text-right">
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
                <li key={index}>{linkHandler(link, "link-hover")}</li>
              ))}
            </ul>
          </nav>
          <div className="lg:hidden">
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
