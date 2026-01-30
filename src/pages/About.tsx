import SectionReveal from "@/components/site/SectionReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Download, Mail } from "lucide-react";

import MahmudulHasanImg from "@/assets/team/Mahmudul_Hasan.jpeg";
import AnonaAyshiRozarioImg from "@/assets/team/Anona_Ayshi_Rozario.jpeg";
import TasnubaAkterImg from "@/assets/team/Tasnuba_Akter.png";
import NafizAlZawadImg from "@/assets/team/Nafiz_Al_Zawad.png";
import TaniaAkterSetuImg from "@/assets/team/Tania_Akter_Setu.jpg";

const team = [
  {
    name: "Mahmudul Hasan",
    email: "hassan72602@gmail.com",
    focus: "IoT, sensing, system integration",
    image: MahmudulHasanImg,
  },
  {
    name: "Anona Ayshi Rozario",
    email: "ayshirozario5000@gmail.com",
    focus: "Research, documentation, model evaluation",
    image: AnonaAyshiRozarioImg,
  },
  {
    name: "Tasnuba Akter",
    email: "tasnubatamim18@gmail.com",
    focus: "Dataset building, experiments, analysis",
    image: TasnubaAkterImg,
  },
  {
    name: "Nafiz Al Zawad",
    email: "nafizalzawad@gmail.com",
    focus: "Dashboard UX, data visualization",
    image: NafizAlZawadImg,
  },
] as const;

const supervisor = {
  name: "Ms. Tania Akter Setu",
  title: "Assistant Professor, Dept. of CSE, UITS",
  email: "tania.setu@uits.edu.bd",
  image: TaniaAkterSetuImg,
} as const;

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-14">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">ABOUT</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight">A capstone team with a hot-climate mission.</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            OptiSol is designed for Bangladesh and other hot-climate countries where heat and dust reduce rooftop solar
            performance.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <a className="focus-ring rounded-md" href="/downloads/Capstone_Presentation.pptx" download>
              <Button variant="glass" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download presentation
              </Button>
            </a>
            <a className="focus-ring rounded-md" href="/downloads/OptiSol_Research_Paper_Report.pdf" download>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download research paper
              </Button>
            </a>
          </div>

           <div className="mt-10">
             <p className="text-xs font-medium tracking-wide text-muted-foreground">CAPSTONE SUPERVISOR</p>
             <Card className="mt-3 overflow-hidden bg-background/60 shadow-soft">
               <div className="p-6">
                 <div className="mx-auto w-full max-w-[240px]">
                   <AspectRatio ratio={3 / 4}>
                     <img
                       src={supervisor.image}
                       alt={`${supervisor.name} portrait`}
                       loading="lazy"
                       className="h-full w-full rounded-md border bg-muted object-contain"
                     />
                   </AspectRatio>
                 </div>

                 <div className="mt-5">
                   <CardHeader className="p-0">
                     <CardTitle className="text-base">{supervisor.name}</CardTitle>
                   </CardHeader>
                   <CardContent className="p-0 pt-3 text-sm text-muted-foreground">
                     <p>{supervisor.title}</p>
                     <a
                       className="focus-ring mt-4 inline-flex w-full max-w-full rounded-md"
                       href={`mailto:${supervisor.email}`}
                       aria-label={`Email ${supervisor.name}`}
                     >
                       <Button
                         variant="outline"
                         size="sm"
                         className="w-full max-w-full justify-start gap-2 overflow-hidden"
                       >
                         <Mail className="h-4 w-4" />
                         <span className="min-w-0 truncate">{supervisor.email}</span>
                       </Button>
                     </a>
                   </CardContent>
                 </div>
               </div>
             </Card>
           </div>
        </SectionReveal>
      </section>

      <section className="pb-16">
        <SectionReveal>
          <p className="text-xs font-medium tracking-wide text-muted-foreground">CAPSTONE TEAM</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <Card key={m.email} className="overflow-hidden bg-background/60 shadow-soft">
                <div className="p-6">
                  <div className="mx-auto w-full max-w-[200px]">
                    <AspectRatio ratio={3 / 4}>
                      <img
                        src={m.image}
                        alt={`${m.name} portrait`}
                        loading="lazy"
                        className="h-full w-full rounded-md border bg-muted object-contain"
                      />
                    </AspectRatio>
                  </div>

                  <div className="mt-5">
                    <CardHeader className="p-0">
                      <CardTitle className="text-base">{m.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-3 text-sm text-muted-foreground">
                      <p>{m.focus}</p>
                      <a
                        className="focus-ring mt-4 inline-flex w-full max-w-full rounded-md"
                        href={`mailto:${m.email}`}
                        aria-label={`Email ${m.name}`}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full max-w-full justify-start gap-2 overflow-hidden"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="min-w-0 truncate">{m.email}</span>
                        </Button>
                      </a>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
