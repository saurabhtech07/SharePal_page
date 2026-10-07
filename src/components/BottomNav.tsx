"use client";

import { useEffect, useState } from "react";
import { whatsappFabHtml } from "@/data/whatsapp-fab";
import type { RentalDates } from "./Header";

const items = [
  {
    label: "Home",
    href: "/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-house h-5 w-5"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  {
    label: "Category",
    href: "#products-section",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-grid h-5 w-5"
      >
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    label: "Search",
    href: "#products-section",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-search h-5 w-5"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    label: "Cart",
    href: "#products-section",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M17 18C17.5304 18 18.0391 17.7893 18.4142 17.4142C18.7893 17.0391 19 16.5304 19 16C19 15.4696 18.7893 14.9609 18.4142 14.5858C18.0391 14.2107 17.5304 14 17 14" />
        <circle cx="9" cy="20" r="1" />
        <path d="M14.5 4H5.70996C5.06496 4 4.47996 4.34 4.12996 4.89L2.00996 12" />
        <path d="M14.5 4C15.61 4 16.61 4.54 17.16 5.41L21.29 12" />
        <path d="M2 12H9" />
        <path d="M4.5 16H14.75" />
        <circle cx="17" cy="20" r="1" />
      </svg>
    ),
  },
];

export default function BottomNav({
  dates,
  onOpenDates,
  onDone,
  doneReset,
}: {
  dates: RentalDates;
  onOpenDates: () => void;
  onDone: () => void;
  doneReset: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fmt = (iso: string) =>
    new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  const stateB = scrolled && !doneReset;
  const visible = scrolled;
  const d = dates ? fmt(dates.delivery) : "--";
  const p = dates ? fmt(dates.pickup) : "--";

  return (
    <>
      {/* ---------- floating date pill ---------- */}
      <div
        className="fixed left-4 right-4 z-[49] mx-auto flex max-w-max justify-center transition-all duration-500 md:bottom-10"
        style={{
          bottom: "calc(5rem + env(safe-area-inset-bottom))",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(100px)",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <button
          type="button"
          tabIndex={0}
          onClick={onOpenDates}
          className="relative rounded-full border-2 border-secondary-500 bg-primary-900"
        >
          <div className="delivery-date flex items-center justify-center gap-2 px-[18px] py-[14px] text-sh5 text-gray-100 md:py-[17px]">
            {stateB ? (
              <>
                <span>Delivery Date:</span>
                <span aria-hidden="true">|</span>
                <span>{d}</span>
                <span aria-hidden="true">|</span>
                <span>Pickup Date:</span>
                <span aria-hidden="true">|</span>
                <span>{p}</span>
                <span aria-hidden="true">|</span>
                <span
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDone();
                  }}
                  className="cursor-pointer text-primary-100 hover:underline"
                >
                  Done
                </span>
              </>
            ) : (
              <>
                <CalendarPillIcon />
                Select rental dates to view prices
              </>
            )}
          </div>
        </button>
      </div>

      {/* ---------- bottom navigation (mobile) ---------- */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-gray-100 px-1.5 pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="absolute inset-x-0 bottom-[-100px] h-[100px] bg-gray-100" />
        <div className="relative mx-auto flex w-full max-w-sm gap-0.5 py-1.5">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center rounded-lg px-1 py-1.5 text-primary-900 transition-colors hover:text-primary-800"
            >
              <div style={{ transform: "none" }}>{item.svg}</div>
              <span className="mt-0.5 text-[10px]" style={{ opacity: 0.5 }}>
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* ---------- hidden whatsapp shortcut (matches original DOM) ---------- */}
      <div
        dangerouslySetInnerHTML={{ __html: whatsappFabHtml }}
        className="contents"
      />
    </>
  );
}

function CalendarPillIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-calendar h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
