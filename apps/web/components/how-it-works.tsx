const steps = [
  {
    number: "01",
    emoji: "📱",
    title: "App download karo",
    titleEn: "Download the App",
    desc: "Bolo English ko apne phone mein install karo — bilkul free. iOS aur Android dono pe available.",
  },
  {
    number: "02",
    emoji: "✍️",
    title: "Fill-in-the-blank karo",
    titleEn: "Fill in the Blanks",
    desc: "Har sentence mein ek blank hota hai. Do options milte hain — sahi jawab chunno aur English seekho.",
  },
  {
    number: "03",
    emoji: "🔊",
    title: "Suno aur practice karo",
    titleEn: "Listen & Practice",
    desc: "Sahi answer ke baad Indian accent mein audio sunai deta hai. Baar baar suno, fluency badhao.",
  },
  {
    number: "04",
    emoji: "🏆",
    title: "Level up karo",
    titleEn: "Level Up!",
    desc: "Saare lessons complete karo, next level unlock karo. Progress track karta hai — kab rukna hai pata chalega.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-widest text-brand uppercase mb-3">Kaise Kaam Karta Hai?</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            4 simple steps mein
            <br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)" }}>
              English fluent bano
            </span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                {/* Number bubble */}
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-brand-50 border border-brand/15 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform duration-200 shadow-sm">
                    {step.emoji}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand flex items-center justify-center">
                    <span className="text-[9px] font-extrabold text-white">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-stone-900 mb-1">{step.title}</h3>
                <p className="text-xs font-medium text-brand mb-2">{step.titleEn}</p>
                <p className="text-sm text-stone-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
