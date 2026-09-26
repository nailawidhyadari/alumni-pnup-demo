const P: Record<string, React.ReactNode> = {
  search: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  pin: (<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  heart: (<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />),
  share: (<><circle cx="6" cy="12" r="2.5" /><circle cx="17" cy="6" r="2.5" /><circle cx="17" cy="18" r="2.5" /><path d="m8.2 10.8 6.6-3.6M8.2 13.2l6.6 3.6" /></>),
  map: (<><path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4Z" /><path d="M9 4v13.5M15 6.5V20" /></>),
  list: (<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />),
  arrow: (<path d="M5 12h14m-6-6 6 6-6 6" />),
  arrowleft: (<path d="M19 12H5m6-6-6 6 6 6" />),
  calendar: (<><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M8 3v4M16 3v4M3.5 10h17" /></>),
  briefcase: (<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 13h18" /></>),
  check: (<path d="m5 12.5 4.5 4.5L19 7.5" />),
  close: (<path d="M6 6l12 12M18 6 6 18" />),
  menu: (<path d="M4 7h16M4 12h16M4 17h16" />),
  locate: (<><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" /></>),
  wa: (<><path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8L4 20Z" /><path d="M9 9c.3 2.8 2.4 4.9 5.3 5.5l1-1.2-1.9-1-.8.7c-.8-.3-1.7-1.2-2-2l.7-.8-1-1.9L9 9Z" /></>),
  star: (<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5Z" />),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></>),
  book: (<><path d="M4 5.5C4 4.7 4.7 4 5.5 4H19v14H5.5A1.5 1.5 0 0 0 4 19.5v-14Z" /><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H19v-3" /></>),
  users: (<><circle cx="9" cy="8.5" r="3.2" /><path d="M3 20c.4-3.4 2.8-5.4 6-5.4s5.6 2 6 5.4M16 5.6a3.2 3.2 0 0 1 0 5.8M18 14.9c1.7.7 2.8 2.3 3 4.6" /></>),
  download: (<path d="M12 4v11m-5-4.5 5 5 5-5M5 20h14" />),
  link: (<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>),
  filter: (<path d="M4 6h16M7 12h10M10 18h4" />),
};

export function Icon({ name, size = 20, className = "" }: { name: keyof typeof P | string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {P[name]}
    </svg>
  );
}
