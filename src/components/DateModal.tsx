"use client";

import { useEffect, useState } from "react";
import type { RentalDates } from "./Header";

/* ------------------------------------------------------------------ */
/* date helpers                                                        */
/* ------------------------------------------------------------------ */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEKDAY_LABELS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parseIso = (s: string) => new Date(s + "T00:00:00");
const fmt = (d: Date | null) =>
  d ? `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}` : "--";
const dayDiff = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86400000);

/** Sunday-first grid including leading/trailing outside days (like rdp). */
function monthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const last = new Date(year, month + 1, 0);
  const end = new Date(year, month + 1, 6 - last.getDay());
  const days: Date[] = [];
  for (let d = new Date(start); d <= end; d = new Date(d.getTime() + 86400000)) {
    days.push(d);
  }
  return days;
}

const CLOSE_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
const CONTINUE_BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-4xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
const DAY_BASE =
  "rdp-button_reset rdp-button gap-2 whitespace-nowrap rounded-4xl text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-transparent hover:bg-neutral-150 active:opacity-90 py-2 w-full h-full font-medium aria-selected:opacity-100 flex items-center justify-center px-3 rounded-md!";
const NAV_BASE =
  "rdp-button_reset rdp-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-4xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 hover:bg-neutral-150 active:opacity-90 h-7 w-7 md:w-8 md:h-8 border-neutral-200 bg-neutral-100 p-0 opacity-50 hover:opacity-100 absolute";
const TD_BASE =
  "relative flex-1 aspect-square text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-secondary-200 [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md";

function FieldCalendarIcon() {
  return (
    <svg
      className="absolute left-3 top-1/2 size-4 -translate-y-1/2"
      aria-label="No description available"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 3H18V1H16V3H8V1H6V3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.96086 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H12.2547C11.8334 20.396 11.5049 19.7224 11.2899 19H5V8H19V10.0709C19.7061 10.1719 20.3783 10.3783 21 10.6736V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM14.4645 13.4645C12.5118 15.4171 12.5118 18.5829 14.4645 20.5355C16.4171 22.4882 19.5829 22.4882 21.5355 20.5355C23.4882 18.5829 23.4882 15.4171 21.5355 13.4645C19.5829 11.5118 16.4171 11.5118 14.4645 13.4645ZM20.75 17L16.25 19.7V14.3L20.75 17Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg
      className="min-h-5 min-w-5 text-primary-500"
      aria-label="No description available"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChargeIcon() {
  return (
    <div className="flex h-4 w-4 items-center justify-center">
      <svg
        aria-label="No description available"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V10.6736C20.3783 10.3783 19.7061 10.1719 19 10.0709V8H5V19H11.2899C11.5049 19.7224 11.8334 20.396 12.2547 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H6V1H8V3H16V1H18V3ZM18 12C17.0111 12 16.0444 12.2932 15.2222 12.8427C14.3999 13.3921 13.759 14.173 13.3806 15.0866C13.0022 16.0002 12.9031 17.0055 13.0961 17.9754C13.289 18.9454 13.7652 19.8363 14.4645 20.5355C15.1637 21.2348 16.0546 21.711 17.0245 21.9039C17.9945 22.0969 18.9998 21.9978 19.9134 21.6194C20.827 21.241 21.6079 20.6001 22.1573 19.7778C22.7068 18.9556 23 17.9889 23 17C23 15.6739 22.4732 14.4021 21.5355 13.4645C20.5979 12.5268 19.3261 12 18 12ZM17.5 17V13.5H18.5V16.7929L20.3536 18.6464L19.6464 19.3536L17.6464 17.3536L17.5 17.2071V17Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function SavingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
      <path
        fill="#D4DF5B"
        fillRule="evenodd"
        d="m29.163 14.5 2.692-4.652-4.652-2.69V1.798h-5.36l-2.688-4.652-4.656 2.69-4.655-2.692-2.69 4.654h-5.36v5.36l-4.653 2.689L-.166 14.5l-2.694 4.655 4.652 2.688v5.36h5.362l2.69 4.653 4.652-2.692 4.657 2.692 2.687-4.653h5.36v-5.36l4.654-2.69zM21.46 34.661a2.125 2.125 0 0 1-2.903.776l-4.059-2.346-4.054 2.346c-.327.189-.695.286-1.065.286a2.15 2.15 0 0 1-1.84-1.062l-2.346-4.059H.517a2.125 2.125 0 0 1-2.125-2.125v-4.673l-4.059-2.346a2.133 2.133 0 0 1-.773-2.904l2.346-4.055-2.346-4.055a2.125 2.125 0 0 1 .775-2.904l4.059-2.346V.522A2.125 2.125 0 0 1 .519-1.603h4.673l2.346-4.06a2.125 2.125 0 0 1 2.903-.777l4.058 2.348 4.06-2.346a2.124 2.124 0 0 1 2.902.778l2.344 4.057h4.673A2.125 2.125 0 0 1 30.603.522v4.675l4.058 2.346a2.125 2.125 0 0 1 .776 2.902L33.091 14.5l2.344 4.055a2.124 2.124 0 0 1-.776 2.904L30.6 23.805v4.673a2.125 2.125 0 0 1-2.125 2.125h-4.672z"
        clipRule="evenodd"
      />
      <path
        fill="#D4DF5B"
        d="M8.126 5.998a3.189 3.189 0 1 1-.002 6.377 3.189 3.189 0 0 1 .002-6.377M9.822 24.228l-3.4-2.548 12.75-17 3.4 2.548zM20.874 23a3.19 3.19 0 1 1 .003-6.378A3.19 3.19 0 0 1 20.874 23"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* month view                                                          */
/* ------------------------------------------------------------------ */

function MonthView({
  year,
  month,
  captionId,
  captionPosition,
  today,
  delivery,
  pickup,
  onPick,
  onPrev,
  onNext,
  prevDisabled,
}: {
  year: number;
  month: number;
  captionId: string;
  captionPosition: "rdp-caption_start" | "rdp-caption_end";
  today: Date;
  delivery: Date | null;
  pickup: Date | null;
  onPick: (d: Date) => void;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
}) {
  const days = monthGrid(year, month);
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const inRange = (d: Date) =>
    !!delivery && !!pickup && d.getTime() > delivery.getTime() && d.getTime() < pickup.getTime();
  const isEndpoint = (d: Date) =>
    (!!delivery && d.getTime() === delivery.getTime()) ||
    (!!pickup && d.getTime() === pickup.getTime());

  return (
    <div className={`space-y-4 flex-[1] ${captionPosition}`}>
      <div className="relative flex items-center justify-center pt-1">
        <div className="text-sm font-medium" aria-live="polite" role="presentation" id={captionId}>
          {MONTHS[month]} {year}
        </div>
        <div className="flex items-center space-x-1">
          <button
            name="previous-month"
            aria-label="Go to previous month"
            type="button"
            disabled={prevDisabled}
            onClick={onPrev}
            className={`${NAV_BASE} left-1`}
          >
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
              className="lucide lucide-chevron-left h-4 w-4 rdp-nav_icon"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            name="next-month"
            aria-label="Go to next month"
            type="button"
            onClick={onNext}
            className={`${NAV_BASE} right-1`}
          >
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
              className="lucide lucide-chevron-right h-4 w-4 rdp-nav_icon"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <table className="w-full border-collapse" role="grid" aria-labelledby={captionId}>
        <thead className="rdp-head">
          <tr className="flex">
            {WEEKDAYS.map((wd, i) => (
              <th
                key={wd}
                scope="col"
                className="text-muted-foreground flex-1 text-center font-normal text-[0.8rem]"
                aria-label={WEEKDAY_LABELS[i]}
              >
                {wd}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi} className="mt-2 flex w-full">
              {week.map((d) => {
                const outside = d.getMonth() !== month;
                const disabled = d.getTime() < today.getTime();
                const selected = isEndpoint(d);
                const cls = [
                  DAY_BASE,
                  outside ? "opacity-50 day-outside text-muted-foreground" : "",
                  selected ? "day-range-start day-range-end" : "",
                  inRange(d) ? "bg-secondary-50" : "",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <td key={d.toISOString()} className={TD_BASE} role="presentation">
                    <button
                      name="day"
                      type="button"
                      role="gridcell"
                      tabIndex={selected ? 0 : -1}
                      aria-selected={selected || undefined}
                      disabled={disabled}
                      onClick={() => onPick(d)}
                      className={cls}
                    >
                      {d.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* modal                                                               */
/* ------------------------------------------------------------------ */

export default function DateModal({
  dates,
  onClose,
  onApply,
}: {
  dates: RentalDates;
  onClose: () => void;
  onApply: (d: RentalDates) => void;
}) {
  const today = startOfDay(new Date());
  const init = dates ? parseIso(dates.delivery) : null;
  const [delivery, setDelivery] = useState<Date | null>(init);
  const [pickup, setPickup] = useState<Date | null>(dates ? parseIso(dates.pickup) : null);
  const [activeField, setActiveField] = useState<1 | 2>(1);
  const [baseMonth, setBaseMonth] = useState(() =>
    init ? new Date(init.getFullYear(), init.getMonth(), 1) : new Date(today.getFullYear(), today.getMonth(), 1),
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pick = (d: Date) => {
    if (activeField === 1 || !delivery || d.getTime() < delivery.getTime()) {
      setDelivery(d);
      setPickup(null);
      setActiveField(2);
    } else {
      setPickup(d);
      setActiveField(1);
    }
  };

  const canContinue = !!delivery && !!pickup;
  const rentalDays = delivery && pickup ? dayDiff(delivery, pickup) : 0;
  const chargeableDays = Math.max(0, rentalDays - 1);

  const apply = () => {
    if (!delivery || !pickup) return;
    onApply({ delivery: iso(delivery), pickup: iso(pickup) });
    onClose();
  };

  const y = baseMonth.getFullYear();
  const m = baseMonth.getMonth();
  const nextMonth = new Date(y, m + 1, 1);
  const prevDisabled =
    baseMonth.getFullYear() === today.getFullYear() && baseMonth.getMonth() === today.getMonth();

  const shift = (n: number) => setBaseMonth(new Date(y, m + n, 1));

  const field = (n: 1 | 2) => {
    const isDelivery = n === 1;
    const value = isDelivery ? delivery : pickup;
    return (
      <div className="space-y-1.5 md:space-y-2">
        <label
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={isDelivery ? "delivery-date" : "pickup-date"}
        >
          {isDelivery ? "Delivery Date" : "Pickup Date"} <span className="text-destructive">*</span>
        </label>
        <div>
          <button
            id={isDelivery ? "delivery-date" : "pickup-date"}
            className="w-full disabled:opacity-50"
            type="button"
            onClick={() => setActiveField(n)}
          >
            <div className="relative">
              <div className="flex h-11 w-full items-center justify-start rounded-2xl border-2 border-neutral-200 bg-gray-100 pl-8">
                <span className={`text-b4 ${value ? "text-neutral-900" : "text-neutral-300"}`}>
                  {value ? fmt(value) : isDelivery ? "Select delivery date" : "Select pickup date"}
                </span>
              </div>
              <FieldCalendarIcon />
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-primary-900/30 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="select-dates-title"
        data-state="open"
        tabIndex={-1}
        style={{ pointerEvents: "auto" }}
        className="fixed left-[50%] top-[50%] z-50 grid max-w-lg translate-x-[-50%] translate-y-[-50%] border shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-svh w-[95%] gap-0 overflow-auto rounded-radius! bg-gray-150 p-0 sm:max-w-7xl"
      >
        <div className="flex flex-col space-y-1.5 p-6 pb-0 text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h2 id="select-dates-title" className="tracking-tight text-2xl font-semibold">
              Select your Dates
            </h2>
            <button
              type="button"
              onClick={onClose}
              className={`${CLOSE_BASE} active:opacity-90 bg-transparent p-2 h-8 w-8 rounded-full hover:bg-muted`}
            >
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
                className="lucide lucide-x h-6 w-6"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-6 p-6 pt-4 lg:flex-row">
          <div className="flex-1 space-y-5">
            <div className="grid gap-3 md:grid-cols-2">
              {field(1)}
              {field(2)}
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-primary-100 px-3 py-2 md:rounded-2xl">
              <NoteIcon />
              <p className="text-b6 text-primary-700">
                <span className="font-bold">Same-day delivery</span> between{" "}
                <span className="font-bold">5PM and 11PM</span> For future dates, you can select a
                specific time slot available at checkout. We pickup between{" "}
                <span className="font-bold">9AM to 1PM</span>.
              </p>
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <div className="flex-1 text-sm font-medium leading-[20px] text-neutral-900">
                Your Rental Period:
              </div>
              <div className="flex w-full items-end justify-start gap-3 rounded-2xl border-2 border-neutral-200 bg-gray-100 px-3 py-2.5">
                <div className="flex items-end gap-1">
                  <div className="text-d5 text-neutral-800">
                    {delivery && pickup ? String(rentalDays).padStart(2, "0") : "00"}
                  </div>
                  <div className="flex items-center justify-center gap-1 pb-0.5 pt-0.5">
                    <div className="text-sm font-medium leading-[20px] text-neutral-500">Day</div>
                  </div>
                </div>
                <div
                  data-orientation="vertical"
                  role="none"
                  className="bg-border h-full w-[2px] shrink-0 rounded-full"
                />
                <div className="flex flex-1 flex-col items-start justify-center gap-1">
                  <div className="w-full text-b6 text-neutral-900">Chargeable Period:</div>
                  <div className="flex w-full items-center gap-2">
                    <ChargeIcon />
                    <div className="flex-1 text-sm font-medium leading-[20px] text-neutral-300">
                      {delivery && pickup ? `${chargeableDays} Day${chargeableDays === 1 ? "" : "s"}` : "--"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl bg-primary-900 pb-5 pt-0 text-white">
              <div className="mb-4 flex items-center gap-3">
                <div>
                  <SavingsIcon />
                </div>
                <span className="bg-zero-policy-title-card-text flex h-max w-full items-center gap-1 bg-clip-text text-pretty font-bold italic text-[#00000000] md:text-2xl">
                  Save more with us!
                </span>
              </div>
              <div className="space-y-3 px-5 text-sm">
                <p className="flex items-start justify-start gap-2 font-semibold md:gap-4 md:text-xs">
                  Longer rental periods mean bigger savings—enjoy discounts of up to 12%. We
                  don’t charge you for deliver and pickup days!
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                disabled={!canContinue}
                onClick={apply}
                className={`${CONTINUE_BASE} active:opacity-90 bg-primary-500 text-gray-100 hover:bg-primary-400 disabled:bg-neutral-200 disabled:text-neutral-500 h-11 px-6 w-full py-6 text-lg`}
              >
                Continue
              </button>
            </div>
          </div>

          <div className="h-max flex-[1.5] rounded-3xl bg-card p-3">
            <div className="rdp rdp-multiple_months p-3">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <MonthView
                  year={y}
                  month={m}
                  captionId="react-day-picker-1"
                  captionPosition="rdp-caption_start"
                  today={today}
                  delivery={delivery}
                  pickup={pickup}
                  onPick={pick}
                  onPrev={() => shift(-1)}
                  onNext={() => shift(1)}
                  prevDisabled={prevDisabled}
                />
                <MonthView
                  year={nextMonth.getFullYear()}
                  month={nextMonth.getMonth()}
                  captionId="react-day-picker-2"
                  captionPosition="rdp-caption_end"
                  today={today}
                  delivery={delivery}
                  pickup={pickup}
                  onPick={pick}
                  onPrev={() => shift(-1)}
                  onNext={() => shift(1)}
                  prevDisabled={prevDisabled}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
