export function  FestivalLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      {/* Background gradient circle */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9d4edd" />
          <stop offset="100%" stopColor="#ff006e" />
        </linearGradient>
      </defs>

      {/* Main stage platform */}
      <rect x="6" y="18" width="28" height="14" rx="2" fill="url(#logoGradient)" opacity="0.9" />

      {/* Stage spotlight beams */}
      <path
        d="M 14 18 L 10 6 L 12 6 L 15 18"
        fill="url(#logoGradient)"
        opacity="0.6"
      />
      <path
        d="M 20 18 L 20 4 L 22 4 L 22 18"
        fill="url(#logoGradient)"
        opacity="0.7"
      />
      <path
        d="M 26 18 L 30 6 L 28 6 L 25 18"
        fill="url(#logoGradient)"
        opacity="0.6"
      />

      {/* Decorative sound waves */}
      <g opacity="0.8">
        <circle cx="20" cy="24" r="2" fill="white" />
        <circle cx="20" cy="24" r="5" fill="none" stroke="white" strokeWidth="0.8" />
        <circle cx="20" cy="24" r="8" fill="none" stroke="white" strokeWidth="0.6" opacity="0.5" />
      </g>

      {/* Accent stars for festive feel */}
      <circle cx="8" cy="10" r="1.2" fill="#ff006e" opacity="0.8" />
      <circle cx="32" cy="8" r="1" fill="#9d4edd" opacity="0.8" />
      <circle cx="36" cy="20" r="0.8" fill="#ff006e" opacity="0.6" />
      <circle cx="4" cy="28" r="1" fill="#9d4edd" opacity="0.7" />
    </svg>
  );
}
