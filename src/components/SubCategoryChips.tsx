"use client";

import { useRef } from "react";
import { subCategories } from "@/data/content";
import { ChevronLeftIcon, ChevronRightIcon, GridIcon } from "./icons";

type Props = {
  active: string;
  onChange: (name: string) => void;
};

export default function SubCategoryChips({ active, onChange }: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <section className="container relative mt-4 md:mt-6">
      <div className="relative">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
          className="absolute -left-1 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-500 shadow-sm transition-all hover:bg-white hover:text-primary-600 md:flex"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-0.5 py-1 no-scrollbar md:gap-3 md:px-10"
        >
          {subCategories.map((sub) => {
            const isActive = active === sub.name;
            return (
              <button
                key={sub.name}
                type="button"
                onClick={() => onChange(sub.name)}
                aria-pressed={isActive}
                className={`group flex shrink-0 snap-center items-center gap-2 rounded-2xl border px-2 py-2 transition-all duration-300 md:gap-2.5 md:px-3 ${
                  isActive
                    ? "border-primary-500 bg-primary-50 shadow-[0_4px_14px_rgba(25,69,232,0.16)]"
                    : "border-neutral-200 bg-white hover:border-primary-200 hover:bg-primary-50/50"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl md:h-11 md:w-11 ${
                    isActive ? "bg-primary-150" : "bg-neutral-150"
                  }`}
                >
                  {sub.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sub.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <GridIcon
                      className={`h-4 w-4 md:h-5 md:w-5 ${isActive ? "text-primary-600" : "text-neutral-500"}`}
                    />
                  )}
                </span>
                <span
                  className={`whitespace-nowrap text-sh7 md:text-sh5 ${
                    isActive ? "text-primary-600" : "text-neutral-700"
                  }`}
                >
                  {sub.name}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
          className="absolute -right-1 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-500 shadow-sm transition-all hover:bg-white hover:text-primary-600 md:flex"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
