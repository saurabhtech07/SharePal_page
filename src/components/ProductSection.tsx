"use client";

import { useMemo, useState } from "react";
import ProductCard, { type Product } from "./ProductCard";
import type { RentalDates } from "./Header";

type Props = {
  products: Product[];
  activeSub: string;
  dates: RentalDates;
  onAdd: (p: Product) => void;
};

const PAGE_SIZE = 12;

/** maps rail sub-category names to product predicates (API sc_name based) */
function matchesSub(p: Product, sub: string): boolean {
  switch (sub) {
    case "All":
      return true;
    case "Racing Wheel":
      return /racing wheel|logitech wheel|g29/i.test(p.name);
    case "PS5 Console":
    case "Xbox Console":
    case "VR":
    case "GTA VI":
    case "Big Screen Gaming":
      return p.sub === sub;
    default:
      return p.sub === sub;
  }
}

export default function ProductSection({ products, activeSub, dates, onAdd }: Props) {
  const [shown, setShown] = useState(PAGE_SIZE);

  const visible = useMemo(
    () => products.filter((p) => matchesSub(p, activeSub)),
    [products, activeSub],
  );

  // reset pagination whenever the sub-category changes
  const [lastSub, setLastSub] = useState(activeSub);
  if (lastSub !== activeSub) {
    setLastSub(activeSub);
    setShown(PAGE_SIZE);
  }

  const count = Math.min(shown, visible.length);

  return (
    <section id="products-section" className="relative z-[1] scroll-mt-32 pb-10">
      <div className="container px-0">
        {/* heading row */}
        <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-3 md:py-4">
          <h1 className="font-inter text-sh4 capitalize md:max-w-full md:text-h2">
            gaming gadgets on rent
          </h1>
          <p className="flex items-center justify-center gap-1 text-b6 text-neutral-300 md:text-b2">
            <span className="hidden md:inline-flex">Total items: </span>
            <span className="text-neutral-500">{visible.length} items</span>
          </p>
        </div>

        {/* grid */}
        {visible.length > 0 ? (
          <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-5 md:mt-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {visible.slice(0, count).map((p) => (
              <ProductCard key={p.id} product={p} dates={dates} onAdd={onAdd} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-neutral-200 bg-gray-100 px-6 py-14 text-center">
            <p className="text-sh3 text-neutral-900">Nothing in this sub-category yet</p>
            <p className="max-w-md text-b5 text-neutral-500">
              We are adding more {activeSub.toLowerCase()} gear to Bangalore soon.
            </p>
          </div>
        )}

        {/* results count + show more */}
        <div className="mt-5 flex w-full flex-col items-center justify-center border-t border-gray-200 py-7 md:mt-10">
          <p className="pb-3 text-sm text-gray-400 md:text-base">
            Showing {count} of {visible.length} results
          </p>
          {count < visible.length && (
            <button
              type="button"
              onClick={() => setShown((s) => s + PAGE_SIZE)}
              className="inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-4xl border-2 border-neutral-900 bg-gray-100 p-5 text-base font-medium transition-colors hover:bg-neutral-150 active:opacity-90 sm:max-w-72 md:p-6"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
