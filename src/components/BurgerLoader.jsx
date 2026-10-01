const SESAME = [
  [108, 82, -20], [138, 70, 10], [168, 76, -10], [198, 70, 12], [226, 84, 20],
  [124, 104, 15], [158, 100, -15], [192, 102, 10],
];

const LAYERS = [
  { name: "bottom", delay: "0s" },
  { name: "patty", delay: "0.25s" },
  { name: "lettuce", delay: "0.5s" },
  { name: "tomato", delay: "0.75s" },
  { name: "top", delay: "1s" },
];

function Layer({ name, children }) {
  const layer = LAYERS.find((l) => l.name === name);
  return (
    <g className="burger-layer" style={{ animationDelay: layer.delay }}>
      {children}
    </g>
  );
}

function BurgerLoader({ className = "" }) {
  return (
    <svg viewBox="0 0 320 260" className={className} role="img" aria-label="Loading burger">
      <ellipse cx="160" cy="236" rx="104" ry="9" fill="#000" opacity="0.15" />

      <Layer name="bottom">
        <path d="M58 188h204v14a30 30 0 0 1-30 30H88a30 30 0 0 1-30-30z" fill="#FFC266" />
        <path d="M160 188h102v14a30 30 0 0 1-30 30h-72z" fill="#F5A94F" opacity="0.7" />
        <path d="M58 188h204v10l-62 6a14 14 0 0 0-16 8l-10-10-10 10a14 14 0 0 0-16-8l-30-6z" fill="#FFC83D" />
      </Layer>

      <Layer name="patty">
        <rect x="58" y="160" width="204" height="30" rx="12" fill="#5E5B34" />
        {[80, 104, 128, 152, 176, 200, 224, 244].map((x, i) => (
          <circle key={x} cx={x} cy={170 + (i % 3) * 6} r="1.6" fill="#3F3D22" />
        ))}
      </Layer>

      <Layer name="lettuce">
        <path
          d="M46 152c8-8 18-6 26-2 10 6 20 6 30 0s20-6 30 0 20 6 30 0 20-6 30 0 20 6 30 0c8-5 18-6 28 2 4 6 0 14-8 16-12 4-22 2-32 6-10 4-22 2-32-2s-22-4-32 0-22 6-32 2-22-2-32 2c-10 4-24 0-28-8-2-4-2-10 0-16z"
          fill="#8DB52F"
        />
      </Layer>

      <Layer name="tomato">
        <rect x="56" y="136" width="208" height="20" rx="10" fill="#D9482B" />
        <rect x="56" y="136" width="208" height="8" rx="4" fill="#fff" opacity="0.08" />
      </Layer>

      <Layer name="top">
        <path d="M54 136c0-52 48-80 106-80s106 28 106 80z" fill="#FFC266" />
        <path d="M166 56c58 2 100 28 100 80h-72c14-18 6-60-28-80z" fill="#F5A94F" opacity="0.75" />
        {SESAME.map(([x, y, r]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="6" ry="10" fill="#FFE3A8" opacity="0.85" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </Layer>
    </svg>
  );
}

export default BurgerLoader;
