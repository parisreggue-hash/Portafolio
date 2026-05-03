import { useEffect, useState } from "react";

export function MorphingText({
  text,
  className = "",
  darkMode = false,
  as = "div",
}) {
  const Tag = as;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, [text]);

  return (
    <Tag
      className={className}
      style={{
        color: darkMode ? "#f5f5f5" : "#111111",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px) scale(1)" : "translateY(10px) scale(0.995)",
        filter: visible ? "blur(0px)" : "blur(8px)",
        transition: "opacity 700ms ease, transform 700ms ease, filter 700ms ease",
        willChange: "opacity, transform, filter",
      }}
    >
      {text}
    </Tag>
  );
}