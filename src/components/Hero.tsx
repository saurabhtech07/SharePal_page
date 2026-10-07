import svgs from "@/data/hero-svgs.json";

/**
 * The original renders the hero TWICE: a mobile variant inside the strip
 * wrapper (`block px-2 md:mb-4 md:hidden`) and a desktop variant as the first
 * child of the content column (`hidden md:block`). The card itself is shared.
 */
function HeroCard() {
  return (
    <div
      className="relative flex h-full min-h-[150px] w-full items-center justify-center overflow-hidden rounded-xl max-md:shadow-lg md:min-h-[228px] lg:rounded-xl"
      style={{
        background: "linear-gradient(360deg, rgb(138, 43, 226) 0%, rgb(76, 24, 124) 100%)",
      }}
    >
      {/* left artwork (desktop only) */}
      <div className="absolute hidden md:flex overflow-hidden -left-0 -bottom-9 sm:-bottom-10 md:-bottom-12 md:-left-0 z-0">
        <div
          className="w-48 object-contain sm:w-60 md:h-auto md:w-44 xl:w-[250px]"
          style={{ width: 250, height: 250, maxWidth: "100%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.sharepal.in/super-categories/gaming-left.webp"
            alt="sp-image"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* right artwork */}
      <div className="absolute overflow-hidden -right-0 -bottom-11 sm:-bottom-10 md:-bottom-12 md:-right-0 z-0">
        <div
          className="w-48 object-contain sm:w-60 md:h-auto md:w-44 xl:w-[250px]"
          style={{ width: 250, height: 250, maxWidth: "100%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.sharepal.in/super-categories/gaming-right.webp"
            alt="sp-image"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* copy */}
      <div className="relative z-10 flex w-full flex-col items-start justify-center gap-1.5 px-4 text-center text-white md:items-center md:gap-3">
        <h1 className="font-ubuntu text-h5 font-bold capitalize leading-tight -tracking-tight drop-shadow-lg md:text-d5">
          Gaming Consoles
        </h1>

        <div className="flex flex-col items-start md:items-center md:gap-1">
          <h2 className="w-[75%] text-o4 font-bold opacity-100 drop-shadow-md max-md:text-start sm:text-b4 md:max-w-[70%] lg:text-sh1 xl:text-h6">
            Rent the latest gaming gadgets from{" "}
            <span
              className="mx-1 inline-flex w-14 items-center justify-center align-middle md:w-20"
              dangerouslySetInnerHTML={{ __html: svgs.ps5 + svgs.ps4 }}
            />{" "}
            PS5, Xbox, Oculus VR, Racing Wheel on rent.
          </h2>
        </div>

        {/* brand logos */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-5">
          <div className="flex w-full flex-wrap items-center justify-center gap-0 md:mt-3 md:max-w-lg md:gap-2">
            <div className="h-auto w-12 object-contain md:w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.sharepal.in/super-categories-brand-logos/gaming/XBOX.svg"
                alt="sp-image"
                width={200}
                height={100}
                loading="lazy"
                className="h-auto w-full object-contain"
              />
            </div>
            <span className="h-4 w-[2px] rounded-full opacity-50 md:h-6 md:w-[3px] md:opacity-70 bg-category-purple" />
            <div className="h-auto w-12 object-contain md:w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.sharepal.in/super-categories-brand-logos/gaming/PS5.svg"
                alt="sp-image"
                width={200}
                height={100}
                loading="lazy"
                className="h-auto w-full object-contain"
              />
            </div>
            <span className="h-4 w-[2px] rounded-full opacity-50 md:h-6 md:w-[3px] md:opacity-70 bg-category-purple" />
            <div className="h-auto w-12 object-contain md:w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.sharepal.in/super-categories-brand-logos/gaming/Sony.svg"
                alt="sp-image"
                width={200}
                height={100}
                loading="lazy"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ variant }: { variant: "mobile" | "desktop" }) {
  if (variant === "mobile") {
    return (
      <div className="block px-2 md:mb-4 md:hidden">
        <HeroCard />
      </div>
    );
  }
  return (
    <div className="hidden md:block">
      <HeroCard />
    </div>
  );
}
