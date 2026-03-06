"use client";

import { motion } from "framer-motion";
import NameBlock from "./NameBlock";

interface TeamContainerProps {
  teamName: string;
  members: string[];
  color: string;
  index: number;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function TeamContainer({ teamName, members, color, index }: TeamContainerProps) {
  const isLight = isLightColor(color);
  const headerTextColor = isLight ? '#1A1A1A' : '#FFFFFF';

  return (
    <motion.div
      className="flex flex-col overflow-hidden"
      style={{
        border: '3px solid #1A1A1A',
        borderRadius: '4px',
        boxShadow: '4px 4px 0px #1A1A1A',
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.06 }}
      variants={containerVariants}
    >
      {/* Team header */}
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{
          backgroundColor: color,
          color: headerTextColor,
          borderBottom: '3px solid #1A1A1A',
        }}
      >
        <span className="text-xs font-black uppercase tracking-widest opacity-70">
          Team {index + 1}
        </span>
        <span className="text-base font-black truncate">{teamName}</span>
        <span
          className="ml-auto text-xs font-bold px-2 py-0.5 rounded"
          style={{
            backgroundColor: 'rgba(0,0,0,0.15)',
            color: headerTextColor,
          }}
        >
          {members.length}
        </span>
      </div>

      {/* Members grid */}
      <div
        className="p-3 grid gap-2"
        style={{ backgroundColor: '#F5F5F5' }}
      >
        {members.length === 0 ? (
          <p className="text-xs text-center py-2" style={{ color: '#999' }}>
            No members
          </p>
        ) : (
          members.map((name) => (
            <NameBlock key={name} name={name} color={color} />
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
