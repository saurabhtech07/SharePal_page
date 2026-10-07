"use client";

import { subCategories } from "@/data/content";

type Props = {
  active: string;
  onChange: (name: string) => void;
};

/**
 * Sticky left icon rail — present on every breakpoint (80px mobile, 100px md,
 * 120px lg), matching SharePal's category sidebar.
 */
export default function SubCategoryRail({ active, onChange }: Props) {
  return (
    <aside className="block w-[80px] shrink-0 md:w-full">
      <div className="sticky top-[140px] h-full max-h-[calc(100dvh-160px)] overflow-y-auto rounded-lg bg-gray-100 p-1 shadow-[0_2px_15px_rgba(0,0,0,0.06)] transition-all duration-300 scrollbar-none max-md:py-3 md:top-[140px] md:h-full md:max-h-[calc(100dvh-10rem)] md:rounded-xl md:p-3">
        <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
          {subCategories.map((sub) => {
            const isActive = active === sub.name;
            const icon =
              sub.image ||
              "https://images.sharepal.in/misc/hard-coded/sharepal/Product%3DAll%20Products.webp";
            return (
              <button
                key={sub.name}
                type="button"
                onClick={() => onChange(sub.name)}
                aria-pressed={isActive}
                className="group flex flex-col items-center justify-center gap-0.5 transition-all duration-300 md:gap-1"
              >
                <div
                  className={`relative flex aspect-square w-12 items-center justify-center overflow-hidden rounded-lg p-1 transition-all duration-300 group-hover:bg-gray-100 md:w-14 md:rounded-xl md:p-1.5 lg:w-16 ${
                    isActive ? "border-2 border-primary-500 bg-gray-100" : "border bg-gray-50"
                  }`}
                >
                  <div className="">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={sub.name}
                      loading="lazy"
                      width={80}
                      height={80}
                      className={`h-full w-full object-contain transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? "scale-105" : "scale-100"
                      }`}
                      src={icon}
                    />
                  </div>
                </div>
                {isActive ? (
                  <span className="text-center text-[10px] font-semibold leading-tight text-primary-500 md:text-xs md:font-bold lg:text-sh5">
                    {sub.name}
                    <div className="mx-auto mt-0.5 h-[2px] w-4 rounded-full bg-primary-500 md:w-6 lg:w-8" />
                  </span>
                ) : (
                  <span className="line-clamp-2 max-w-[50px] text-center text-[10px] font-semibold leading-tight text-neutral-900 md:max-w-[60px] md:text-xs md:font-bold lg:max-w-[80px] lg:text-sh5">
                    {sub.name}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
