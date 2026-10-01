import { useEffect, useRef, useState } from "react";

// Mobile "See more" text: grows/shrinks with a smooth Lenis-style ease.
// On sm+ screens the full text always shows (no clamping).
function ExpandableText({ text, expanded, className = "" }) {
  const ref = useRef(null);
  const [heights, setHeights] = useState({ collapsed: 28, full: 28 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const lh = parseFloat(getComputedStyle(el).lineHeight) || 14;
      setHeights({ collapsed: Math.round(lh * 2), full: el.scrollHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [text]);

  const needsToggle = heights.full > heights.collapsed + 2;
  const maxH = expanded ? heights.full : heights.collapsed;

  return (
    <p
      ref={ref}
      style={{ "--h": `${maxH}px` }}
      className={`overflow-hidden max-h-[var(--h)] sm:max-h-none transition-[max-height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        !expanded && needsToggle
          ? "[mask-image:linear-gradient(to_bottom,black_55%,transparent)] sm:[mask-image:none]"
          : ""
      } ${className}`}
    >
      {text}
    </p>
  );
}

export default ExpandableText;
