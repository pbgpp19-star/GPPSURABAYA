export function WhatsAppIcon({
  className = "h-5 w-5",
  bubble = "#fff",
  handset = "#00A19D",
}: {
  className?: string;
  bubble?: string;
  handset?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* bubble WA */}
      <circle cx="12" cy="11" r="9" fill={bubble} />
      <polygon points="7.5,18.5 4.5,21 6.5,17" fill={bubble} />
      {/* gagang telepon */}
      <g transform="translate(6.6,6.6) scale(0.45)">
        <path
          d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"
          fill={handset}
        />
      </g>
    </svg>
  );
}

export function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  );
}

/* Ikon strip keunggulan — multicolor brand seperti desain */

export function CommunityIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" strokeLinecap="round" aria-hidden="true">
      {/* kiri - orange kecil di belakang */}
      <circle cx="5" cy="9" r="1.9" fill="#F58220" />
      <path d="M2.2 18.5c.4-2.4 1.5-3.7 2.8-3.7s2.4 1.3 2.8 3.7" stroke="#F58220" strokeWidth="1.8" />
      {/* kanan - hijau kecil di belakang */}
      <circle cx="19" cy="9" r="1.9" fill="#35B26F" />
      <path d="M16.2 18.5c.4-2.4 1.5-3.7 2.8-3.7s2.4 1.3 2.8 3.7" stroke="#35B26F" strokeWidth="1.8" />
      {/* tengah - teal besar di depan */}
      <circle cx="12" cy="6.8" r="2.9" fill="#0AA5A0" />
      <path d="M6.5 19c.7-3.6 2.8-5.5 5.5-5.5s4.8 1.9 5.5 5.5" stroke="#0AA5A0" strokeWidth="1.8" />
    </svg>
  );
}

export function ShuttlecockIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" strokeLinecap="round" aria-hidden="true">
      <g transform="rotate(-18 12 12)">
        {/* gabus orange */}
        <path d="M10.1 16.6 9.6 18.8a2.4 2.4 0 0 0 4.8 0l-.5-2.2z" fill="#F58220" />
        {/* rok teal */}
        <g stroke="#0AA5A0" strokeWidth="1.8">
          <line x1="10" y1="16.5" x2="7.5" y2="7" />
          <line x1="12" y1="16.5" x2="12" y2="5" />
          <line x1="14" y1="16.5" x2="16.5" y2="7" />
          <path d="M7.5 7c1.4-1 2.9-1.5 4.5-1.5s3.1.5 4.5 1.5" />
          <path d="M8.6 11.5c1-.7 2.2-1 3.4-1s2.4.3 3.4 1" />
        </g>
      </g>
    </svg>
  );
}

export function ChartIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="14" width="3.2" height="6" rx="1" fill="#F58220" />
      <rect x="8" y="11" width="3.2" height="9" rx="1" fill="#FFC531" />
      <rect x="12.5" y="8" width="3.2" height="12" rx="1" fill="#35B26F" />
      <rect x="17" y="4.5" width="3.2" height="15.5" rx="1" fill="#0AA5A0" />
    </svg>
  );
}

export function HandshakeIcon({ className = "h-12 w-12" }: { className?: string }) {
  // Bentuk: Lucide "handshake" (ISC license), warna disesuaikan ke teal brand.
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="#0AA5A0"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}

export function TrophyIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="#0AA5A0"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 5.5H4.5a2.5 2.5 0 0 0 2.7 4.6" />
      <path d="M17 5.5h2.5a2.5 2.5 0 0 1-2.7 4.6" />
      <line x1="12" y1="14" x2="12" y2="17" />
      <path d="M9 17h6l.8 3H8.2L9 17z" fill="#F58220" stroke="#F58220" />
    </svg>
  );
}

/* Ikon panel Tentang — teal penuh seperti desain */

export function StripedCircleIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="#0AA5A0" stroke="none" />
      <line x1="9.5" y1="5" x2="9.5" y2="19" />
      <line x1="12" y1="4.5" x2="12" y2="19.5" />
      <line x1="14.5" y1="5" x2="14.5" y2="19" />
    </svg>
  );
}

export function FilledStarIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2l2.35 6.76 7.15.14-5.7 4.34 2.1 6.86L12 16l-5.9 4.1 2.1-6.86-5.7-4.34 7.15-.14z"
        fill="#0AA5A0"
      />
    </svg>
  );
}

export function MiniBarsIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4" y="15" width="3" height="4" rx="0.8" fill="#0AA5A0" />
      <rect x="8.5" y="12" width="3" height="7" rx="0.8" fill="#0AA5A0" />
      <rect x="13" y="9" width="3" height="10" rx="0.8" fill="#0AA5A0" />
      <rect x="17.5" y="5.5" width="3" height="13.5" rx="0.8" fill="#0AA5A0" />
    </svg>
  );
}

export function LocationPinIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z"
        fill="#F5A623"
      />
      <circle cx="12" cy="9" r="2.6" fill="#fff" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" />
    </svg>
  );
}
