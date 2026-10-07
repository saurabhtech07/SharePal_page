"use client";

import { useState } from "react";
import productsJson from "@/data/products.json";
import Header, { type RentalDates } from "@/components/Header";
import CategoryStrip from "@/components/CategoryStrip";
import Hero from "@/components/Hero";
import SubCategoryRail from "@/components/SubCategoryRail";
import ProductSection from "@/components/ProductSection";
import type { Product } from "@/components/ProductCard";
import FaqSection from "@/components/FaqSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ChatbotFab from "@/components/ChatbotFab";
import DateModal from "@/components/DateModal";
import { ChevronRightIcon } from "@/components/icons";

const products = productsJson as Product[];

/* Original breadcrumb: span-wrapped segments (not li) around a single clamped ol. */
function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb" className="container py-3 md:py-6">
      <ol className="line-clamp-1 flex flex-wrap items-center justify-start gap-1.5 overflow-hidden break-words text-sm text-muted-foreground sm:gap-2.5">
        <span className="inline-flex items-center gap-1.5">
          <a
            href="https://sharepal.in/bangalore"
            className="text-sh7! font-semibold text-neutral-500 transition-colors hover:text-foreground hover:text-neutral-600 md:text-sh5!"
          >
            Bangalore
          </a>
          <li
            role="presentation"
            aria-hidden="true"
            className="[&>svg]:h-3.5 [&>svg]:w-3.5"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </li>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            role="link"
            aria-disabled="true"
            aria-current="page"
            className="text-sh7! font-semibold text-neutral-900 md:text-sh5!"
          >
            Gaming gadgets on rent
          </span>
        </span>
      </ol>
    </nav>
  );
}

export default function Home() {
  const [dates, setDates] = useState<RentalDates>(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeSub, setActiveSub] = useState("All");
  const [doneReset, setDoneReset] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleAdd = (p: Product) => {
    setCartCount((c) => c + 1);
    setToast(`${p.name} added to cart`);
    window.setTimeout(() => setToast(null), 2400);
  };

  return (
    <>
      <Header
        dates={dates}
        onOpenDates={() => setDateOpen(true)}
        cartCount={cartCount}
      />

      <main className="min-h-dvh">
        <div className="min-h-screen w-full">
          {/* ---------- hero area (strip + mobile hero) + catalogue grid ---------- */}
          <div className="container mx-auto px-0 py-24 md:py-20">
            <div className="relative max-md:pb-3">
              <CategoryStrip />
              <Hero variant="mobile" />
            </div>

            <div className="flex flex-row gap-2 px-2 max-md:pt-4 md:grid md:grid-cols-[100px_1fr] md:gap-8 md:px-0 lg:grid-cols-[120px_1fr]">
              <SubCategoryRail active={activeSub} onChange={setActiveSub} />

              <main className="min-w-0 flex-1">
                <Hero variant="desktop" />
                <div className="w-full">
                  <ProductSection
                    products={products}
                    activeSub={activeSub}
                    dates={dates}
                    onAdd={handleAdd}
                  />
                </div>
              </main>
            </div>
          </div>

          <FaqSection />

          <Breadcrumb />

          <ReviewsSection />
        </div>
      </main>

      <Footer />

      <BottomNav
        dates={dates}
        onOpenDates={() => setDateOpen(true)}
        onDone={() => setDoneReset(true)}
        doneReset={doneReset}
      />

      <ChatbotFab />

      {dateOpen && (
        <DateModal
          dates={dates}
          onClose={() => setDateOpen(false)}
          onApply={(d) => {
            setDates(d);
            setDoneReset(false);
          }}
        />
      )}

      {/* toast */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed left-1/2 top-4 z-[70] -translate-x-1/2 transition-all duration-300"
        style={{
          opacity: toast ? 1 : 0,
          transform: `translate(-50%, ${toast ? "0" : "-16px"})`,
        }}
      >
        {toast && (
          <span className="flex items-center gap-2 rounded-full bg-primary-900 px-4 py-2.5 text-sh6 text-white shadow-lg">
            <span className="h-2 w-2 rounded-full bg-[#7EC904]" />
            {toast}
          </span>
        )}
      </div>
    </>
  );
}
