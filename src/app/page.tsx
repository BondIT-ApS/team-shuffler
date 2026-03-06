"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NameInput from "@/components/shuffler/NameInput";
import TeamCountSelector from "@/components/shuffler/TeamCountSelector";
import ShuffleControls from "@/components/shuffler/ShuffleControls";
import { useShuffler } from "@/hooks/useShuffler";

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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pb-8">
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
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-400">
            Teams will appear here
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
