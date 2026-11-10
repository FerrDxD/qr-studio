import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

function Base({ size = 24, children, ...rest }: IconProps & { children?: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Sun = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </Base>
);

export const Moon = (props: IconProps) => (
  <Base {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79" />
  </Base>
);

export const Upload = (props: IconProps) => (
  <Base {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="13" />
  </Base>
);

export const Clock = (props: IconProps) => (
  <Base {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Base>
);

export const Link = (props: IconProps) => (
  <Base {...props}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-1.42-1.42l-3 3a5 5 0 0 0-1.02 0.94" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 1.42 1.42l3-3a5 5 0 0 0 1.02-0.94" />
  </Base>
);

export const Mail = (props: IconProps) => (
  <Base {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2" />
    <polyline points="22,6 12,13 2,6" />
  </Base>
);

export const Smartphone = (props: IconProps) => (
  <Base {...props}>
    <rect x="3" y="3" width="18" height="28" rx="2" ry="2" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
    <line x1="12" y1="21" x2="12.01" y2="21" />
  </Base>
);

export const Wifi = (props: IconProps) => (
  <Base {...props}>
    <path d="M5.12 12.93a3 3 0 0 1 3.76 0" />
    <path d="M2 15.59a7 7 0 0 1 8.75 0" />
    <path d="M10.88 10.12a1 1 0 0 1 1.24 0" />
    <line x1="12" y1="2" x2="12" y2="5" />
  </Base>
);

export const Users = (props: IconProps) => (
  <Base {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Base>
);

export const Palette = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 2c2 0 2 4 2.5 5 -0.5 -1 -1 -1 -2 -1 -1 1 -2 3 -2 4.5 0 2 2 3 4 3 -1 -1 -2 -3 -1 -4 0 0 -0.5 -4 -3 -4 -1 1 -1 3 -1 5" />
    <circle cx="10.5" cy="7.5" r="1.5" />
  </Base>
);

export const Layers = (props: IconProps) => (
  <Base {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </Base>
);

export const EyeOff = (props: IconProps) => (
  <Base {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </Base>
);

export const Image = (props: IconProps) => (
  <Base {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </Base>
);

export const Plus = (props: IconProps) => (
  <Base {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Base>
);

export const Trash2 = (props: IconProps) => (
  <Base {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </Base>
);

export const AlertTriangle = (props: IconProps) => (
  <Base {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Base>
);

export const ShieldAlert = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 1c2.4 0 4.4 0 6 0.4C19 2.4 21 5.5 21 11c0 1.4-.2 2.7-.6 4l-2 6c-0.2 0.6-0.8 1-1.4 1h-7c-0.6 0-1.2-0.4-1.4-1l-2-6c-0.4-1.3-0.6-2.6-0.6-4C3 5.5 5 2.4 6 1.4 7.6 1 9.6 1 12 1" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Base>
);

export const ArrowUpDown = (props: IconProps) => (
  <Base {...props}>
    <line x1="12" y1="4" x2="12" y2="20" />
    <path d="m5 10 7-7 7 7" />
    <path d="m19 14-7 7-7-7" />
  </Base>
);

export const CheckCircle2 = (props: IconProps) => (
  <Base {...props}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10" />
    <polyline points="9 11 12 14 22 4" />
  </Base>
);

export const Download = (props: IconProps) => (
  <Base {...props}>
    <polyline points="12 13 17 8 15 8 15 2 7 2 7 8 5 8" />
    <path d="M12 3v12" />
  </Base>
);

export const Clipboard = (props: IconProps) => (
  <Base {...props}>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h-9a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
  </Base>
);

export const Save = (props: IconProps) => (
  <Base {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Base>
);
