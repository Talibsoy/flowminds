"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);
    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: isHovering ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.3 }}
        style={{
          width: 12,
          height: 12,
          background: "#A855F7",
          boxShadow: "0 0 12px #A855F7, 0 0 24px rgba(168,85,247,0.4)",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-purple-500/40"
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: isHovering ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
        style={{ width: 40, height: 40 }}
      />
    </>
  );
}
