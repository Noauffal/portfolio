import { Hero } from "@/components/hero";
import { SiteNav } from "@/components/site-nav";
import { PhysicalProjects } from "@/components/projects/physical-projects";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <PhysicalProjects />
      </main>
    </>
  );
}
