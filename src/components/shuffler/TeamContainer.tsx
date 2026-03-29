"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import NameBlock from "./NameBlock";
import DraggableMember from "./DraggableMember";

interface TeamContainerProps {
  teamName: string;
  members: string[];
  color: string;
  index: number;
  lockedNames?: Set<string>;
  onToggleLock?: (name: string) => void;
  showName?: boolean;
  draggable?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function TeamContainer({
  teamName,
  members,
  color,
  index,
  lockedNames,
  onToggleLock,
  showName = true,
  draggable = false,
}: TeamContainerProps) {
  const isLight = isLightColor(color);
  const headerTextColor = isLight ? "#1A1A1A" : "#FFFFFF";
  const reducedMotion = useReducedMotion();

  const displayLabel = showName ? teamName : `Team ${index + 1}`;

  const { setNodeRef, isOver } = useDroppable({ id: `team-${index}` });

  return (
    <motion.div
      role="region"
      aria-label={`Team ${index + 1}${showName ? `: ${teamName}` : ""}`}
      className="flex flex-col overflow-hidden"
      style={{
        border: isOver ? `3px solid ${color}` : "3px solid #1A1A1A",
        borderRadius: "4px",
        boxShadow: isOver ? `0 0 0 3px ${color}55, 4px 4px 0px #1A1A1A` : "4px 4px 0px #1A1A1A",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
      transition={
        reducedMotion
          ? undefined
          : { type: "spring", stiffness: 260, damping: 20, delay: index * 0.06 }
      }
      variants={reducedMotion ? undefined : containerVariants}
    >
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{
          backgroundColor: color,
          color: headerTextColor,
          borderBottom: "3px solid #1A1A1A",
        }}
      >
        {showName && (
          <span className="text-xs font-black uppercase tracking-widest opacity-70">
            Team {index + 1}
          </span>
        )}
        <span className="text-base font-black truncate">{displayLabel}</span>
        <span
          className="ml-auto text-xs font-bold px-2 py-0.5 rounded"
          style={{ backgroundColor: "rgba(0,0,0,0.15)", color: headerTextColor }}
        >
          {members.length}
        </span>
      </div>

      <div
        ref={draggable ? setNodeRef : undefined}
        className="p-3 grid gap-2"
        style={{
          backgroundColor: isOver ? "#EFEFEF" : "#F5F5F5",
          minHeight: "48px",
          transition: "background-color 0.15s",
        }}
      >
        {members.length === 0 ? (
          <p className="text-xs text-center py-2" style={{ color: "#999" }}>
            No members
          </p>
        ) : draggable ? (
          members.map((name, memberIndex) => (
            <DraggableMember
              key={`${index}-${name}-${memberIndex}`}
              id={`${index}:${memberIndex}:${name}`}
              name={name}
              color={color}
              teamIndex={index}
              memberIndex={memberIndex}
              locked={lockedNames?.has(name)}
              onToggleLock={onToggleLock ? () => onToggleLock(name) : undefined}
            />
          ))
        ) : (
          members.map((name) => (
            <NameBlock
              key={name}
              name={name}
              color={color}
              locked={lockedNames?.has(name)}
              onToggleLock={onToggleLock ? () => onToggleLock(name) : undefined}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}
