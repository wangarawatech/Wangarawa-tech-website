import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showRc?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  showRc = true,
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  const brandTextSizes = {
    sm: 'text-sm font-black tracking-tight',
    md: 'text-base sm:text-lg font-black tracking-tight',
    lg: 'text-xl sm:text-2xl font-black tracking-tight',
    xl: 'text-2xl sm:text-3xl font-black tracking-tight',
  }[size];

  const subTextSizes = {
    sm: 'text-[8px] tracking-wider font-bold',
    md: 'text-[9px] sm:text-[10px] tracking-widest font-bold',
    lg: 'text-xs tracking-widest font-bold',
    xl: 'text-sm tracking-widest font-bold',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Wangarawa Tech Circuit 'W' and Golden Globe Emblem */}
      <div className={`relative ${iconSizes} shrink-0`}>
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
        >
          {/* Golden Wireframe Globe on the Upper Right */}
          <g opacity="0.85">
            <circle cx="85" cy="38" r="28" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
            <ellipse cx="85" cy="38" rx="28" ry="12" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
            <ellipse cx="85" cy="38" rx="14" ry="28" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
            <line x1="57" y1="38" x2="113" y2="38" stroke="#D4AF37" strokeWidth="1.2" />
            <line x1="85" y1="10" x2="85" y2="66" stroke="#D4AF37" strokeWidth="1.2" />
          </g>

          {/* Deep Royal Blue 3D Styled 'W' Monogram */}
          <path
            d="M16 28 L36 94 L60 52 L84 94 L104 28"
            stroke={isLight ? '#38BDF8' : '#0B2545'}
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Royal Tech Core */}
          <path
            d="M16 28 L36 94 L60 52 L84 94 L104 28"
            stroke={isLight ? '#0B2545' : '#0F3C6E'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glowing Cyan Circuit Lines & Pulses inside the W */}
          <path
            d="M26 40 L38 80 L58 48 L78 80 L92 40"
            stroke="#00E5FF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />

          {/* Circuit Nodes (Dots) */}
          <circle cx="26" cy="40" r="3" fill="#FFFFFF" stroke="#00E5FF" strokeWidth="1.5" />
          <circle cx="38" cy="80" r="2.5" fill="#00E5FF" />
          <circle cx="58" cy="48" r="3.5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
          <circle cx="78" cy="80" r="2.5" fill="#00E5FF" />
          <circle cx="92" cy="40" r="3" fill="#FFFFFF" stroke="#00E5FF" strokeWidth="1.5" />
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col justify-center leading-none">
          {/* Main Wordmark */}
          <span
            className={`font-black ${brandTextSizes} ${
              isLight ? 'text-white' : 'text-[#0B2545]'
            }`}
          >
            WANGARAWA
          </span>

          {/* Company Subtitle */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`uppercase ${subTextSizes} ${
                isLight ? 'text-slate-300' : 'text-[#0F3C6E]'
              }`}
            >
              GLOBAL TECHNOLOGY LIMITED
            </span>
          </div>

          {/* Official CAC Registration Badge */}
          {showRc && (
            <div className="mt-1">
              <span
                className={`inline-block font-mono text-[9px] px-2 py-0.5 rounded-md font-bold tracking-tight border ${
                  isLight
                    ? 'text-amber-300 bg-white/10 border-amber-400/40'
                    : 'text-[#0B2545] bg-blue-50/80 border-[#0B2545]/30'
                }`}
              >
                RC No 9161655
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
