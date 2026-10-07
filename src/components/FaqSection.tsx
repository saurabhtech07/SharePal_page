"use client";

import { useState } from "react";
import { faqs } from "@/data/content";
import { ChevronDownIcon } from "./icons";

const INITIAL_COUNT = 5;

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? faqs : faqs.slice(0, INITIAL_COUNT);

  return (
    <section className="container my-10! rounded-3xl bg-gray-100 p-4 py-10">
      <div className="flex h-full w-full flex-col items-start gap-2 p-4 pt-0! md:p-6">
        <h3 className="flex flex-col flex-wrap items-start gap-0.5 py-2 text-h4 text-neutral-900 md:flex-row md:items-center md:gap-2 md:text-h2">
          Frequently Asked Questions (FAQs)
        </h3>

        <div className="w-full">
          {visible.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                className="border-b rounded-xl border-none bg-gray-100 transition-colors duration-300 hover:bg-gray-150"
              >
                <h3 className="flex">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex flex-1 items-center justify-between px-4 py-4 text-left text-sm font-medium transition-all hover:underline text-sh4 md:text-sh3"
                  >
                    {faq.question}
                    <ChevronDownIcon
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                <div
                  className="grid overflow-hidden text-sm transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-b4 leading-relaxed text-neutral-600 md:text-b2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            setShowAll((v) => !v);
            if (showAll) setOpen(null);
          }}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-4xl ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-neutral-150 text-primary-900 hover:bg-neutral-200 active:opacity-90 h-11 px-6 py-3 text-sm w-full font-semibold md:text-base"
        >
          {showAll ? "View less FAQ's" : "View more FAQ's"}
        </button>
      </div>
    </section>
  );
}
