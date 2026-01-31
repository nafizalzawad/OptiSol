import SectionReveal from "@/components/site/SectionReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";
import { toast } from "sonner";

const teamEmails = [
  { name: "Mahmudul Hasan", email: "hassan72602@gmail.com" },
  { name: "Anona Ayshi Rozario", email: "ayshirozario5000@gmail.com" },
  { name: "Tasnuba Akter", email: "tasnubatamim18@gmail.com" },
  { name: "Nafiz Al Zawad", email: "nafizalzawad@gmail.com" },
] as const;

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-14">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">CONTACT</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight">Request a demo or share a rooftop scenario.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            This form is in demo mode (no backend yet). If you want real submissions and email notifications, we can connect it to a backend service.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a className="focus-ring rounded-md" href="/downloads/Capstone_Presentation.pptx" download>
              <Button variant="glass" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Presentation
              </Button>
            </a>
            <a className="focus-ring rounded-md" href="/downloads/OptiSol_Research_Paper_Report.pdf" download>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Research paper
              </Button>
            </a>
          </div>
        </SectionReveal>
      </section>

      <section className="pb-16">
        <SectionReveal>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <Card className="bg-background/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Send a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast.success("Message sent (demo mode)", {
                        description: "This is a demo. Backend integration required for real emails.",
                      });
                    }}
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" required placeholder="Your name" className="bg-background/70" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required placeholder="name@company.com" className="bg-background/70" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="msg">Message</Label>
                      <Textarea id="msg" required placeholder="Tell us your rooftop size, location, and goal." className="min-h-28 bg-background/70" />
                    </div>
                    <Button type="submit" variant="hero">
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-5">
              <Card className="bg-background/60 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground">Team emails</p>
                    <ul className="mt-2 space-y-1">
                      {teamEmails.map((m) => (
                        <li key={m.email}>
                          <a className="story-link" href={`mailto:${m.email}`}>
                            {m.name} — {m.email}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    <span className="font-medium text-foreground">Location focus:</span> Bangladesh + hot-climate countries
                  </p>
                  <div className="rounded-2xl border glass p-4">
                    <p className="text-sm font-semibold text-foreground">QR / Demo</p>
                    <p className="mt-1 text-xs">Replace with a QR to a demo video or GitHub.</p>
                    <div className="mt-3 h-32 rounded-xl border bg-background/60" aria-hidden="true" />
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
