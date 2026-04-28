type Props = {
  postDates: string[];
};

const WEEKS = 53;
const DAYS = 7;
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function startOfDay(d: Date) {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}

function addDays(d: Date, n: number) {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

function isoKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function levelClasses(count: number) {
  if (count === 0) {
    return "bg-[hsl(var(--muted))] ring-1 ring-inset ring-[hsl(var(--rule)/0.5)]";
  }
  if (count === 1) return "bg-[hsl(var(--accent-color)/0.45)]";
  if (count === 2) return "bg-[hsl(var(--accent-color)/0.7)]";
  return "bg-[hsl(var(--accent-color))]";
}

const ContributionGraph = ({ postDates }: Props) => {
  const today = startOfDay(new Date());
  const dayOfWeek = today.getDay();
  const start = addDays(today, -(WEEKS - 1) * 7 - dayOfWeek);

  const counts = new Map<string, number>();
  for (const iso of postDates) {
    const key = isoKey(startOfDay(new Date(iso)));
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const cells: { date: Date; count: number; future: boolean }[] = [];
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < DAYS; d++) {
      const date = addDays(start, w * 7 + d);
      const future = date > today;
      const count = future ? 0 : counts.get(isoKey(date)) ?? 0;
      cells.push({ date, count, future });
    }
  }

  const monthLabels: { col: number; label: string }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < WEEKS; w++) {
    const firstCellDate = cells[w * 7]!.date;
    const month = firstCellDate.getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ col: w, label: MONTH_NAMES[month]! });
      lastMonth = month;
    }
  }

  const totalPosts = postDates.length;

  return (
    <section className="mb-16">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="small-caps text-h-section text-muted-foreground">
          Writing activity
        </h2>
        <span className="text-sm text-muted-foreground">
          {totalPosts} {totalPosts === 1 ? "post" : "posts"} in the last year
        </span>
      </div>

      <div className="overflow-x-auto rounded-md border border-rule bg-card p-4">
        <div className="inline-block">
          <div
            className="grid text-[10px] text-muted-foreground"
            style={{
              gridTemplateColumns: `repeat(${WEEKS}, 12px)`,
              columnGap: "3px",
              marginBottom: "4px",
            }}
          >
            {Array.from({ length: WEEKS }).map((_, i) => {
              const label = monthLabels.find((m) => m.col === i);
              return (
                <div key={i} style={{ height: "12px" }}>
                  {label ? <span className="whitespace-nowrap">{label.label}</span> : null}
                </div>
              );
            })}
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${WEEKS}, 12px)`,
              gridTemplateRows: `repeat(${DAYS}, 12px)`,
              gridAutoFlow: "column",
              gap: "3px",
            }}
          >
            {cells.map((cell, i) => {
              if (cell.future) {
                return <div key={i} aria-hidden className="h-3 w-3" />;
              }
              const dateLabel = cell.date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const title =
                cell.count === 0
                  ? `No posts on ${dateLabel}`
                  : `${cell.count} post${cell.count === 1 ? "" : "s"} on ${dateLabel}`;
              return (
                <div
                  key={i}
                  title={title}
                  className={`h-3 w-3 rounded-[2px] ${levelClasses(cell.count)}`}
                />
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground">
            <span>less</span>
            <div className={`h-3 w-3 rounded-[2px] ${levelClasses(0)}`} />
            <div className={`h-3 w-3 rounded-[2px] ${levelClasses(1)}`} />
            <div className={`h-3 w-3 rounded-[2px] ${levelClasses(2)}`} />
            <div className={`h-3 w-3 rounded-[2px] ${levelClasses(3)}`} />
            <span>more</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributionGraph;
