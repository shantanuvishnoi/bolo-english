export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Speech bubble icon with audio waveform */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* Bubble body */}
        <rect x="2" y="2" width="44" height="32" rx="10" fill="url(#logoGrad)" />
        {/* Bubble tail */}
        <path d="M8 34 L4 46 L22 34 Z" fill="url(#logoGrad)" />
        {/* Waveform bars */}
        <rect x="11" y="14" width="4" height="10" rx="2" fill="white" opacity="0.85" />
        <rect x="18" y="10" width="4" height="16" rx="2" fill="white" />
        <rect x="25" y="12" width="4" height="12" rx="2" fill="white" opacity="0.9" />
        <rect x="32" y="16" width="4" height="6"  rx="2" fill="white" opacity="0.7" />
      </svg>

      {/* Wordmark */}
      <span className="text-xl font-extrabold tracking-tight">
        <span className="text-brand">Bolo</span>
        <span className="text-stone-800"> English</span>
      </span>
    </div>
  );
}
