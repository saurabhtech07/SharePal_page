"use client";

import Link from "next/link";
import { useState } from "react";
import { footerColumns, footerGroups } from "@/data/content";
import { footerLogoA, footerLogoB } from "@/data/footer-logo";
import { footerProse } from "@/data/footer-prose";
import {
  ArrowUpIcon,
  ChevronDownIcon,
} from "./icons";

export default function Footer() {
  const [openCol, setOpenCol] = useState<string | null>(null);
  const [proseOpen, setProseOpen] = useState(false);

  const goUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary-900 py-5 pb-16 text-white md:py-[72px] md:pb-10">
      <div className="container mx-auto flex w-full flex-col gap-5 md:gap-12">
        {/* ---------- category link columns (desktop) ---------- */}
        <div className="grid max-w-full gap-6 max-md:hidden md:grid-cols-4 md:gap-10 lg:grid-cols-5">
          {footerColumns.map((col) => (
            <div key={col.title} className="flex w-full flex-col gap-4">
              <h3 className="line-clamp-2 h-max text-lg font-semibold text-gray-100">
                {col.title}
              </h3>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="w-fit text-b6 text-neutral-300 transition-all duration-75 hover:text-neutral-200 hover:underline md:text-b4"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* ---------- category accordions (mobile) ---------- */}
        <div className="flex gap-6 md:hidden">
          <div className="flex w-full flex-col gap-3 md:gap-5">
            {footerColumns.map((col) => {
              const isOpen = openCol === col.title;
              return (
                <div key={col.title} className="py-1">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenCol(isOpen ? null : col.title)}
                    className="flex w-full items-center justify-between py-3 text-left text-h6 text-gray-100"
                  >
                    {col.title}
                    <ChevronDownIcon
                      className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-3 pb-4">
                        {col.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="w-fit text-b4 text-neutral-300 hover:text-neutral-200 hover:underline"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- SEO prose (clipped, with Read more) ---------- */}
        <div className="flex w-full flex-col gap-3 md:gap-4">
          <div className="flex flex-col gap-4">
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: proseOpen ? "none" : 260 }}
            >
              <div className="flex w-full flex-col gap-5">
                <div
                  className="text-pretty text-sm text-neutral-300 [&_p]:mb-3 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: footerProse }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setProseOpen((v) => !v)}
              className="w-fit text-sm font-semibold text-primary-100 hover:underline"
            >
              {proseOpen ? "Read less" : "Read more"}
            </button>
          </div>
        </div>

        {/* ---------- logo bar + link groups + bottom bar ---------- */}
        <div className="flex w-full flex-col gap-8">
          <div
            className="flex h-10 w-full items-center bg-footer-logo"
            dangerouslySetInnerHTML={{ __html: footerLogoA + footerLogoB }}
          />

          <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-4">
            <div className="grid w-full grid-cols-2 gap-x-3 gap-y-6 md:justify-between md:gap-3 lg:grid-cols-5">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h2 className="mb-3 min-w-max text-sh4 text-gray-100 md:mb-6">
                    {group.title}
                  </h2>
                  <div className="flex min-w-max flex-col gap-1 text-xs font-[500] text-neutral-300">
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="decora w-full min-w-max transform py-1.5 text-b6 decoration-transparent transition-all duration-300 hover:text-primary-100 hover:underline hover:decoration-white md:py-3 md:text-b4"
                      >
                        {link.label}
                        {link.badge && (
                          <span className="ml-1 inline-flex -translate-y-2 items-center rounded-full border border-none bg-secondary-500 px-2.5 py-[0.5px] text-[10px] font-bold text-secondary-900 transition-colors hover:bg-secondary-600">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full max-md:flex-col items-center justify-between gap-4 border-t border-primary-700 py-6 text-sm font-[500] text-primary-300">
            <button
              type="button"
              onClick={goUp}
              className="flex cursor-pointer items-center gap-2 max-md:w-full max-md:justify-center max-md:rounded-sm max-md:bg-primary-850 max-md:py-2"
            >
              Go up
              <ArrowUpIcon className="h-4 w-4" />
            </button>
            <p>© 2026. SWNAC E-Kiraya Services Pvt Ltd</p>
            <p>Made with ♥️ for India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
