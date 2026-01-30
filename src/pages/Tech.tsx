import SectionReveal from "@/components/site/SectionReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Network, Shield, Sparkles, ThermometerSun, Wrench } from "lucide-react";

const blocks = [
  {
    icon: Cpu,
    title: "Edge hardware",
    points: ["ESP32", "panel temp probes", "dust/irradiance sensors", "PWM fan control"],
  },
  {
    icon: Sparkles,
    title: "AI/ML models",
    points: ["overheat forecasting", "trend + anomaly detection", "RL optimization (optional)", "continuous calibration"],
  },
  {
    icon: Network,
    title: "Data pipeline",
    points: ["buffering", "batch uploads", "device health", "time-series storage"],
  },
  {
    icon: ThermometerSun,
    title: "Cooling module",
    points: ["micro-mist valves", "fan ducts", "minimal power draw", "water budgeting"],
  },
  {
    icon: Shield,
    title: "Reliability",
    points: ["failsafe defaults", "manual override", "alerts", "offline-first control"],
  },
  {
    icon: Wrench,
    title: "Deployment",
    points: ["modular installation", "industrial rooftops", "maintenance notes", "spare parts"],
  },
];

export default function Tech() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-14">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">TECH</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight">Thermal optimization — the technical view.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A pragmatic stack: edge sensing, forecast models, and adaptive cooling control. Built for harsh rooftop
            conditions.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["ESP32", "Forecasting", "Reinforcement learning", "Time-series", "Alerts"].map((x) => (
              <Badge key={x} variant="outline" className="bg-background/60">
                {x}
              </Badge>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="pb-16">
        <SectionReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b) => (
              <Card key={b.title} className="bg-background/60 shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                      <b.icon className="h-5 w-5 text-primary-foreground" />
                    </span>
                    <CardTitle className="text-base">{b.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {b.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
