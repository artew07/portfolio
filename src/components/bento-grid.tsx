const bentoItems = [
  {
    label: "Motion",
    className: "sm:col-span-2 h-[220px]",
  },
  {
    label: "Interface",
    className: "h-[160px]",
  },
  {
    label: "Prototype",
    className: "h-[160px]",
  },
  {
    label: "System",
    className: "h-[160px]",
  },
  {
    label: "Detail",
    className: "h-[160px]",
  },
];

export function BentoGrid() {
  return (
    <section aria-label="Portfolio media highlights" className="grid gap-3 sm:grid-cols-2">
      {bentoItems.map((item) => (
        <div
          className={`flex items-end rounded-md border border-[#f0f1f4] bg-[#f7f7f8] p-4 ${item.className}`}
          key={item.label}
        >
          <span className="text-[13px] font-medium leading-4 text-[#9195a1]">
            {item.label}
          </span>
        </div>
      ))}
    </section>
  );
}
