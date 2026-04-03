import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            {/* Logo on dark bg — reuse same component, colors will show on dark */}
            <div className="opacity-90">
              <Logo size={28} />
            </div>
            <p className="text-sm text-stone-500">English bolna ab aasaan hai.</p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#waitlist" className="hover:text-white transition-colors">Join Waitlist</a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-600">
          <p>&copy; {new Date().getFullYear()} Bolo English. All rights reserved.</p>
          <p>Made with ❤️ for India</p>
        </div>
      </div>
    </footer>
  );
}
