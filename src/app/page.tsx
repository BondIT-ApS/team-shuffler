"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NameInput from "@/components/shuffler/NameInput";
import TeamCountSelector from "@/components/shuffler/TeamCountSelector";
import ShuffleControls from "@/components/shuffler/ShuffleControls";
import TeamContainer from "@/components/shuffler/TeamContainer";
import { useShuffler } from "@/hooks/useShuffler";
import { legoTheme } from "@/styles/themes/lego";
import { AnimatePresence, motion } from "framer-motion";

const TEAM_NAMES = [
  "Alpha", "Bravo", "Charlie", "Delta",
  "Echo", "Foxtrot", "Golf", "Hotel",
];

export default function Home() {
  const {
    names,
    setNames,
    teamCount,
    setTeamCount,
    result,
    handleShuffle,
    handleCopy,
    handleReset,
    copyConfirmed,
  } = useShuffler();

  const hasNames = names.trim().length > 0;

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: legoTheme.colors.gray }}>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-8">
        <div className="flex flex-col gap-6">
          <NameInput
            value={names}
            onChange={setNames}
            placeholder={"Alice\nBob\nCharlie\n..."}
          />
          <TeamCountSelector value={teamCount} onChange={setTeamCount} />
          <ShuffleControls
            onShuffle={handleShuffle}
            onCopy={handleCopy}
            onReset={handleReset}
            hasResult={!!result}
            disabled={!hasNames}
            copyConfirmed={copyConfirmed}
          />

          <AnimatePresence mode="wait">
            {result === null ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 text-center text-sm font-bold"
                style={{
                  border: `3px dashed ${legoTheme.colors.black}`,
                  borderRadius: legoTheme.borderRadius,
                  color: "#999",
                  backgroundColor: legoTheme.colors.white,
                }}
              >
                Teams will appear here
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                <p className="text-sm font-black uppercase tracking-widest" style={{ color: legoTheme.colors.black }}>
                  {result.reduce((sum, t) => sum + t.length, 0)} members &mdash; {result.length} teams
                </p>
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
                >
                  {result.map((members, i) => (
                    <TeamContainer
                      key={i}
                      index={i}
                      teamName={TEAM_NAMES[i] ?? `Team ${i + 1}`}
                      members={members}
                      color={legoTheme.teamColors[i % legoTheme.teamColors.length]}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
