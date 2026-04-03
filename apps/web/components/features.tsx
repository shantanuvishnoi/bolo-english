const features = [
  {
    emoji: "🤖",
    title: "AI-Powered Learning",
    titleHi: "Smart AI Tutor",
    desc: "AI tutor har student ke level ko samajhta hai aur uske hisaab se lessons adjust karta hai.",
  },
  {
    emoji: "🔊",
    title: "Indian Accent Audio",
    titleHi: "Desi Accent Mein Seekho",
    desc: "Har sentence Indian English accent mein bola jaata hai — foreign accent ki tension nahi.",
  },
  {
    emoji: "✍️",
    title: "Fill-in-the-Blank",
    titleHi: "Interactive Exercises",
    desc: "Sirf padhna nahi — actively answers chunne se memory mein zada better store hota hai.",
  },
  {
    emoji: "📈",
    title: "Smart Progress Tracking",
    titleHi: "Progress Dekho",
    desc: "Har level, har lesson ka progress track hota hai. Kahan ho aur kahan jaana hai — sab clear.",
  },
  {
    emoji: "🏆",
    title: "Level System",
    titleHi: "Levels Unlock Karo",
    desc: "Level 1 complete karo, Level 2 unlock karo. Har level pe naye topics aur harder sentences.",
  },
  {
    emoji: "🆓",
    title: "Bilkul Free",
    titleHi: "Zero Cost",
    desc: "Koi subscription nahi, koi hidden charges nahi. Bolo English use karna always free rahega.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24"
      style={{ background: "#FAF8F5" }}
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest text-brand uppercase mb-3">Kyun Bolo English?</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Woh sab kuch jo aapko
            <br className="hidden sm:block" /> chahiye tha
          </h2>
          <p className="mt-4 text-lg text-stone-500 max-w-xl mx-auto">
            Ek app mein — AI tutor, Indian accent audio, aur smart progress tracking. Koi extra apps nahi.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl bg-white border border-stone-200 p-6 hover:border-brand/30 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {f.emoji}
              </div>
              <h3 className="text-base font-extrabold text-stone-900 mb-0.5">{f.title}</h3>
              <p className="text-xs font-semibold text-brand mb-2">{f.titleHi}</p>
              <p className="text-sm text-stone-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
