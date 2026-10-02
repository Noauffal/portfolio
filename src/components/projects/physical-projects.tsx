import { Plate01 } from "@/components/projects/plate-01";
import { Plate02 } from "@/components/projects/plate-02";
import { Plate03 } from "@/components/projects/plate-03";

/* Direction 03 Projects experience: three physical Plates in the continuous
   black latent space, in normal document flow (scroll = position, pointer =
   orientation). Replaces the old paper-based Stage 7/8 Projects section. */
export function PhysicalProjects() {
  return (
    <>
      {/* Enter the latent space */}
      <section aria-hidden="true" className="min-h-[25svh] sm:min-h-[30svh]" />

      {/* Plate 01 — portrait / right */}
      <section
        id="plate-01"
        className="mx-auto flex min-h-[120svh] w-full max-w-[1600px] items-center px-6 sm:px-10"
      >
        <div className="grid w-full grid-cols-1 items-center md:grid-cols-12">
          <div aria-hidden="true" className="hidden md:col-span-5 md:block" />
          <div className="flex justify-center md:col-span-7 md:justify-end">
            <Plate01 />
          </div>
        </div>
      </section>

      <section aria-hidden="true" className="min-h-[16svh]" />

      {/* Plate 02 — taller portrait / left */}
      <section
        id="plate-02"
        className="mx-auto flex min-h-[120svh] w-full max-w-[1600px] items-center px-6 sm:px-10"
      >
        <div className="grid w-full grid-cols-1 items-center md:grid-cols-12">
          <div className="flex justify-center md:col-span-7 md:justify-start">
            <Plate02 />
          </div>
          <div aria-hidden="true" className="hidden md:col-span-5 md:block" />
        </div>
      </section>

      <section aria-hidden="true" className="min-h-[16svh]" />

      {/* Plate 03 — very large 16:10 landscape / centre */}
      <section
        id="plate-03"
        className="mx-auto flex min-h-[124svh] w-full max-w-[1600px] items-center overflow-x-clip px-6 sm:px-10"
      >
        <div className="flex w-full justify-center">
          <Plate03 />
        </div>
      </section>
    </>
  );
}
