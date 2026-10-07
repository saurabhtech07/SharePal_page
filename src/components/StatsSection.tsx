import { stats } from "@/data/content";

export default function StatsSection() {
  return (
    <section className="container">
      <div className="grid w-full grid-cols-3 justify-between gap-3 border-y-2 border-neutral-150 px-0 py-4 md:gap-6 md:py-6">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <h3
              className="bg-review-gradient bg-clip-text py-0 text-center font-ubuntu text-2xl font-bold text-transparent md:py-3 lg:text-6xl"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {stat.value}
            </h3>
            <p className="text-center text-xs capitalize text-gray-800 sm:text-xl">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
