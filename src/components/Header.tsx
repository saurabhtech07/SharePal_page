"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarIcon,
  CartIcon,
  ChevronDownIcon,
  MapPinIcon,
  SearchIcon,
  SharePalLogo,
  UserIcon,
} from "./icons";

export type RentalDates = { delivery: string; pickup: string } | null;

type Props = {
  dates: RentalDates;
  onOpenDates: () => void;
  cartCount: number;
};

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

export default function Header({ dates, onOpenDates, cartCount }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-max w-full flex-col items-center justify-center gap-1 overflow-hidden bg-[#4C187C] pb-3 pt-[env(safe-area-inset-top)] transition-all duration-500 md:pb-4 lg:flex-row">
      {/* ---------- desktop row (lg+) ---------- */}
      <div className="desktop container hidden w-full items-end justify-between gap-1 transition-all lg:flex">
        <div className="flex items-end justify-start gap-28">
          <Link href="/bangalore" className="left h-full flex-[1]">
            <div className="logo flex h-[68px] w-40 flex-col items-center justify-end gap-1 rounded-bl-2xl rounded-br-2xl bg-primary-500 p-3 pt-[18px] shadow-sm transition-transform duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-center">
                <SharePalLogo className="w-[86px]" />
              </div>
            </div>
          </Link>
        </div>

        {/* middle pill : city / dates / select */}
        <div className="middle relative flex items-center justify-center gap-2 rounded-full border-2 border-category-purple bg-gray-100">
          <button
            type="button"
            className="city flex items-center justify-center gap-1 rounded-l-full bg-neutral-200 p-1.5 px-[10px] py-[6px] text-sm font-semibold text-primary-900 transition-colors hover:bg-neutral-250 max-lg:translate-x-5 max-lg:rounded-full max-lg:text-xs"
          >
            <MapPinIcon className="h-5 w-5 text-primary-500" />
            <p className="min-w-16 text-bt3">Bangalore</p>
            <ChevronDownIcon className="h-4 w-4" />
          </button>

          <div
            role="button"
            aria-label="Edit Dates"
            tabIndex={0}
            onClick={onOpenDates}
            onKeyDown={(e) => e.key === "Enter" && onOpenDates()}
            className="flex w-max cursor-pointer items-center justify-center gap-2 bg-gray-100 text-neutral-700"
          >
            <div className="delivery-date flex items-center justify-center gap-2 text-sh5">
              <CalendarIcon className="h-4 w-4" />
              {dates ? fmt(dates.delivery) : "Delivery Date"}
            </div>
            <span className="h-5 w-[2px] bg-neutral-200" />
            <div className="pickup-date flex items-center justify-center gap-2 text-sh5">
              <CalendarIcon className="h-4 w-4" />
              {dates ? fmt(dates.pickup) : "Pickup Date"}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDates}
            className="inline-flex h-full items-center justify-center gap-1 whitespace-nowrap rounded-4xl bg-primary-900 px-3 py-[8px] text-sm font-medium text-white transition-colors hover:bg-primary-950 active:opacity-90"
          >
            <CalendarIcon className="h-4 w-4" />
            <p className="pr-1 text-bt3 font-semibold leading-5 tracking-wide">Select</p>
          </button>
        </div>

        {/* right : search / cart / profile */}
        <div className="right flex items-end justify-end gap-3 text-gray-100 transition-colors duration-300">
          <button
            type="button"
            aria-label="Search"
            className="search relative h-11 w-11 rounded-4xl p-2 text-gray-100 transition-colors hover:bg-neutral-150 hover:text-neutral-900"
          >
            <SearchIcon className="h-full w-full" />
          </button>
          <button
            type="button"
            aria-label="Cart"
            className="cart relative h-11 w-11 rounded-4xl p-2 text-gray-100 transition-colors hover:bg-neutral-150 hover:text-neutral-900"
          >
            <CartIcon className="h-full w-full" />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary-500 px-1 text-[10px] font-bold text-primary-900">
                {cartCount}
              </span>
            )}
          </button>
          <div className="profile flex cursor-pointer items-center justify-end gap-3">
            <button
              type="button"
              aria-label="Profile"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-category-purple bg-gray-100 p-0.5 text-neutral-900 transition-colors hover:bg-gray-200"
            >
              <UserIcon className="h-5 w-5" />
            </button>
            <span className="text-bt2! font-medium text-gray-100">Hi, Login</span>
          </div>
        </div>
      </div>

      {/* ---------- mobile row (<lg) ---------- */}
      <div className="mobile container flex w-full flex-col items-center justify-center gap-3 lg:hidden">
        <div className="flex h-full w-full items-center justify-between gap-1">
          <Link
            href="/bangalore"
            className="logo flex h-10 flex-col items-center justify-end gap-1 rounded-bl-xl rounded-br-xl bg-primary-500 px-3 pb-1 pt-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="flex w-full max-w-28 items-center justify-center">
              <SharePalLogo className="w-full" />
            </div>
          </Link>
          <div className="flex w-full items-center justify-end gap-1.5 pt-1.5 text-gray-100 md:gap-4">
            <button
              type="button"
              onClick={onOpenDates}
              className="city flex items-center justify-center gap-1 rounded-full border border-category-purple bg-category-purple px-2 py-0.5 text-xs font-medium text-gray-100 shadow-md transition-colors hover:bg-[#7523c4]"
            >
              <MapPinIcon className="h-3.5 w-3.5" />
              <p className="min-w-4 text-bt4">Bangalore</p>
              <ChevronDownIcon className="h-3 w-3" />
            </button>
            <div className="profile flex items-center justify-center gap-1 p-0 sm:flex">
              <button
                type="button"
                aria-label="Profile"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                className="flex h-8 min-h-8 w-8 min-w-8 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-200 bg-neutral-900 p-0.5 text-gray-100 transition-colors hover:bg-neutral-950"
              >
                <UserIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* mobile date bar */}
        <div className="flex h-[34px] w-full items-center justify-between gap-1 rounded-full border-2 border-category-purple bg-gray-100">
          <div
            role="button"
            aria-label="Edit Dates"
            tabIndex={0}
            onClick={onOpenDates}
            onKeyDown={(e) => e.key === "Enter" && onOpenDates()}
            className="flex w-max cursor-pointer items-center justify-center gap-2 px-2 text-sm"
          >
            <div className="delivery-date flex items-center justify-center gap-1 px-0 text-xs font-semibold lg:text-sm">
              <CalendarIcon className="h-4 w-4 text-primary-500" />
              <span className="text-sh5 text-neutral-700">
                {dates ? `${fmt(dates.delivery)} → ${fmt(dates.pickup)}` : "Select Rental Dates"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenDates}
            className="add-date flex h-full items-center justify-center gap-1 whitespace-nowrap rounded-4xl bg-primary-900 px-2 py-[6px] pr-3 text-sm font-medium text-white transition-colors hover:bg-primary-950 active:opacity-90 max-lg:text-xs"
          >
            <CalendarIcon className="h-4 w-4" />
            <p className="pr-1 font-semibold leading-5 tracking-wide">Select</p>
          </button>
        </div>
      </div>
    </header>
  );
}
