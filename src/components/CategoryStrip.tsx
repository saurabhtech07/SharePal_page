"use client";

import { useRef } from "react";
import Link from "next/link";
import { superCategories } from "@/data/content";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

/**
 * Super-category strip that sits at the top of the container, sticky below the
 * fixed header (84px) on md+ and at top-0 on mobile. Matches SharePal's swiper
 * (free-mode, mobile-only chevron arrows overlaying the edges).
 */
export default function CategoryStrip() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="sticky top-0 z-20 bg-transparent py-1 transition-all duration-300 md:mx-0 md:w-full md:top-[84px] md:bg-neutral-150">
      <div className="relative mx-auto w-full max-w-3xl px-8">
        <div
          ref={scroller}
          className="no-scrollbar flex w-full items-center overflow-x-auto scroll-smooth"
        >
          {superCategories.map((cat) => (
            <div
              key={cat.shortName}
              className="mr-[10px] shrink-0 basis-[40%] px-2 py-2 pl-2 text-center sm:basis-1/2 md:basis-1/3 md:px-4 lg:basis-1/4"
            >
              <div className="relative w-full cursor-pointer">
                <Link
                  href={cat.href}
                  className="relative inline-block w-full max-w-44 px-3"
                >
                  <span
                    className={`inline-block text-sh5! text-gray-200 transition-all duration-300 hover:text-sh5! hover:text-gray-900 md:text-neutral-700 ${
                      cat.active ? "text-sh4!" : ""
                    }`}
                  >
                    {cat.shortName}
                    {cat.active && (
                      <div className="absolute left-1/2 mx-auto mt-2 h-[2px] w-full -translate-x-1/2 rounded-full bg-category-purple md:w-10/12" />
                    )}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* mobile-only swiper arrows */}
        <button
          type="button"
          aria-label="Scroll categories left"
          onClick={() => scrollBy(-1)}
          className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-transparent text-neutral-900 m-0 cursor-pointer border border-gray-200 p-2 absolute left-1 top-1/2 flex h-6 w-7 -translate-y-1/2 rounded-full border-none hover:border hover:border-gray-100 hover:bg-primary-900 md:hidden md:h-8 md:w-8"
        >
          <ChevronLeftIcon className="size-4 text-gray-400" />
        </button>
        <button
          type="button"
          aria-label="Scroll categories right"
          onClick={() => scrollBy(1)}
          className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-transparent text-neutral-900 m-0 cursor-pointer border border-gray-200 p-2 absolute right-1 top-1/2 flex h-6 w-7 -translate-y-1/2 rounded-full border-none hover:border hover:border-gray-100 hover:bg-primary-900 md:hidden md:h-8 md:w-8"
        >
          <ChevronRightIcon className="size-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
