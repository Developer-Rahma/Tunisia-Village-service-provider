import React from 'react';

const confetti = [
  'left-[8%] top-8 rotate-12 bg-primary/40',
  'left-[17%] top-14 -rotate-12 bg-accent/60',
  'left-[27%] top-6 rotate-6 bg-primary/25',
  'right-[8%] top-10 -rotate-6 bg-accent/60',
  'right-[18%] top-6 rotate-12 bg-primary/40',
  'right-[29%] top-14 -rotate-12 bg-accent/35',
];

export default function SubmitReview() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-muted/50 p-4 sm:p-6" dir="rtl">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-card shadow-sm">
        <div className="px-5 pb-5 pt-4 sm:px-8">
          <h2 className="mb-3 text-center text-base font-bold text-primary sm:text-lg">
            &#x062A;&#x0645; &#x0627;&#x0644;&#x0625;&#x0631;&#x0633;&#x0627;&#x0644;&#x060C; &#x0633;&#x0646;&#x062A;&#x0648;&#x0644;&#x0649; &#x0627;&#x0644;&#x0623;&#x0645;&#x0631; &#x0645;&#x0646; &#x0647;&#x0646;&#x0627;
          </h2>

          <div className="mb-4 flex items-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-3 py-2 text-xs leading-relaxed text-foreground">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-black text-white">i</span>
            <p>&#x0634;&#x0643;&#x0631;&#x0627;&#x064B; &#x0644;&#x0643;! &#x0627;&#x0633;&#x062A;&#x0644;&#x0645;&#x0646;&#x0627; &#x0637;&#x0644;&#x0628;&#x0643; &#x0648;&#x0633;&#x064A;&#x0642;&#x0648;&#x0645; &#x0641;&#x0631;&#x064A;&#x0642;&#x0646;&#x0627; &#x0628;&#x0645;&#x0631;&#x0627;&#x062C;&#x0639;&#x062A;&#x0647; &#x0642;&#x0631;&#x064A;&#x0628;&#x0627;&#x064B;.</p>
          </div>

          <ul className="mb-4 list-disc space-y-1 pr-5 text-xs leading-relaxed text-muted-foreground">
            <li>&#x0625;&#x0630;&#x0627; &#x0643;&#x0627;&#x0646;&#x062A; &#x0645;&#x0646;&#x0634;&#x0623;&#x062A;&#x0643; &#x062A;&#x0633;&#x062A;&#x0648;&#x0641;&#x064A; &#x0627;&#x0644;&#x0634;&#x0631;&#x0648;&#x0637;&#x060C; &#x0633;&#x0646;&#x0646;&#x0634;&#x0631;&#x0647;&#x0627; &#x062E;&#x0644;&#x0627;&#x0644; 7 &#x0623;&#x064A;&#x0627;&#x0645;.</li>
            <li>&#x0633;&#x062A;&#x062A;&#x0644;&#x0642;&#x0649; &#x0631;&#x0633;&#x0627;&#x0644;&#x0629; &#x0639;&#x0644;&#x0649; &#x0628;&#x0631;&#x064A;&#x062F;&#x0643; &#x0627;&#x0644;&#x0625;&#x0644;&#x0643;&#x062A;&#x0631;&#x0648;&#x0646;&#x064A; &#x0644;&#x0625;&#x0639;&#x0644;&#x0627;&#x0645;&#x0643; &#x0628;&#x062D;&#x0627;&#x0644;&#x0629; &#x0637;&#x0644;&#x0628;&#x0643;.</li>
            <li>&#x064A;&#x0645;&#x0643;&#x0646;&#x0643; &#x0645;&#x062A;&#x0627;&#x0628;&#x0639;&#x0629; &#x062D;&#x0627;&#x0644;&#x0629; &#x0627;&#x0644;&#x0637;&#x0644;&#x0628; &#x0645;&#x0646; &#x0644;&#x0648;&#x062D;&#x0629; &#x0627;&#x0644;&#x062A;&#x062D;&#x0643;&#x0645; &#x0627;&#x0644;&#x062E;&#x0627;&#x0635;&#x0629; &#x0628;&#x0643;.</li>
          </ul>

          <div className="text-center">
            <button type="button" className="rounded-md bg-primary px-7 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30">
              &#x0645;&#x0648;&#x0627;&#x0641;&#x0642;
            </button>
          </div>
        </div>

        <div className="relative flex min-h-44 items-center justify-center overflow-hidden border-t border-border bg-card px-4 py-7 sm:min-h-52">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 flex justify-around">
            {Array.from({ length: 15 }, (_, index) => (
              <span key={index} className="h-0 w-0 border-l-[14px] border-r-[14px] border-t-[23px] border-l-transparent border-r-transparent border-t-primary/10" />
            ))}
          </div>
          {confetti.map((position, index) => (
            <span key={index} aria-hidden="true" className={`absolute h-2 w-2 rounded-sm ${position}`} />
          ))}
          <div className="relative z-10 max-w-sm text-center font-black uppercase leading-[0.82] tracking-tight">
            <div className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-4xl text-transparent sm:text-5xl">Congr</div>
            <div className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-4xl text-transparent sm:text-5xl">atula</div>
            <div className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-4xl text-transparent sm:text-5xl">tions!</div>
          </div>
        </div>
      </section>
    </div>
  );
}
