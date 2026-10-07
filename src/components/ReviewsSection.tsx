import type { CSSProperties } from "react";
import { reviews, stats } from "@/data/content";
import { GoogleIcon, StarIcon } from "./icons";

function ReviewCard({
  review,
  duplicate = false,
}: {
  review: (typeof reviews)[number];
  duplicate?: boolean;
}) {
  return (
    <article
      aria-hidden={duplicate || undefined}
      className="shadow text-card-foreground flex min-w-[328px] max-w-[328px] snap-center snap-always flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-100 p-3 transition-shadow duration-300 hover:shadow-md md:rounded-3xl lg:min-w-[360px] lg:max-w-[360px] lg:p-4 lg:px-0"
    >
      <div className="flex flex-col space-y-1.5 gap-2 p-0 md:px-4">
        <div className="flex gap-2 font-semibold leading-none tracking-tight">
          <GoogleIcon className="h-6 w-6 shrink-0" />
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} filled={i < review.stars} className="h-5 w-5" />
            ))}
          </div>
        </div>
        <div className="line-clamp-4 text-sm text-sh6! text-primary-900 lg:text-sh2!">
          &ldquo; {review.quote} &rdquo;
        </div>
      </div>

      <div className="flex gap-5 p-0 md:px-4">
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-primary-150! text-xs font-semibold text-primary-600 md:text-base">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted bg-primary-150! text-xs font-semibold text-primary-600 md:text-base">
            {review.initials}
          </span>
        </span>
        <div>
          <h4 className="text-xs font-medium text-gray-600 lg:text-sm">{review.name} </h4>
          <p className="text-[10px] text-gray-400 lg:text-sm">
            {review.city} &bull; {review.category}
          </p>
        </div>
      </div>
    </article>
  );
}

/**
 * Reviews + stats live in ONE section on the original page:
 * h1 → marquee → 3-column stats grid (bg-gray-100, lg:py-12).
 */
export default function ReviewsSection() {
  return (
    <section className="flex flex-col gap-5 bg-gray-100 py-4 lg:gap-12 lg:py-12">
      <h1 className="px-4 text-center font-ubuntu text-d7 md:max-w-full md:text-d4">
        <span className="undefined">Served more than </span>{" "}
        <span className="text-decorative-orange">1 Lakh Orders</span>
      </h1>

      <div className="flex snap-x snap-mandatory gap-5 overflow-hidden py-3">
        <div
          className="group overflow-hidden p-2"
          style={{ "--duration": "40s" } as CSSProperties}
        >
          <div className="flex w-max animate-marquee-horizontal flex-row gap-4 px-4 group-hover:[animation-play-state:paused] [--duration:60s]">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup === 1 || undefined}
                className="flex shrink-0 [gap:1rem]"
              >
                {reviews.map((review) => (
                  <ReviewCard key={`${dup}-${review.name}`} review={review} duplicate={dup === 1} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto grid w-full grid-cols-3 justify-between gap-3 border-y-2 border-neutral-150 px-0 py-4 md:gap-6 md:py-6">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <h3 className="bg-review-gradient py-0 text-center font-ubuntu text-2xl font-bold text-transparent bg-clip-text md:py-3 lg:text-6xl">
              {stat.value}
            </h3>
            <p className="text-center font-interr text-xs capitalize text-gray-800 sm:text-xl">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
