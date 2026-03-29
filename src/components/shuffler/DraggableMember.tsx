"use client";

import { useDraggable } from "@dnd-kit/core";
import { motion, useReducedMotion } from "framer-motion";

interface DraggableMemberProps {
  id: string;
  name: string;
  color: string;
  teamIndex: number;
  memberIndex: number;
  locked?: boolean;
  onToggleLock?: () => void;
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

export default function DraggableMember({
  id,
  name,
  color,
  locked,
  onToggleLock,
}: DraggableMemberProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });
  const isLight = isLightColor(color);
  const textColor = isLight ? "#1A1A1A" : "#FFFFFF";
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={setNodeRef}
      layoutId={id}
      className="relative flex items-center justify-center px-3 py-2 text-sm font-bold text-center leading-tight select-none"
      style={{
        backgroundColor: locked ? color + "CC" : color,
        color: textColor,
        border: locked ? "3px dashed #1A1A1A" : "3px solid #1A1A1A",
        borderRadius: "4px",
        boxShadow: isDragging ? "none" : locked ? "none" : "3px 3px 0px #1A1A1A",
        opacity: isDragging ? 0.4 : locked ? 0.8 : 1,
        cursor: isDragging ? "grabbing" : "grab",
        touchAction: "none",
      }}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={reducedMotion ? {} : { opacity: isDragging ? 0.4 : 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      {...listeners}
      {...attributes}
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
