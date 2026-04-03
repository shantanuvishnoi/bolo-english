import WaitlistForm from "./waitlist-form";

export default function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%), " +
          "linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative mx-auto max-w-2xl px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="text-sm font-semibold text-white">Early Access Waitlist</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Ready ho? Join karo
          <br />aaj hi.
        </h2>

        <p className="text-lg text-white/75 leading-relaxed mb-10">
          Jab Bolo English launch hoga, aap sabse pehle janenge.
          <br className="hidden sm:block" />
          Bilkul free. No spam. Kabhi bhi unsubscribe kar sakte ho.
        </p>

        {/* Form */}
        <div className="max-w-md mx-auto">
          <WaitlistForm dark />
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="flex -space-x-2">
            {["🧑🏽", "👩🏾", "👨🏻", "👩🏽", "🧑🏿"].map((emoji, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-sm">
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-sm text-white/70">
            <span className="font-bold text-white">500+</span> log already wait kar rahe hain
          </p>
        </div>
      </div>
    </section>
  );
}
