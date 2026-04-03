export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px]">
      {/* Glow behind phone */}
      <div className="absolute inset-[-20px] rounded-[3rem] bg-brand/10 blur-3xl" />

      {/* Phone shell */}
      <div
        className="relative animate-float"
        style={{
          transform: "perspective(1000px) rotateY(-10deg) rotateX(3deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative w-[260px] h-[530px] bg-stone-900 rounded-[2.8rem] shadow-[0_32px_80px_rgba(0,0,0,0.40),0_8px_24px_rgba(0,0,0,0.25)]">
          {/* Side buttons */}
          <div className="absolute -left-[3px] top-[110px] w-1 h-9 bg-stone-700 rounded-l-sm" />
          <div className="absolute -left-[3px] top-[160px] w-1 h-9 bg-stone-700 rounded-l-sm" />
          <div className="absolute -right-[3px] top-[130px] w-1 h-14 bg-stone-700 rounded-r-sm" />

          {/* Screen */}
          <div className="absolute inset-[9px] rounded-[2.2rem] bg-[#FAF8F5] overflow-hidden">

            {/* Punch-hole camera */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-stone-900 z-10" />

            {/* Status bar */}
            <div className="pt-7 px-4 pb-1 flex items-center justify-between">
              <span className="text-[8px] font-bold text-stone-700">9:41</span>
              <div className="flex items-center gap-1">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <rect x="0" y="4" width="2" height="4" rx="0.5" fill="#44403C"/>
                  <rect x="3" y="2.5" width="2" height="5.5" rx="0.5" fill="#44403C"/>
                  <rect x="6" y="1" width="2" height="7" rx="0.5" fill="#44403C"/>
                  <rect x="9" y="0" width="2" height="8" rx="0.5" fill="#44403C" opacity="0.3"/>
                </svg>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <rect x="0" y="1" width="10" height="6" rx="1" stroke="#44403C" strokeWidth="1"/>
                  <rect x="1.5" y="2.5" width="6" height="3" rx="0.5" fill="#44403C"/>
                  <path d="M11 3.5v1" stroke="#44403C" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* App content */}
            <div className="px-4 pt-1 pb-14">
              {/* Header */}
              <div className="flex justify-between items-start mb-1.5">
                <div className="flex-1 pr-2">
                  <p className="text-[10px] font-bold text-stone-900 leading-snug">Welcome to Bolo English</p>
                  <p className="text-[7px] text-stone-500 mt-0.5 leading-tight">20 sentences remaining to reach Level 2</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px]">🌙</span>
                </div>
              </div>

              {/* Level progress bar */}
              <div className="h-2 bg-stone-200 rounded-full mb-3 overflow-hidden">
                <div className="h-full w-[28%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
              </div>

              {/* Level badge */}
              <div className="inline-flex items-center rounded-lg bg-violet-600 px-2 py-0.5 mb-2">
                <span className="text-[7px] font-bold tracking-widest text-white">LEVEL 1</span>
              </div>

              {/* Lesson cards */}
              <div className="space-y-2">
                {/* Card 1 — in progress */}
                <div className="rounded-xl bg-white border border-stone-200 p-2.5 shadow-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] flex-shrink-0">
                      📖
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-semibold text-stone-900 leading-tight">Apna introduction do</p>
                      <p className="text-[7px] text-stone-500 mt-0.5">Reading · 5/10 sentences</p>
                    </div>
                  </div>
                  <div className="h-1 bg-stone-100 rounded-full mb-2 overflow-hidden">
                    <div className="h-full w-1/2 rounded-full bg-indigo-500" />
                  </div>
                  <div className="rounded-lg bg-indigo-500 py-1.5 text-center">
                    <span className="text-[8px] font-bold text-white">Continue Lesson</span>
                  </div>
                </div>

                {/* Card 2 — completed */}
                <div className="rounded-xl bg-white border-[1.5px] border-emerald-500 p-2.5 shadow-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] flex-shrink-0">
                      ✅
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-semibold text-stone-900 leading-tight">Apna kaam batao</p>
                      <p className="text-[7px] font-semibold text-emerald-600 mt-0.5">Completed · 10/10</p>
                    </div>
                  </div>
                  <div className="h-1 rounded-full bg-emerald-100 overflow-hidden">
                    <div className="h-full w-full rounded-full bg-emerald-500" />
                  </div>
                </div>

                {/* Quiz preview card */}
                <div className="rounded-xl bg-white border border-stone-200 p-2.5 shadow-sm">
                  <p className="text-[7px] text-stone-500 mb-1 text-center">Family ke baare mein batao</p>
                  <p className="text-[9px] font-bold text-stone-900 text-center mb-2">I ___ one brother.</p>
                  <div className="flex gap-1.5">
                    <div className="flex-1 rounded-lg border-[1.5px] border-indigo-500 py-1 text-center">
                      <span className="text-[8px] font-bold text-indigo-600">have</span>
                    </div>
                    <div className="flex-1 rounded-lg border border-stone-200 py-1 text-center">
                      <span className="text-[8px] font-bold text-stone-500">want</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom tab bar */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-stone-200 flex items-center justify-around px-1">
              {[
                { icon: "🏠", label: "Home", active: true },
                { icon: "⭐", label: "Pro", active: false },
                { icon: "⚡", label: "", active: false, center: true },
                { icon: "🤖", label: "AI", active: false },
                { icon: "📊", label: "Stats", active: false },
              ].map((tab, i) =>
                tab.center ? (
                  <div key={i} className="flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center -translate-y-1.5 shadow-md">
                      <span className="text-[10px]">⚡</span>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px]">{tab.icon}</span>
                    <span className={`text-[6px] font-semibold ${tab.active ? "text-indigo-500" : "text-stone-400"}`}>
                      {tab.label}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
