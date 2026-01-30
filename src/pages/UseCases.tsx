import SectionReveal from "@/components/site/SectionReveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Factory, Home, School } from "lucide-react";

const cases = [
  {
    icon: Home,
    title: "Rooftop Houses",
    body: "Automatic cooling during midday peak heat — without constant spraying.",
    notes: ["compact install", "minimal water use", "mobile-friendly view"],
  },
  {
    icon: Building2,
    title: "Commercial Buildings",
    body: "Keep output stable and reduce thermal stress across large arrays.",
    notes: ["alerts", "zone control", "weekly analytics"],
  },
  {
    icon: Factory,
    title: "Industrial Solar",
    body: "Per-string tuning for factories in Gazipur, Savar, and EPZ zones.",
    notes: ["water budgeting", "robust hardware", "maintenance logs"],
  },
  {
    icon: School,
    title: "Universities & Labs",
    body: "Live datasets for thermal research, ML experiments, and demonstrations.",
    notes: ["export data", "visualize experiments", "repeatable trials"],
  },
];

export default function UseCases() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-14">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">USE CASES</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight">Designed to match how solar is actually deployed.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            From dense rooftops to industrial zones, OptiSol stays efficient under heat and dust while minimizing water.
          </p>
        </SectionReveal>
      </section>

      <section className="pb-16">
        <SectionReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {cases.map((c) => (
              <Card key={c.title} className="bg-background/60 shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                      <c.icon className="h-5 w-5 text-primary-foreground" />
                    </span>
                    <CardTitle className="text-base">{c.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{c.body}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {c.notes.map((n) => (
                      <div key={n} className="rounded-xl border bg-background/50 p-3 text-xs text-muted-foreground">
                        {n}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
