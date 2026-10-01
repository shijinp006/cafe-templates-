import { Pie, Crust, Pile, Leaves, Cheeseball, Shavings } from "./BuildPieces";

const SESAME = [
  [34, 30, -20], [50, 22, 10], [66, 26, -10], [80, 32, 20], [44, 40, 15], [62, 40, -15],
];

function Bun({ color, plain }) {
  return (
    <>
      <path d="M14 46C14 22 34 10 60 10s46 12 46 36z" fill={color} />
      <path d="M62 10c24 2 44 14 44 36H80c10-12 4-28-18-36z" fill="#000" opacity="0.1" />
      <path d="M22 28c6-10 18-15 30-16" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.35" fill="none" />
      {!plain &&
        SESAME.map(([x, y, r]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="3" ry="5" fill="#FFE9B8" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      <path d="M14 54h92v2a12 12 0 0 1-12 12H26a12 12 0 0 1-12-12z" fill={color} />
      <path d="M14 54h92v4H14z" fill="#000" opacity="0.12" />
    </>
  );
}

function Patty({ color, count = 1, speckle = "#2E1A10" }) {
  const rows = Array.from({ length: count });
  return (
    <>
      {rows.map((_, i) => {
        const y = count === 1 ? 20 : 8 + i * 34;
        return (
          <g key={i}>
            <rect x="12" y={y} width="96" height="32" rx="14" fill={color} />
            <rect x="12" y={y} width="96" height="11" rx="5" fill="#fff" opacity="0.14" />
            {[26, 40, 54, 68, 82, 96].map((x, j) => (
              <circle key={x} cx={x} cy={y + 14 + (j % 3) * 5} r="1.8" fill={speckle} opacity="0.7" />
            ))}
          </g>
        );
      })}
    </>
  );
}

function Chicken() {
  return (
    <>
      <path d="M18 44c-6-18 8-32 30-32 14 0 20 6 36 6 14 0 22 10 18 24-4 14-20 22-42 22S22 58 18 44z" fill="#D9A05B" />
      <path d="M26 26c8-8 20-10 32-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.3" fill="none" />
      {[[36, 34], [52, 28], [68, 36], [84, 30], [44, 48], [62, 50], [80, 46], [94, 38]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.4" fill="#B7793A" opacity="0.8" />
      ))}
    </>
  );
}

function Cheese({ color }) {
  return (
    <>
      <path d="M16 16h88v28l-14 14-14-14-14 14-14-14-14 14-14-14-14 14z" fill={color} />
      <path d="M16 16h88v8H16z" fill="#fff" opacity="0.3" />
      <circle cx="34" cy="30" r="3" fill="#000" opacity="0.08" />
      <circle cx="76" cy="26" r="2.4" fill="#000" opacity="0.08" />
    </>
  );
}

function Lettuce() {
  return (
    <>
      <path d="M10 44c4-16 14-24 26-20 6-8 18-10 26-4 10-6 22-2 26 8 12 0 20 10 14 22-6 6-14 4-20 8-8 6-18 2-24 4s-18 4-26-2c-10-2-26-2-22-16z" fill="#8DB52F" />
      <path d="M14 48c20-8 40-12 92-8" stroke="#C5E07A" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
      <path d="M40 30c8 10 14 18 14 30M78 28c-6 10-10 18-10 28" stroke="#C5E07A" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
    </>
  );
}

function Tomato() {
  return (
    <>
      {[[34, 34, 22], [78, 42, 22]].map(([x, y, r]) => (
        <g key={x}>
          <circle cx={x} cy={y} r={r} fill="#D9482B" />
          <circle cx={x} cy={y} r={r - 5} fill="#E86A4C" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx={x + Math.cos((a * Math.PI) / 180) * 9}
              cy={y + Math.sin((a * Math.PI) / 180) * 9}
              rx="2.2"
              ry="3.6"
              fill="#FFE3A8"
              transform={`rotate(${a + 90} ${x + Math.cos((a * Math.PI) / 180) * 9} ${y + Math.sin((a * Math.PI) / 180) * 9})`}
            />
          ))}
        </g>
      ))}
    </>
  );
}

function Onion() {
  return (
    <>
      {[[60, 40, 30, 2], [60, 40, 22, 2], [60, 40, 14, 2]].map(([x, y, r, w]) => (
        <ellipse key={r} cx={x} cy={y} rx={r + 8} ry={r} fill="none" stroke={r === 22 ? "#EBC8DC" : "#C97AA0"} strokeWidth={w + 1.5} />
      ))}
      <ellipse cx="60" cy="40" rx="6" ry="4" fill="#F4DDE9" />
    </>
  );
}

function Pickles() {
  return (
    <>
      {[[32, 40], [60, 30], [88, 42], [58, 54]].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <circle cx={x} cy={y} r="14" fill="#6E8B3D" />
          <circle cx={x} cy={y} r="9" fill="#A5C257" />
          {[0, 90, 180, 270].map((a) => (
            <circle key={a} cx={x + Math.cos((a * Math.PI) / 180) * 5} cy={y + Math.sin((a * Math.PI) / 180) * 5} r="1.3" fill="#E5F1B8" />
          ))}
        </g>
      ))}
    </>
  );
}

function Jalapeno() {
  return (
    <>
      <path d="M18 22c18-8 50-6 70 14 8 8 14 14 14 22-12 2-22-4-34-14C52 36 34 32 18 36z" fill="#4F7A28" />
      <path d="M22 26c16-4 36-2 54 12" stroke="#8FBF55" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M14 26c-4-4-4-10 2-12" stroke="#3A5C1C" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  );
}

function Avocado() {
  return (
    <>
      <path d="M60 8c16 0 26 18 26 36 0 16-10 28-26 28S34 60 34 44C34 26 44 8 60 8z" fill="#3E5A1C" />
      <path d="M60 14c13 0 21 15 21 30 0 13-8 23-21 23S39 57 39 44c0-15 8-30 21-30z" fill="#C6DD7E" />
      <circle cx="60" cy="48" r="11" fill="#7A4B2A" />
      <circle cx="56" cy="44" r="3" fill="#fff" opacity="0.3" />
    </>
  );
}

function Sauce({ color }) {
  return (
    <>
      <rect x="40" y="26" width="40" height="44" rx="10" fill={color} stroke="#2B2D42" strokeOpacity="0.12" strokeWidth="1.5" />
      <rect x="48" y="12" width="24" height="16" rx="4" fill={color} stroke="#2B2D42" strokeOpacity="0.12" strokeWidth="1.5" />
      <rect x="54" y="4" width="12" height="10" rx="3" fill="#FFFDF9" stroke="#2B2D42" strokeOpacity="0.2" strokeWidth="1.5" />
      <rect x="46" y="38" width="28" height="18" rx="4" fill="#FFFDF9" opacity="0.9" />
      <path d="M52 47h16" stroke="#2B2D42" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function Bacon() {
  return (
    <>
      {[22, 40, 58].map((y, i) => (
        <path
          key={y}
          d={`M10 ${y}c10-8 18 8 28 0s18 8 28 0 18 8 28 0 12 4 16 0`}
          fill="none"
          stroke={i === 1 ? "#C1594A" : "#B5483A"}
          strokeWidth="9"
          strokeLinecap="round"
        />
      ))}
      {[22, 40, 58].map((y) => (
        <path key={`f${y}`} d={`M14 ${y - 1}c10-8 18 8 28 0s18 8 28 0 18 8 28 0`} fill="none" stroke="#F4C9B8" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      ))}
    </>
  );
}

function Egg() {
  return (
    <>
      <path d="M20 40c0-16 16-26 36-26 14 0 20 8 34 10 14 2 20 14 12 26-8 12-24 14-40 14S20 56 20 40z" fill="#FFF8EC" stroke="#E8D9C0" strokeWidth="1.5" />
      <circle cx="58" cy="40" r="14" fill="#F4A800" />
      <circle cx="53" cy="35" r="4" fill="#fff" opacity="0.4" />
    </>
  );
}

function Rings() {
  return (
    <>
      {[[36, 44], [64, 34], [86, 48]].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="17" fill="none" stroke="#C98B3E" strokeWidth="11" />
          <circle cx={x} cy={y} r="17" fill="none" stroke="#E8B26A" strokeWidth="6" />
        </g>
      ))}
    </>
  );
}

export default function BuildGraphic({ id, color, className = "" }) {
  let art;
  switch (id) {
    case "brioche":
    case "sesame":
    case "wheat":
      art = <Bun color={color} />;
      break;
    case "charcoal":
      art = <Bun color={color} plain />;
      break;
    case "beef":
      art = <Patty color="#5E3B27" />;
      break;
    case "double":
      art = <Patty color="#5E3B27" count={2} />;
      break;
    case "plant":
      art = <Patty color="#7A8F3E" speckle="#46571F" />;
      break;
    case "chicken":
      art = <Chicken />;
      break;
    case "cheddar":
    case "swiss":
    case "pepper":
    case "vegan":
      art = <Cheese color={color} />;
      break;
    case "lettuce":
      art = <Lettuce />;
      break;
    case "tomato":
      art = <Tomato />;
      break;
    case "onion":
      art = <Onion />;
      break;
    case "pickles":
      art = <Pickles />;
      break;
    case "jalapeno":
      art = <Jalapeno />;
      break;
    case "avocado":
      art = <Avocado />;
      break;
    case "ember":
    case "garlic":
    case "bbq":
    case "hot":
      art = <Sauce color={color} />;
      break;
    case "bacon":
      art = <Bacon />;
      break;
    case "egg":
      art = <Egg />;
      break;
    case "rings":
      art = <Rings />;
      break;
    case "sz-s":
      art = <Pie crust={color} size={22} withToppings />;
      break;
    case "sz-m":
      art = <Pie crust={color} size={30} withToppings />;
      break;
    case "sz-l":
      art = <Pie crust={color} size={37} withToppings />;
      break;
    case "thin":
    case "thick":
    case "stuffed":
      art = <Crust id={id} color={color} />;
      break;
    case "pz-tomato":
    case "pz-white":
    case "pz-bbq":
    case "sd-caesar":
    case "sd-vinai":
    case "sd-ranch":
      art = <Sauce color={color} />;
      break;
    case "mozzarella":
      art = <Cheeseball color={color} />;
      break;
    case "parmesan":
      art = <Shavings />;
      break;
    case "romaine":
    case "spinach":
    case "mixed":
      art = <Leaves color={color} />;
      break;
    case "pepperoni":
    case "mushroom":
    case "olives":
    case "peppers":
    case "corn":
    case "pineapple":
    case "basil":
    case "cucumber":
    case "croutons":
    case "falafel":
    case "tofu":
    case "grilled":
      art = <Pile id={id} />;
      break;
    default:
      art = <circle cx="60" cy="40" r="24" fill={color} />;
  }
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true">
      {art}
    </svg>
  );
}
