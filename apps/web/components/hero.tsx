import PhoneMockup from "./phone-mockup";
import WaitlistForm from "./waitlist-form";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 65% 10%, rgba(99,102,241,0.10) 0%, transparent 65%), " +
          "radial-gradient(ellipse 60% 40% at 10% 80%, rgba(124,58,237,0.06) 0%, transparent 55%), " +
          "#FAF8F5",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

          {/* ── Left: copy + form ── */}
          <div className="flex-1 max-w-xl text-center lg:text-left">

            {/* Launch badge */}
            <div className="opacity-0-start animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-50 px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <span className="text-sm font-semibold text-brand">Waitlist Open — Join Now</span>
            </div>

            {/* Headline */}
            <h1 className="opacity-0-start animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-[64px] font-extrabold leading-[1.08] tracking-tight text-stone-900 mb-6">
              English bolna
              <br />
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)" }}>
                  ab aasaan hai
                </span>
                {/* Underline decoration */}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 9 Q75 2 150 7 Q225 12 298 5" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <p className="opacity-0-start animate-fade-in-up delay-200 text-lg text-stone-600 leading-relaxed mb-3">
              <span className="font-semibold text-stone-800">AI Tutor ke saath</span> seekho English —
              one sentence at a time.
            </p>
            <p className="opacity-0-start animate-fade-in-up delay-200 text-base text-stone-500 leading-relaxed mb-10">
              Fill-in-the-blank exercises, Indian accent audio, aur smart progress tracking.
              Bilkul free, bilkul aasaan.
            </p>

            {/* Waitlist form */}
            <div className="opacity-0-start animate-fade-in-up delay-300 w-full max-w-md mx-auto lg:mx-0">
              <WaitlistForm />
            </div>

            {/* Social proof */}
            <div className="opacity-0-start animate-fade-in-up delay-400 flex items-center gap-3 mt-7 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {["🧑🏽", "👩🏾", "👨🏻", "👩🏽"].map((emoji, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-cream bg-stone-200 flex items-center justify-center text-sm">
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-sm text-stone-500">
                <span className="font-bold text-stone-800">500+</span> log pehle se wait kar rahe hain
              </p>
            </div>
          </div>

          {/* ── Right: phone mockup ── */}
          <div className="opacity-0-start animate-fade-in delay-500 flex-shrink-0 w-full flex justify-center lg:justify-end lg:w-auto">
            <PhoneMockup />
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-cream/60 to-transparent pointer-events-none" />
    </section>
  );
}
