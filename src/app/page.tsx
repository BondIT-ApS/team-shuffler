"use client";

import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NameInput from "@/components/shuffler/NameInput";
import TeamCountSelector from "@/components/shuffler/TeamCountSelector";
import ShuffleControls from "@/components/shuffler/ShuffleControls";
import TeamContainer from "@/components/shuffler/TeamContainer";
import { useShuffler } from "@/hooks/useShuffler";
import { legoTheme } from "@/styles/themes/lego";
import { trackEvent } from "@/lib/analytics";
import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const TEAM_NAMES = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel"];

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
    lockedNames,
    toggleLock,
    validation,
    useTeamNames,
    setUseTeamNames,
    canGoBack,
    canGoForward,
    historyBack,
    historyForward,
    moveParticipant,
  } = useShuffler();

  const teamGridRef = useRef<HTMLDivElement>(null);
  const hasNames = names.trim().length > 0;

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !result) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const [fromTeamStr, fromIndexStr] = activeId.split(":");
    const fromTeam = parseInt(fromTeamStr, 10);
    const fromIndex = parseInt(fromIndexStr, 10);

    if (!overId.startsWith("team-")) return;
    const toTeam = parseInt(overId.replace("team-", ""), 10);

    if (fromTeam === toTeam) return;
    moveParticipant(fromTeam, fromIndex, toTeam);
  }

  function handleShowTeams() {
    if (!result) return;
    const payload = {
      teams: result,
      teamNames: TEAM_NAMES,
      useTeamNames,
    };
    // Store in localStorage for local use
    localStorage.setItem("team-shuffler-presentation", JSON.stringify(payload));
    // Also encode into URL so QR code recipients can view without localStorage
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    window.open(`/present?data=${encoded}`, "_blank", "noopener");
    trackEvent("present_teams");
  }

  async function handleExport() {
    if (!teamGridRef.current) return;
    const today = new Date().toISOString().slice(0, 10);
    const filename = `teams-${today}.png`;

    try {
      const dataUrl = await toPng(teamGridRef.current, {
        backgroundColor: legoTheme.colors.gray,
        pixelRatio: 2,
      });

      if (typeof navigator !== "undefined" && navigator.share) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], filename, { type: "image/png" });
        try {
          await navigator.share({ files: [file], title: "Team Shuffler Results" });
          return;
        } catch {
          // Fall through to standard download if share is cancelled or unsupported
        }
      }

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = filename;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  }

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: legoTheme.colors.gray }}>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-8">
        <div className="flex flex-col gap-6">
          <NameInput value={names} onChange={setNames} placeholder={"Alice\nBob\nCharlie\n..."} />
          <TeamCountSelector
            value={teamCount}
            onChange={setTeamCount}
            useTeamNames={useTeamNames}
            onToggleTeamNames={setUseTeamNames}
          />
          <ShuffleControls
            onShuffle={handleShuffle}
            onCopy={handleCopy}
            onReset={handleReset}
            onShowTeams={handleShowTeams}
            onExport={handleExport}
            onHistoryBack={historyBack}
            onHistoryForward={historyForward}
            hasResult={!!result}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            disabled={!hasNames || !!validation.error}
            copyConfirmed={copyConfirmed}
          />

          {validation.error && (
            <div style={{ color: legoTheme.colors.red, fontWeight: "bold", fontSize: "0.85rem" }}>
              ⚠️ {validation.error}
            </div>
          )}
          {validation.warning && !validation.error && (
            <div
              style={{ color: legoTheme.colors.orange, fontWeight: "bold", fontSize: "0.85rem" }}
            >
              ⚠️ {validation.warning}
            </div>
          )}

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
                <p
                  className="text-sm font-black uppercase tracking-widest"
                  style={{ color: legoTheme.colors.black }}
                >
                  {result.reduce((sum, t) => sum + t.length, 0)} members &mdash; {result.length}{" "}
                  teams
                </p>
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                  <div
                    ref={teamGridRef}
                    className="grid gap-4"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
                  >
                    {result.map((members, i) => (
                      <TeamContainer
                        key={i}
                        index={i}
                        teamName={
                          useTeamNames ? (TEAM_NAMES[i] ?? `Team ${i + 1}`) : `Team ${i + 1}`
                        }
                        members={members}
                        color={legoTheme.teamColors[i % legoTheme.teamColors.length]}
                        lockedNames={lockedNames}
                        onToggleLock={toggleLock}
                        showName={useTeamNames}
                        draggable
                      />
                    ))}
                  </div>
                </DndContext>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
