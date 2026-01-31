import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import SectionReveal from "@/components/site/SectionReveal";
import SolarGlowField from "@/components/site/SolarGlowField";
import heroImage from "@/assets/optisol-hero.jpg";
import dashboardImage from "@/assets/optisol-dashboard.jpg";
import {
  Activity,
  Cpu,
  Droplets,
  Fan,
  Gauge,
  LineChart,
  MapPin,
  Radar,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Timer,
  Waves,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Link } from "react-router-dom";

const performance = [
  { t: "9am", temp: 62, output: 78 },
  { t: "11am", temp: 68, output: 73 },
  { t: "1pm", temp: 71, output: 70 },
  { t: "3pm", temp: 64, output: 80 },
  { t: "5pm", temp: 58, output: 83 },
];

const featureCards = [
  { icon: Activity, title: "Real-time IoT Monitoring", body: "Sensors stream panel, ambient, and flow metrics at the edge." },
  { icon: Radar, title: "AI Thermal Prediction", body: "Forecast overheating early and act before efficiency drops." },
  { icon: Fan, title: "Smart Cooling Control", body: "Targeted fans + micro-mist when needed, not all day." },
  { icon: Droplets, title: "Water Optimization", body: "Mist precisely; avoid waste with closed-loop scheduling." },
  { icon: LineChart, title: "Dashboard Analytics", body: "See temperature, gain, water use, and alerts in one view." },
  { icon: Waves, title: "Dust + Rinse Mode", body: "Detect dust events and trigger low-water rinse cycles." },
];

const techPills = [
  { icon: Cpu, title: "IoT", items: ["ESP32", "temp + dust sensors", "edge rules"] },
  { icon: Sparkles, title: "AI/ML", items: ["forecasting models", "thermal anomaly detection", "RL tuning"] },
  { icon: Gauge, title: "Control", items: ["fan PWM", "micro-mist valves", "adaptive schedules"] },
  { icon: ShieldCheck, title: "Cloud", items: ["dashboards", "storage", "alerting"] },
];

const useCases = [
  { title: "Rooftop Houses", body: "Boost output when midday heat hits the roof." },
  { title: "Commercial Buildings", body: "Keep peak production stable across hot weeks." },
  { title: "Industrial Solar", body: "Target cooling per string to minimize water usage." },
  { title: "Universities & Labs", body: "Collect data for ML research and live demos." },
];

export default function Index() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-aurora">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <SolarGlowField className="pointer-events-none absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-grid opacity-[0.35]" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-background/60">
                  AI + IoT Cooling
                </Badge>
                <Badge variant="outline" className="bg-background/60">
                  Bangladesh-ready
                </Badge>
                <Badge variant="outline" className="bg-background/60">
                  Minimal water
                </Badge>
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Smarter Cooling, Higher Solar Output.
              </h1>
              <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground">
                OptiSol monitors panel temperature, predicts overheating, and activates targeted fan + micro-mist cooling —
                increasing energy output while minimizing water and power consumption.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="hero" className="w-full sm:w-auto">
                  <Link to="/how-it-works">How it works</Link>
                </Button>
                <Button asChild variant="glass" className="w-full sm:w-auto">
                  <Link to="/dashboard">Dashboard demo</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link to="/tech">Tech overview</Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { k: "+5–10%", v: "Efficiency" },
                  { k: "−10–15°C", v: "Temperature" },
                  { k: "−50%", v: "Water use" },
                ].map((s) => (
                  <div key={s.v} className="rounded-2xl border bg-background/60 p-4 shadow-soft">
                    <p className="text-lg font-semibold tracking-tight">{s.k}</p>
                    <p className="text-xs text-muted-foreground">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-6">
              <motion.div
                className="relative overflow-hidden rounded-3xl border bg-background/50 shadow-glow"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.21, 0.8, 0.21, 1] }}
              >
                <div className="absolute inset-0 bg-gradient-sky" aria-hidden="true" />
                <img
                  src={heroImage}
                  alt="Rooftop solar panel with OptiSol edge cooling and micro-mist"
                  className="h-[320px] w-full object-cover sm:h-[420px]"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="glass rounded-2xl px-4 py-3 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4" />
                        <span className="text-sm font-medium">Thermal risk</span>
                      </div>
                      <span className="text-sm font-semibold">Moderate → cooling in 90s</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-[72%] bg-gradient-solar" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">THE PROBLEM</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Heat + dust quietly erase output.</h2>
              <p className="mt-4 text-muted-foreground">
                Rooftop panels can reach <span className="font-medium">65–70°C</span> in Bangladesh.
                Overheating and dust can reduce production by <span className="font-medium">15–20%</span>.
              </p>
            </div>

            <div className="md:col-span-7">
              <Card className="overflow-hidden bg-background/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Efficiency drop (example)</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performance} margin={{ left: 0, right: 12, top: 10, bottom: 0 }}>
                        <defs>
                          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(var(--brand-yellow))" stopOpacity={0.55} />
                            <stop offset="100%" stopColor="hsl(var(--brand-yellow))" stopOpacity={0.02} />
                          </linearGradient>
                          <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="hsl(var(--brand-blue))" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="hsl(var(--brand-blue))" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="4 6" />
                        <XAxis dataKey="t" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 12,
                            border: "1px solid hsl(var(--border))",
                            background: "hsl(var(--background) / 0.85)",
                            backdropFilter: "blur(10px)",
                          }}
                        />
                        <Area type="monotone" dataKey="temp" stroke="hsl(var(--brand-yellow))" fill="url(#g1)" />
                        <Area type="monotone" dataKey="output" stroke="hsl(var(--brand-blue))" fill="url(#g2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[{ i: Thermometer, t: "Heat waves" }, { i: Timer, t: "Peak hours" }, { i: MapPin, t: "Dense rooftops" }].map(
                      (x) => (
                        <div key={x.t} className="rounded-xl border bg-background/50 p-3">
                          <x.i className="h-4 w-4" />
                          <p className="mt-2 text-xs text-muted-foreground">{x.t}</p>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* SOLUTION */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">THE SOLUTION</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Sense → predict → cool → learn.</h2>
              <p className="mt-4 text-muted-foreground">
                OptiSol combines edge sensors, prediction models, and adaptive control to cool only when it matters.
              </p>

              <div className="mt-6 grid gap-3">
                {[{ i: Activity, t: "Sensors" }, { i: Radar, t: "AI Forecast" }, { i: Fan, t: "Cooling" }, { i: LineChart, t: "Dashboard" }].map(
                  (s, idx) => (
                    <div key={s.t} className="group rounded-2xl border bg-background/60 p-4 shadow-soft transition-transform hover:-translate-y-0.5">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                          <s.i className="h-5 w-5 text-primary-foreground" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{s.t}</p>
                          <p className="text-xs text-muted-foreground">Step {idx + 1}</p>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="rounded-3xl border bg-background/60 p-6 shadow-soft">
                <div className="relative overflow-hidden rounded-2xl border bg-background/40">
                  <div className="absolute inset-0 bg-gradient-eco" aria-hidden="true" />
                  <div className="grid gap-4 p-6 sm:grid-cols-2">
                    {[
                      { title: "Thermal forecast", val: "+90 min lead" },
                      { title: "Cooling trigger", val: "Context-aware" },
                      { title: "Water budget", val: "Adaptive" },
                      { title: "Efficiency view", val: "Per string" },
                    ].map((k) => (
                      <div
                        key={k.title}
                        className="group rounded-2xl border bg-background/60 p-4 transition-all hover:shadow-glow"
                      >
                        <p className="text-xs text-muted-foreground">{k.title}</p>
                        <p className="mt-2 text-lg font-semibold tracking-tight">{k.val}</p>
                        <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full w-2/3 bg-gradient-solar animate-shine" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border glass p-4 shadow-soft">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Demo dashboard preview</p>
                    <a href="/dashboard" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
                      Open
                    </a>
                  </div>
                  <img
                    src={dashboardImage}
                    alt="OptiSol dashboard preview with temperature and output charts"
                    className="mt-4 h-56 w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground">KEY FEATURES</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Engineered for real rooftops.</h2>
            </div>
            <a href="/tech" className="hidden text-sm text-muted-foreground underline-offset-4 hover:underline md:block">
              Technical breakdown
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((f, i) => (
              <motion.div
                key={f.title}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
              >
                <Card className="group h-full bg-background/60 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                        <f.icon className="h-5 w-5 text-primary-foreground" />
                      </span>
                      <CardTitle className="text-base">{f.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{f.body}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* TECH STACK */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">TECH STACK</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">A modern stack — practical for academic validation.</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {techPills.map((t) => (
              <Card key={t.title} className="bg-background/60 shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                      <t.icon className="h-5 w-5 text-primary-foreground" />
                    </span>
                    <CardTitle className="text-base">{t.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {t.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* BANGLADESH */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <div className="grid gap-8 rounded-3xl border bg-background/60 p-8 shadow-soft md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-xs font-medium tracking-wide text-muted-foreground">BANGLADESH FIT</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Built for Dhaka heat, dust, and rooftops.</h2>
              <p className="mt-4 text-muted-foreground">
                High rooftop adoption + intense peak temperatures = a clear opportunity. OptiSol targets industrial zones
                like Gazipur, Savar, and EPZ deployments.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Rooftop adoption", "Industrial zones", "Hot climate advantage"].map((x) => (
                  <div key={x} className="rounded-2xl border bg-background/50 p-4">
                    <p className="text-sm font-medium">{x}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Context-aware tuning</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-2xl border glass p-6 shadow-soft">
                <p className="text-sm font-semibold">Climate baseline</p>
                <div className="mt-4 grid gap-3">
                  {[{ k: "Roof temps", v: "65–70°C" }, { k: "Dust cycles", v: "Frequent" }, { k: "Water", v: "Limited" }].map(
                    (r) => (
                      <div key={r.k} className="flex items-center justify-between rounded-xl border bg-background/60 p-3">
                        <span className="text-sm text-muted-foreground">{r.k}</span>
                        <span className="text-sm font-semibold">{r.v}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* RESULTS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">EXPECTED RESULTS</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Designed for measurable lift.</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: "Efficiency", value: "+5–10%", icon: LineChart },
              { title: "Temperature", value: "−10–15°C", icon: Thermometer },
              { title: "Water", value: "−50%", icon: Droplets },
            ].map((r) => (
              <Card key={r.title} className="overflow-hidden bg-background/60 shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{r.title}</CardTitle>
                    <r.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-3xl font-semibold tracking-tight">{r.value}</p>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[78%] bg-gradient-solar" />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Compared to no cooling / naive spray cooling.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* PROTOTYPE / DEMO */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground">PROTOTYPE</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Hardware + dashboard, side-by-side.</h2>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border bg-background/60 p-6 shadow-soft">
            <Carousel opts={{ align: "start" }}>
              <CarouselContent>
                {["Cooling module close-up", "Live dashboard", "Field test workflow"].map((t, idx) => (
                  <CarouselItem key={t} className="md:basis-1/2">
                    <div className="rounded-2xl border bg-background/50 p-4">
                      <p className="text-sm font-semibold">{t}</p>
                      <div className="mt-3 h-48 rounded-xl border bg-background/60" aria-hidden="true" />
                      <p className="mt-3 text-sm text-muted-foreground">
                        {idx === 1
                          ? "Preview screens for temperature, output gain, and water budget."
                          : "Replace with a short looping clip or photo of the prototype module."}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </SectionReveal>
      </section>

      {/* USE CASES */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">USE CASES</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Where OptiSol fits first.</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((c) => (
              <Card key={c.title} className="bg-background/60 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow">
                <CardHeader>
                  <CardTitle className="text-base">{c.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{c.body}</CardContent>
              </Card>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* ROADMAP */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">FUTURE ROADMAP</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">A measured path forward.</h2>

          <div className="mt-8 grid gap-4">
            {[
              { q: "Phase 1", t: "Field-ready prototype", d: "Baseline monitoring + cooling control." },
              { q: "Phase 2", t: "Predictive maintenance", d: "Fault signatures, alerts, and logs." },
              { q: "Phase 3", t: "Machine vision", d: "Dust patterns + cleaning optimization." },
              { q: "Phase 4", t: "Advanced cooling", d: "PCM cooling + tracking integration." },
            ].map((r) => (
              <div key={r.q} className="rounded-2xl border bg-background/60 p-5 shadow-soft">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                      <Timer className="h-4 w-4 text-primary-foreground" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{r.t}</p>
                      <p className="text-xs text-muted-foreground">{r.q}</p>
                    </div>
                  </div>
                  <p className="max-w-xl text-sm text-muted-foreground">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">TEAM</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Capstone-ready roles.</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["IoT + firmware", "ML + forecasting", "Mechanical cooling", "Frontend + dashboard", "Field testing", "Product + ops"].map(
              (r) => (
                <Card key={r} className="bg-background/60 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-base">{r}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Add names, photos, and specific expertise when ready.
                  </CardContent>
                </Card>
              ),
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="focus-ring rounded-md" href="/about">
              <Button variant="glass">About the team</Button>
            </a>
            <a className="focus-ring rounded-md" href="/contact">
              <Button variant="hero">Contact</Button>
            </a>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
