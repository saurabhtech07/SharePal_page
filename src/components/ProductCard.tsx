"use client";

import { useState } from "react";
import { CheckIcon, HeartIcon, PlusIcon } from "./icons";
import type { RentalDates } from "./Header";

export type Product = {
  id: number;
  name: string;
  image: string;
  rating: number;
  booked_count: number;
  tag: string;
  sub: string;
  per_day_rent: number;
  out_of_stock: boolean;
  href?: string;
};

/** rental days between delivery & pickup (return day is not charged) */
export function rentalDays(dates: RentalDates) {
  if (!dates) return 0;
  const diff =
    (new Date(dates.pickup + "T00:00:00").getTime() -
      new Date(dates.delivery + "T00:00:00").getTime()) /
    86400000;
  return Math.max(1, Math.round(diff) - 1);
}

export default function ProductCard({
  product,
  dates,
  onAdd,
}: {
  product: Product;
  dates: RentalDates;
  onAdd: (p: Product) => void;
}) {
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const { name, image, tag, per_day_rent, out_of_stock } = product;

  const days = rentalDays(dates);
  const total = days * per_day_rent;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (out_of_stock || added) return;
    setAdded(true);
    onAdd(product);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((v) => !v);
  };

  return (
    <a
      href={product.href ?? "#products-section"}
      className="block h-full"
      aria-label={name}
    >
      <div className="shadow border text-card-foreground group relative flex h-full flex-col overflow-hidden rounded-2xl border-none bg-transparent p-2.5 leading-5 transition-all duration-300 hover:bg-gray-100 max-md:bg-gray-100 md:rounded-3xl md:p-3">
        {/* ---------- image ---------- */}
        <div className="relative aspect-square flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 p-1.5 md:rounded-2xl md:p-3">
          <div className="p-3 md:p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`These are product images of Rent ${name} by SharePal.`}
              width={300}
              height={300}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {tag && (
            <div className="absolute left-2 top-2 inline-flex items-center rounded-lg border px-1.5 py-0 text-[10px] font-semibold text-decorative-orange border-decorative-orange transition-colors md:left-3 md:top-3 md:border-2 md:px-2.5 md:py-0.5 md:text-xs">
              {tag}
            </div>
          )}

          <button
            type="button"
            onClick={handleLike}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-1 top-1 h-max w-max scale-80 justify-end p-0 text-gray-500 opacity-10 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 md:right-3 md:top-3 md:opacity-0"
          >
            <HeartIcon
              filled={liked}
              className={`h-5 w-5 md:h-6 md:w-6 ${liked ? "text-decorative-pink" : ""}`}
            />
          </button>

          {out_of_stock && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/70 md:rounded-2xl">
              <span className="rounded-full bg-primary-900 px-3 py-1 text-sh6 text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* ---------- body ---------- */}
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col items-start justify-center gap-1 p-0 pb-1 pt-2.5 md:gap-2.5 md:p-2 md:pb-0">
            <h2 className="line-clamp-2 text-b6 font-bold md:text-sh2">{name}</h2>
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-0 p-6 px-0 py-0 md:gap-1 md:px-2">
            <div aria-hidden="true" className="my-1 h-[1px] w-full bg-neutral-200" />

            <div className="flex w-full items-end justify-between gap-1 max-md:flex-wrap md:gap-2">
              <div className="flex flex-col items-baseline justify-between gap-0 md:gap-1">
                <div className="flex items-center gap-1 text-o3 text-gray-600 md:text-sh5">
                  Select Dates to view price
                </div>
                <div className="flex items-center justify-center text-sh4 text-gray-900 md:text-h6">
                  <p>
                    ₹
                    <span className={`inline-flex ${dates ? "" : "blur-sm"}`}>
                      {dates ? total.toLocaleString("en-IN") : "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 max-md:w-full md:gap-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={out_of_stock}
                  aria-label={`Add ${name} to cart`}
                  className="flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-primary-900 bg-transparent px-4 py-2 text-sm font-medium text-neutral-900 transition-all duration-300 hover:bg-neutral-150 active:opacity-90 disabled:pointer-events-none disabled:opacity-50 max-md:w-full max-md:px-4 md:h-9 md:w-9 md:rounded-full md:p-2 lg:h-12 lg:w-12"
                >
                  <span className="text-bt4 md:hidden">
                    {added ? "Added" : "Add to Cart"}
                  </span>
                  {added ? (
                    <CheckIcon className="h-4 w-4 text-primary-500 md:h-5 md:w-5" />
                  ) : (
                    <PlusIcon className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="w-full md:mt-2">
              <div className="mt-1 line-clamp-1 hidden items-center gap-1 text-sh7 text-decorative-pink md:mt-0 md:text-sh5">
                <svg
                  className="min-w-4 md:min-w-5"
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 1.5l2.7 1.9 3.3-.4 1.2 3.1 3.1 1.2-.4 3.3L23.8 15l-1.9 2.7.4 3.3-3.1 1.2-1.2 3.1-3.3-.4L12 26.8l-2.7-1.9-3.3.4-1.2-3.1-3.1-1.2.4-3.3L.2 15l1.9-2.7-.4-3.3 3.1-1.2 1.2-3.1 3.3.4L12 1.5zm-1.1 13.9l5.6-5.6-1.6-1.6-4 4-1.9-1.9-1.6 1.6 3.5 3.5z"
                    fill="currentColor"
                  />
                </svg>
                <span className="overflow-hidden whitespace-nowrap">
                  <span className="inline-block animate-marquee-horizontal pl-2">
                    Lowest Price Guarantee&nbsp;&nbsp;·&nbsp;&nbsp;Lowest Price
                    Guarantee&nbsp;&nbsp;·&nbsp;&nbsp;Lowest Price Guarantee&nbsp;&nbsp;·&nbsp;&nbsp;
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
