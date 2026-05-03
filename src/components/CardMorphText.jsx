import { useEffect, useState } from "react";

export function CardMorphText({ text, className = "", darkMode = false, as = "div" }) {
  const Tag = as;
  const [renderText, setRenderText] = useState(text);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);

    const t1 = setTimeout(() => {
      setRenderText(text);
      setShow(true);
    }, 120);

    return () => clearTimeout(t1);
  }, [text]);

  return (
    <Tag
      className={className}
      style={{
        color: darkMode ? "#f5f5f5" : "#111111",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0px)" : "translateY(8px)",
        filter: show ? "blur(0px)" : "blur(8px)",
        transition: "opacity 500ms ease, transform 500ms ease, filter 500ms ease",
        willChange: "opacity, transform, filter",
      }}
    >
      {renderText}
    </Tag>
  );
}