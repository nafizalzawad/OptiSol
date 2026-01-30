import SectionReveal from "@/components/site/SectionReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Brain, Fan, LineChart, Droplets, Radar } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-14">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">HOW IT WORKS</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight">IoT sensing + AI prediction + targeted cooling.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            OptiSol is a closed-loop thermal optimization system: observe, predict, act, and learn — with minimal water
            and power.
          </p>
        </SectionReveal>
      </section>

      <section className="pb-16">
        <SectionReveal>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Activity,
                title: "1) Sense",
                body: "Panel temperature, ambient conditions, dust indicators, and flow are captured at the edge.",
              },
              {
                icon: Brain,
                title: "2) Predict",
                body: "Forecast overheating before the efficiency curve drops. Flag anomalies and trends.",
              },
              {
                icon: Fan,
                title: "3) Cool",
                body: "Trigger fan + micro-mist only when needed, then stop as soon as the risk is cleared.",
              },
            ].map((s) => (
              <Card key={s.title} className="bg-background/60 shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                      <s.icon className="h-5 w-5 text-primary-foreground" />
                    </span>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{s.body}</CardContent>
              </Card>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-10 rounded-3xl border bg-background/60 p-8 shadow-soft">
            <h2 className="text-2xl font-semibold tracking-tight">Control loop (simplified)</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-6">
              {[{ i: Radar, t: "Sensors" }, { i: Brain, t: "Model" }, { i: Fan, t: "Cooling" }, { i: Droplets, t: "Water" }, { i: LineChart, t: "Dashboard" }].map(
                (x) => (
                  <div key={x.t} className="md:col-span-1 rounded-2xl border bg-background/50 p-4 text-center">
                    <x.i className="mx-auto h-5 w-5 text-muted-foreground" />
                    <p className="mt-2 text-xs font-medium">{x.t}</p>
                  </div>
                ),
              )}
              <div className="md:col-span-1 rounded-2xl border glass p-4 text-center">
                <p className="text-xs font-medium">Feedback</p>
                <p className="mt-2 text-xs text-muted-foreground">Improves schedules</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a className="focus-ring rounded-md" href="/dashboard">
                <Button variant="hero">See the dashboard</Button>
              </a>
              <a className="focus-ring rounded-md" href="/tech">
                <Button variant="glass">Deep tech details</Button>
              </a>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
