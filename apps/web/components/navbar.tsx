import Logo from "./logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/70 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Logo size={30} />

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#how-it-works" className="hover:text-brand transition-colors">
            How it works
          </a>
          <a href="#features" className="hover:text-brand transition-colors">
            Features
          </a>
        </nav>

        <a
          href="#waitlist"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark transition-all hover:shadow-md hover:-translate-y-px active:translate-y-0"
        >
          Join Waitlist
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </header>
  );
}
