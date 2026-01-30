import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Github, Linkedin, QrCode } from "lucide-react";
import githubRepoQr from "@/assets/github-repo-qr.png";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-background/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-xl font-semibold tracking-tight">OptiSol</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Smarter Cooling, Higher Solar Output. AI-driven thermal optimization for rooftop solar in hot climates.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a className="focus-ring rounded-md" href="#" aria-label="GitHub">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
              <a className="focus-ring rounded-md" href="#" aria-label="LinkedIn">
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold">Quick contact</h3>
            <p className="mt-1 text-sm text-muted-foreground">Send a message — we’ll reply with the demo link.</p>

            <form
              className="mt-4 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent (demo mode)", {
                  description: "Hook this up to Lovable Cloud whenever you want real submissions.",
                });
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs text-muted-foreground">
                  Email
                </Label>
                <Input id="email" name="email" placeholder="name@company.com" required className="bg-background/70" />
              </div>
              <Button type="submit" variant="hero" className="justify-center">
                Request a demo
              </Button>
            </form>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold">Capstone</h3>
            <div className="mt-3 rounded-2xl border glass p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-solar shadow-glow">
                  <QrCode className="h-5 w-5 text-primary-foreground" />
                </span>
                <div>
                  <p className="text-sm font-medium">University Project</p>
                  <p className="text-xs text-muted-foreground">Scan to open demo / repo</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border bg-background/60 p-2">
                <img
                  src={githubRepoQr}
                  alt="QR code to OptiSol GitHub repository"
                  loading="lazy"
                  className="mx-auto h-28 w-auto select-none rounded-md object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10" />
        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OptiSol. Built for hot-climate solar performance.</p>
          <p>Bangladesh-ready • IoT monitoring • AI thermal prediction</p>
        </div>
      </div>
    </footer>
  );
}
