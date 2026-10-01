// Small top-down pieces used on pizza & salad previews, plus the
// card illustrations for pizza / salad options.

export function Piece({ id, x, y, r = 0, s = 1 }) {
  const t = `translate(${x} ${y}) rotate(${r}) scale(${s})`;
  switch (id) {
    case "pepperoni":
      return (
        <g transform={t}>
          <circle r="9" fill="#B8352A" />
          <circle r="9" fill="none" stroke="#8E2219" strokeWidth="1.2" />
          <circle cx="-3" cy="-2" r="1.4" fill="#E26A5A" />
          <circle cx="3" cy="3" r="1.4" fill="#E26A5A" />
        </g>
      );
    case "mushroom":
      return (
        <g transform={t}>
          <path d="M-8 2a8 7 0 0 1 16 0z" fill="#D9C2A0" />
          <rect x="-2.5" y="2" width="5" height="6" rx="2" fill="#EADBC0" />
        </g>
      );
    case "olives":
      return (
        <g transform={t}>
          <circle r="4.2" fill="none" stroke="#2F2F35" strokeWidth="2.6" />
        </g>
      );
    case "peppers":
      return (
        <g transform={t}>
          <path d="M-8 0a8 8 0 0 1 16 0" fill="none" stroke="#4FA03A" strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "onion":
      return (
        <g transform={t}>
          <circle r="6" fill="none" stroke="#C97AA0" strokeWidth="1.8" />
          <circle r="3" fill="none" stroke="#EBC8DC" strokeWidth="1.4" />
        </g>
      );
    case "corn":
      return (
        <g transform={t}>
          <circle r="2.6" fill="#F2C94C" />
        </g>
      );
    case "pineapple":
      return (
        <g transform={t}>
          <rect x="-5" y="-4" width="10" height="8" rx="2" fill="#F6D55C" />
          <rect x="-5" y="-4" width="10" height="3" rx="1.5" fill="#fff" opacity="0.3" />
        </g>
      );
    case "basil":
      return (
        <g transform={t}>
          <ellipse rx="6" ry="3.4" fill="#3F8F3A" />
          <path d="M-5 0h10" stroke="#7DC57A" strokeWidth="0.9" />
        </g>
      );
    case "jalapeno":
      return (
        <g transform={t}>
          <circle r="4.6" fill="#4F7A28" />
          <circle r="2.4" fill="#A6D06B" />
        </g>
      );
    case "cucumber":
      return (
        <g transform={t}>
          <circle r="7" fill="#6FA84A" />
          <circle r="5.2" fill="#BFE08E" />
          <circle r="1.4" fill="#E3F4C0" />
        </g>
      );
    case "tomato":
      return (
        <g transform={t}>
          <circle r="5.6" fill="#D9482B" />
          <circle cx="-1.6" cy="-1.8" r="1.4" fill="#fff" opacity="0.4" />
        </g>
      );
    case "avocado":
      return (
        <g transform={t}>
          <ellipse rx="7" ry="5" fill="#C6DD7E" stroke="#3E5A1C" strokeWidth="1.2" />
        </g>
      );
    case "croutons":
      return (
        <g transform={t}>
          <rect x="-4.5" y="-4.5" width="9" height="9" rx="2" fill="#E0A25A" />
          <rect x="-4.5" y="-4.5" width="9" height="3" rx="1.5" fill="#fff" opacity="0.25" />
        </g>
      );
    case "falafel":
      return (
        <g transform={t}>
          <circle r="7" fill="#A9792F" />
          <circle cx="-2" cy="-2" r="2" fill="#C99A4B" />
        </g>
      );
    case "tofu":
      return (
        <g transform={t}>
          <rect x="-6" y="-6" width="12" height="12" rx="2.5" fill="#F2DFB4" stroke="#D8BE82" strokeWidth="1.2" />
        </g>
      );
    case "grilled":
      return (
        <g transform={t}>
          <rect x="-9" y="-5" width="18" height="10" rx="5" fill="#D9A05B" />
          <path d="M-4 -4l-2 8M2 -4l-2 8M8 -4l-2 8" stroke="#8A5A22" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      );
    case "egg":
      return (
        <g transform={t}>
          <ellipse rx="7" ry="9" fill="#FFF8EC" stroke="#E8D9C0" strokeWidth="1" />
          <circle r="3.6" fill="#F4A800" />
        </g>
      );
    default:
      return null;
  }
}

export function Pie({ crust, size = 34, withToppings }) {
  return (
    <>
      <circle cx="60" cy="40" r={size} fill={crust} />
      <circle cx="60" cy="40" r={size - 6} fill="#D9482B" />
      <circle cx="60" cy="40" r={size - 8} fill="#FFE9A8" opacity="0.85" />
      {withToppings && (
        <>
          <Piece id="pepperoni" x={50} y={34} s={0.9} />
          <Piece id="pepperoni" x={68} y={44} s={0.9} />
          <Piece id="basil" x={62} y={30} r={30} />
        </>
      )}
    </>
  );
}

export function Crust({ id, color }) {
  const thick = id === "thin" ? 4 : id === "thick" ? 11 : 13;
  return (
    <>
      <path d="M14 66L60 10l46 56z" fill={color} />
      <path d={`M${20 + thick * 0.6} ${66 - thick}L60 ${14 + thick * 1.1}l${40 - thick * 0.6} ${52 - thick * 1.1}z`} fill="#D9482B" />
      <path d={`M${24 + thick * 0.6} ${64 - thick}L60 ${22 + thick}l${34 - thick * 0.6} ${42 - thick}z`} fill="#FFE9A8" opacity="0.9" />
      {id === "stuffed" && <path d="M18 62h84" stroke="#FFF3C4" strokeWidth="4" strokeLinecap="round" />}
      <path d="M14 66h92" stroke="#000" strokeOpacity="0.12" strokeWidth="2" />
    </>
  );
}

export function Pile({ id }) {
  const spots = [[34, 44, 0], [60, 34, 25], [86, 46, -20], [48, 58, 40], [74, 22, 10]];
  return (
    <>
      {spots.map(([x, y, r], i) => (
        <Piece key={i} id={id} x={x} y={y} r={r} s={1.5} />
      ))}
    </>
  );
}

export function Leaves({ color }) {
  return (
    <>
      <ellipse cx="60" cy="42" rx="46" ry="26" fill={color} />
      {[[34, 36, -20], [60, 28, 5], [86, 38, 20], [46, 52, 30], [74, 52, -25]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="16" ry="9" fill="#fff" opacity="0.14" transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </>
  );
}

export function Cheeseball({ color }) {
  return (
    <>
      <circle cx="60" cy="40" r="30" fill={color} />
      <circle cx="60" cy="40" r="30" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="2" />
      <ellipse cx="50" cy="30" rx="10" ry="6" fill="#fff" opacity="0.4" />
    </>
  );
}

export function Shavings() {
  return (
    <>
      {[[34, 46, -20], [58, 32, 15], [82, 46, 25], [58, 56, -5]].map(([x, y, r], i) => (
        <path
          key={i}
          d="M-14 4q14-14 28 0l-4 5q-10-8-20 0z"
          fill="#F6E3A8"
          stroke="#E8CF84"
          strokeWidth="1.2"
          transform={`translate(${x} ${y}) rotate(${r})`}
        />
      ))}
    </>
  );
}
