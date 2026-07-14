/**
 * Tiny inline SVG icons (Feather-style, 24×24, currentColor stroke).
 * Kept dependency-free on purpose — a whole icon library for ~7 glyphs is
 * exactly the kind of weight this app doesn't need.
 */
function Ic({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="ic"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const IconNew = () => (
  <Ic>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </Ic>
);

export const IconOpen = () => (
  <Ic>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </Ic>
);

export const IconSave = () => (
  <Ic>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Ic>
);

export const IconPaste = () => (
  <Ic>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </Ic>
);

export const IconSearch = () => (
  <Ic>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Ic>
);

export const IconReaction = () => (
  <Ic>
    <path d="M9 2v6l-4.6 8.5A2 2 0 0 0 6.2 20h11.6a2 2 0 0 0 1.8-3.5L15 8V2" />
    <line x1="8" y1="2" x2="16" y2="2" />
    <line x1="7" y1="15" x2="17" y2="15" />
  </Ic>
);

export const IconReagent = () => (
  <Ic>
    <path d="M12.9 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4A2 2 0 0 1 2 16.77V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" />
    <polyline points="2.32 6.16 12 11 21.68 6.16" />
    <line x1="12" y1="22.76" x2="12" y2="11" />
  </Ic>
);

export const IconDoc = () => (
  <Ic>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </Ic>
);

/** Benzene-ring brand mark. */
export const IconBrand = () => (
  <svg
    className="brand-mark"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--accent)"
    strokeWidth="2"
    strokeLinejoin="round"
    aria-hidden
  >
    <polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);
