export default function Logo({ size = 36 }: { size?: number }) {
  const w = Math.round(size * 2.1);
  const h = size;

  return (
    <svg viewBox="0 0 210 100" width={w} height={h} fill="none">
      <defs>
        <linearGradient id="fm-grad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%"   stopColor="#3B82F6" />
          <stop offset="48%"  stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="fm-left" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%"   stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="fm-right" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%"   stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {/* Main infinity path */}
      <path
        d="M 105,50
           C 105,22 85,8 62,8
           C 39,8 15,24 15,50
           C 15,76 39,92 62,92
           C 85,92 105,78 105,50
           C 105,22 125,8 148,8
           C 171,8 195,24 195,50
           C 195,76 171,92 148,92
           C 125,92 105,78 105,50"
        stroke="url(#fm-grad)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left loop — 1 branch + hollow node */}
      <line
        x1="88" y1="44"
        x2="56" y2="27"
        stroke="#3B82F6"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="52" cy="24" r="5.5" stroke="#3B82F6" strokeWidth="2.8" fill="none" />

      {/* Right loop — 2 branches + hollow nodes */}
      <line
        x1="122" y1="44"
        x2="158" y2="27"
        stroke="#A855F7"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="163" cy="24" r="5.5" stroke="#A855F7" strokeWidth="2.8" fill="none" />

      <line
        x1="122" y1="56"
        x2="158" y2="68"
        stroke="#A855F7"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="163" cy="72" r="5.5" stroke="#A855F7" strokeWidth="2.8" fill="none" />

      {/* Center dot */}
      <circle cx="105" cy="50" r="10" fill="#6D28D9" />
    </svg>
  );
}
