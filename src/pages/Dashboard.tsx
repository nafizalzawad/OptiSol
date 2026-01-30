import SectionReveal from "@/components/site/SectionReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dashboardImage from "@/assets/optisol-dashboard.jpg";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, startOfDay, addDays, addMonths, startOfMonth, endOfMonth, isBefore, isAfter } from "date-fns";
import { CalendarIcon, Droplets, Thermometer, Zap } from "lucide-react";

type TimeWindow = "1d" | "1w" | "1m" | "3m" | "6m" | "12m";
type SeasonKey = "pre" | "monsoon" | "post";

type SeasonSpec = {
  key: SeasonKey;
  label: string;
  months: number[]; // 0-based
  ambientHigh: number;
  ambientLow: number;
  panelHigh: number;
  panelLow: number;
};

const YEAR = 2025;

const seasons: SeasonSpec[] = [
  {
    key: "pre",
    label: "Pre Monsoon",
    // Bangladesh context: roughly Mar–May
    months: [2, 3, 4],
    ambientHigh: 42,
    ambientLow: 29,
    panelHigh: 89,
    panelLow: 44,
  },
  {
    key: "monsoon",
    label: "Monsoon",
    // roughly Jun–Sep
    months: [5, 6, 7, 8],
    ambientHigh: 40,
    ambientLow: 28,
    panelHigh: 82,
    panelLow: 49,
  },
  {
    key: "post",
    label: "Post Monsoon",
    // roughly Oct–Feb (we keep Oct–Dec + Jan–Feb inside the year)
    months: [9, 10, 11, 0, 1],
    ambientHigh: 35,
    ambientLow: 18,
    panelHigh: 76,
    panelLow: 39,
  },
];

function clampTo2025(d: Date) {
  const min = new Date(YEAR, 0, 1);
  const max = new Date(YEAR, 11, 31);
  if (isBefore(d, min)) return min;
  if (isAfter(d, max)) return max;
  return d;
}

function getSeasonForDate(d: Date): SeasonSpec {
  const m = d.getMonth();
  return seasons.find((s) => s.months.includes(m)) ?? seasons[2];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Creates a smooth, deterministic oscillation between low/high across the window.
function valueInRange(low: number, high: number, i: number, n: number) {
  const t = n <= 1 ? 0.5 : i / (n - 1);
  // bias toward realistic midday peak
  const wave = Math.sin(t * Math.PI);
  return Math.round(lerp(low, high, wave) * 10) / 10;
}

type ChartPoint = {
  t: string;
  ambient: number;
  panel: number;
  delta: number;
  season: string;
};

function buildSeries(anchor: Date, window: TimeWindow): { series: ChartPoint[]; rangeLabel: string; seasonMix: Record<SeasonKey, number> } {
  const safeAnchor = clampTo2025(startOfDay(anchor));
  let from = safeAnchor;
  let to = safeAnchor;
  let points = 7;
  let label = "";

  if (window === "1d") {
    // Solar production demo window: 10:00–16:00
    points = 7;
    from = safeAnchor;
    to = safeAnchor;
    label = `${format(from, "MMM d, yyyy")} (10:00-16:00)`;
  } else if (window === "1w") {
    points = 7;
    from = safeAnchor;
    to = clampTo2025(addDays(from, 6));
    label = `${format(from, "MMM d")}-${format(to, "MMM d, yyyy")}`;
  } else if (window === "1m") {
    const mStart = startOfMonth(safeAnchor);
    const mEnd = endOfMonth(safeAnchor);
    from = clampTo2025(mStart);
    to = clampTo2025(mEnd);
    points = 6;
    label = `${format(from, "MMM yyyy")}`;
  } else if (window === "3m") {
    from = clampTo2025(startOfMonth(safeAnchor));
    to = clampTo2025(endOfMonth(addMonths(from, 2)));
    points = 3;
    label = `${format(from, "MMM")}-${format(to, "MMM yyyy")}`;
  } else if (window === "6m") {
    from = clampTo2025(startOfMonth(safeAnchor));
    to = clampTo2025(endOfMonth(addMonths(from, 5)));
    points = 6;
    label = `${format(from, "MMM")}-${format(to, "MMM yyyy")}`;
  } else {
    // 12m: fixed Jan–Dec 2025
    from = new Date(YEAR, 0, 1);
    to = new Date(YEAR, 11, 31);
    points = 12;
    label = `Jan-Dec ${YEAR}`;
  }

  const seasonMix: Record<SeasonKey, number> = { pre: 0, monsoon: 0, post: 0 };

  const series: ChartPoint[] = Array.from({ length: points }).map((_, i) => {
    let d: Date;
    let tick: string;

    if (window === "1d") {
      d = from;
      const hour = 10 + i;
      tick = `${String(hour).padStart(2, "0")}:00`;
    } else if (window === "1w") {
      d = clampTo2025(addDays(from, i));
      tick = format(d, "EEE");
    } else if (window === "1m") {
      const day = Math.min(1 + i * 5, 28);
      d = clampTo2025(new Date(from.getFullYear(), from.getMonth(), day));
      tick = format(d, "MMM d");
    } else if (window === "3m" || window === "6m" || window === "12m") {
      d = window === "12m" ? new Date(YEAR, i, 1) : clampTo2025(addMonths(from, i));
      tick = format(d, "MMM");
    } else {
      d = from;
      tick = format(d, "MMM d");
    }

    const s = getSeasonForDate(d);
    seasonMix[s.key] += 1;

    // Ensure logical relationship: panel temperature >= ambient temperature.
    const ambient = valueInRange(s.ambientLow, s.ambientHigh, i, points);
    const panel = Math.max(
      ambient,
      valueInRange(s.panelLow, s.panelHigh, i, points),
    );
    const delta = Math.round((panel - ambient) * 10) / 10;

    return {
      t: tick,
      ambient,
      panel,
      delta,
      season: s.label,
    };
  });

  return { series, rangeLabel: label, seasonMix };
}

function percent(x: number) {
  return `${Math.round(x * 10) / 10}%`;
}

export default function Dashboard() {
  const [window, setWindow] = React.useState<TimeWindow>("12m");
  const [anchor, setAnchor] = React.useState<Date>(new Date(YEAR, 0, 1));

  const { series, rangeLabel, seasonMix } = React.useMemo(() => buildSeries(anchor, window), [anchor, window]);

  const maxDelta = React.useMemo(() => Math.max(...series.map((x) => x.delta)), [series]);
  const avgDelta = React.useMemo(
    () => series.reduce((sum, x) => sum + x.delta, 0) / Math.max(series.length, 1),
    [series],
  );
  const peakPanel = React.useMemo(() => Math.max(...series.map((x) => x.panel)), [series]);
  const peakAmbient = React.useMemo(() => Math.max(...series.map((x) => x.ambient)), [series]);
  const demoGain = React.useMemo(() => {
    // simple demo heuristic: bigger temp delta => more potential gain from cooling
    const g = 5 + Math.min(5, Math.max(0, (avgDelta - 25) / 10) * 2);
    return Math.max(5, Math.min(10, Math.round(g * 10) / 10));
  }, [avgDelta]);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-14">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">DASHBOARD</p>
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight">Temperature insights (demo) — {rangeLabel}</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Jan-Dec {YEAR} demo data using your seasonal ranges. Panel temperature is always kept logically above ambient.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <ToggleGroup
                type="single"
                value={window}
                onValueChange={(v) => {
                  if (!v) return;
                  setWindow(v as TimeWindow);
                  if (v === "12m") setAnchor(new Date(YEAR, 0, 1));
                }}
                className="rounded-xl border bg-background/60 p-1 shadow-soft"
              >
                <ToggleGroupItem value="1d" aria-label="1 day">
                  1D
                </ToggleGroupItem>
                <ToggleGroupItem value="1w" aria-label="1 week">
                  1W
                </ToggleGroupItem>
                <ToggleGroupItem value="1m" aria-label="1 month">
                  1M
                </ToggleGroupItem>
                <ToggleGroupItem value="3m" aria-label="3 months">
                  3M
                </ToggleGroupItem>
                <ToggleGroupItem value="6m" aria-label="6 months">
                  6M
                </ToggleGroupItem>
                <ToggleGroupItem value="12m" aria-label="12 months">
                  12M
                </ToggleGroupItem>
              </ToggleGroup>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    disabled={window === "12m"}
                    aria-label="Pick anchor date"
                  >
                    <CalendarIcon className="h-4 w-4" />
                    {window === "12m" ? `2025` : format(anchor, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={anchor}
                    onSelect={(d) => d && setAnchor(clampTo2025(d))}
                    initialFocus
                    // important inside popovers
                    className="p-3 pointer-events-auto"
                    disabled={(d) => d < new Date(YEAR, 0, 1) || d > new Date(YEAR, 11, 31)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="pb-16">
        <SectionReveal>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="grid gap-3 sm:grid-cols-2">
                <Card className="bg-background/60 shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Peak panel temp</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-3xl font-semibold tracking-tight">{peakPanel}°C</p>
                      <div className="rounded-xl border bg-background/50 p-2">
                        <Thermometer className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Compared to peak ambient {peakAmbient}°C.</p>
                  </CardContent>
                </Card>

                <Card className="bg-background/60 shadow-soft">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold">Temp delta (panel − ambient)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-3xl font-semibold tracking-tight">{Math.round(avgDelta)}°C</p>
                      <div className="rounded-xl border bg-background/50 p-2">
                        <Zap className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Max observed delta in range: {maxDelta}°C.</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6 overflow-hidden bg-background/60 shadow-soft">
                <CardHeader className="flex-row items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">Ambient vs Panel Temperature</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">Hover points to see values + season label.</p>
                  </div>
                  <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: "hsl(var(--brand-yellow))" }} />
                      Ambient
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: "hsl(var(--brand-green))" }} />
                      Panel
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={series} margin={{ left: 0, right: 12, top: 10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="amb" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(var(--brand-yellow))" stopOpacity={0.45} />
                            <stop offset="100%" stopColor="hsl(var(--brand-yellow))" stopOpacity={0.02} />
                          </linearGradient>
                          <linearGradient id="pan" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(var(--brand-green))" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="hsl(var(--brand-green))" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 6" />
                        <XAxis dataKey="t" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis
                          tick={{ fontSize: 12 }}
                          stroke="hsl(var(--muted-foreground))"
                          tickFormatter={(v) => `${v}°`}
                        />
                        <Tooltip
                          formatter={(value: number, name: string) => [`${value}°C`, name === "panel" ? "Panel" : "Ambient"]}
                          labelFormatter={(label) => `${label}`}
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid hsl(var(--border))",
                            background: "hsl(var(--background) / 0.9)",
                            backdropFilter: "blur(10px)",
                          }}
                        />
                        <Area type="monotone" dataKey="ambient" stroke="hsl(var(--brand-yellow))" fill="url(#amb)" />
                        <Area type="monotone" dataKey="panel" stroke="hsl(var(--brand-green))" fill="url(#pan)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 grid gap-3 rounded-2xl border bg-background/40 p-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Season coverage (in view)</p>
                      <p className="mt-1 text-sm font-semibold">
                        {Object.entries(seasonMix)
                          .filter(([, v]) => v > 0)
                          .map(([k, v]) => {
                            const s = seasons.find((x) => x.key === (k as SeasonKey));
                            return `${s?.label ?? k}: ${Math.round((v / series.length) * 100)}%`;
                          })
                          .join(" · ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Demo energy gain potential</p>
                      <p className="mt-1 text-sm font-semibold">{percent(demoGain)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Demo water use</p>
                      <p className="mt-1 text-sm font-semibold">~50% less (target)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-4">
              <Card className="bg-background/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Season ranges (your data)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {seasons.map((s) => (
                      <div key={s.key} className="rounded-2xl border bg-background/50 p-4">
                        <p className="text-sm font-semibold">{s.label}</p>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div className="rounded-xl border bg-background/50 p-3">
                            <p className="text-xs text-muted-foreground">Ambient</p>
                            <p className="mt-1 text-sm font-semibold">
                              {s.ambientLow}–{s.ambientHigh}°C
                            </p>
                          </div>
                          <div className="rounded-xl border bg-background/50 p-3">
                            <p className="text-xs text-muted-foreground">Panel</p>
                            <p className="mt-1 text-sm font-semibold">
                              {s.panelLow}–{s.panelHigh}°C
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">
                          Typical months: {s.months
                            .filter((m) => m >= 0 && m <= 11)
                            .map((m) => format(new Date(YEAR, m, 1), "MMM"))
                            .join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <img
                      src={dashboardImage}
                      alt="OptiSol dashboard UI concept"
                      className="h-48 w-full rounded-2xl border object-cover"
                      loading="lazy"
                    />
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[{ k: "Cooling", v: "Auto" }, { k: "Mist", v: "On" }, { k: "Water", v: "18L" }].map((x) => (
                        <div key={x.k} className="rounded-xl border bg-background/50 p-3">
                          <p className="text-xs text-muted-foreground">{x.k}</p>
                          <p className="mt-1 text-sm font-semibold">{x.v}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-2xl border bg-background/40 p-4">
                      <p className="text-xs text-muted-foreground">What this demo means</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Values are generated within your seasonal high/low ranges for presentation.
                        When you’re ready, we can replace this with real telemetry.
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Droplets className="h-4 w-4" />
                        Water usage shown as a placeholder.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
