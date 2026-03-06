"use client";

import { motion, useReducedMotion } from "framer-motion";

interface NameBlockProps {
  name: string;
  color: string;
  locked?: boolean;
  onToggleLock?: () => void;
}

export default function NameBlock({ name, color, locked, onToggleLock }: NameBlockProps) {
  const isLight = isLightColor(color);
  const textColor = isLight ? "#1A1A1A" : "#FFFFFF";
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      layoutId={name}
      className="relative flex items-center justify-center px-3 py-2 text-sm font-bold text-center leading-tight select-none"
      style={{
        backgroundColor: locked ? color + "CC" : color,
        color: textColor,
        border: locked ? "3px dashed #1A1A1A" : "3px solid #1A1A1A",
        borderRadius: "4px",
        boxShadow: locked ? "none" : "3px 3px 0px #1A1A1A",
        opacity: locked ? 0.8 : 1,
      }}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      whileHover={reducedMotion ? undefined : { y: -3 }}
      whileTap={reducedMotion ? undefined : { y: 1 }}
    >
      <span className="truncate max-w-full">{name}</span>
      {onToggleLock && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
          className="absolute top-0.5 right-0.5 text-xs leading-none p-0.5"
          style={{ opacity: locked ? 1 : 0.4, lineHeight: 1 }}
          aria-label={locked ? "Unlock" : "Lock"}
        >
          {locked ? "🔒" : "🔓"}
        </button>
      )}
    </motion.div>
  );
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}
