"use client";

import { useState } from "react";

export default function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={`flex items-center gap-3 rounded-2xl border px-6 py-4 ${
        dark
          ? "border-white/20 bg-white/10 text-white"
          : "border-success/30 bg-success/8 text-stone-800"
      }`}>
        <span className="text-2xl">🎉</span>
        <div>
          <p className="font-bold text-base">Shukriya! Aap waitlist mein hain.</p>
          <p className={`text-sm mt-0.5 ${dark ? "text-white/70" : "text-stone-500"}`}>
            We&apos;ll notify you as soon as Bolo English launches.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="aapka@email.com"
            className={`w-full rounded-xl px-4 py-3.5 text-base outline-none transition-all placeholder:text-stone-400
              ${dark
                ? "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white/50 focus:bg-white/15"
                : "bg-white border border-stone-200 text-stone-900 focus:border-brand focus:ring-2 focus:ring-brand/15 shadow-sm"
              }`}
          />
          {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
        </div>
        <button
          type="submit"
          className={`rounded-xl px-6 py-3.5 text-base font-bold whitespace-nowrap transition-all hover:-translate-y-px active:translate-y-0
            ${dark
              ? "bg-white text-brand hover:bg-stone-100 shadow-lg"
              : "bg-brand text-white hover:bg-brand-dark shadow-md hover:shadow-lg"
            }`}
        >
          Join Waitlist →
        </button>
      </div>
      <p className={`mt-2.5 text-xs ${dark ? "text-white/50" : "text-stone-400"}`}>
        No spam. Sirf launch notification. Kabhi bhi unsubscribe kar sakte ho.
      </p>
    </form>
  );
}
