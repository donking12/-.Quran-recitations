import React from 'react';

interface IconProps {
  className?: string;
}

export const PlayIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.118v3.764a1 1 0 001.555.832l3.197-1.882a1 1 0 000-1.664l-3.197-1.882z" clipRule="evenodd"></path>
  </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1H8zm3 0a1 1 0 00-1 1v4a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" clipRule="evenodd"></path>
  </svg>
);

export const NextIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.555 5.168A1 1 0 003 6.118v7.764a1 1 0 001.555.832l6.394-3.882a1 1 0 000-1.664L4.555 5.168zM15 6a1 1 0 00-1 1v6a1 1 0 102 0V7a1 1 0 00-1-1z"></path>
  </svg>
);

export const PrevIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.445 5.168A1 1 0 0014 6.118v7.764a1 1 0 001.555.832l6.394-3.882a1 1 0 000-1.664l-6.394-3.882zM6 6a1 1 0 00-1 1v6a1 1 0 102 0V7a1 1 0 00-1-1z" transform="translate(-3,0)"></path>
  </svg>
);

export const VolumeUpIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 4a1 1 0 00-2 0v12a1 1 0 102 0V4zM11 4a1 1 0 10-2 0v12a1 1 0 102 0V4zM4 8a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm12 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" transform="scale(0.8) translate(2, 2)"></path>
    <path d="M13.596 3.513a.75.75 0 01.053 1.06L9.833 8.39a.75.75 0 00-.053 1.06l3.816 3.817a.75.75 0 11-1.06 1.06l-3.817-3.816a2.25 2.25 0 010-3.182l3.817-3.817a.75.75 0 011.007-.053z" transform="scale(0.8) translate(10, 2) rotate(180)"></path>
    <path d="M15.93 2.07a.75.75 0 01.106 1.05l-5.333 7.5a.75.75 0 00.106 1.05l5.333 7.5a.75.75 0 11-1.156.976l-5.333-7.5a2.25 2.25 0 010-3.152l5.333-7.5a.75.75 0 011.05-.106z" transform="scale(0.8) translate(6,2) rotate(180)"></path>
  </svg>
);

export const VolumeDownIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4a1 1 0 10-2 0v12a1 1 0 102 0V4zM4 8a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1z" transform="scale(0.8) translate(2,2)"></path>
    <path d="M13.596 3.513a.75.75 0 01.053 1.06L9.833 8.39a.75.75 0 00-.053 1.06l3.816 3.817a.75.75 0 11-1.06 1.06l-3.817-3.816a2.25 2.25 0 010-3.182l3.817-3.817a.75.75 0 011.007-.053z" transform="scale(0.8) translate(10, 2) rotate(180)"></path>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
);

export const SunIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ className = 'w-5 h-5', filled = false }) => (
  <svg className={className} fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.11c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);