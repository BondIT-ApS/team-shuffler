import { legoTheme } from "@/styles/themes/lego";

interface TeamCountSelectorProps {
  value: number;
  onChange: (value: number) => void;
  useTeamNames: boolean;
  onToggleTeamNames: (value: boolean) => void;
}

export default function TeamCountSelector({
  value,
  onChange,
  useTeamNames,
  onToggleTeamNames,
}: TeamCountSelectorProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed)) {
      onChange(Math.min(20, Math.max(2, parsed)));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="team-count"
        className="text-sm font-black uppercase tracking-widest"
        style={{ color: legoTheme.colors.black }}
      >
        Number of teams
      </label>
      <div className="flex items-center gap-4 flex-wrap">
        <input
          id="team-count"
          aria-label="Number of teams"
          type="number"
          min={2}
          max={20}
          value={value}
          onChange={handleChange}
          className="w-24 p-2 text-sm font-bold"
          style={{
            border: `${legoTheme.borderWidth} solid ${legoTheme.colors.border}`,
            borderRadius: legoTheme.borderRadius,
            boxShadow: legoTheme.shadow,
            backgroundColor: legoTheme.colors.white,
            outline: "none",
            fontFamily: legoTheme.fontFamily,
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = `4px 4px 0px ${legoTheme.colors.blue}`;
            e.target.style.borderColor = legoTheme.colors.blue;
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = legoTheme.shadow;
            e.target.style.borderColor = legoTheme.colors.border;
          }}
        />

        <label
          className="flex items-center gap-2 cursor-pointer select-none"
          htmlFor="use-team-names"
        >
          <div className="relative">
            <input
              id="use-team-names"
              type="checkbox"
              checked={useTeamNames}
              onChange={(e) => onToggleTeamNames(e.target.checked)}
              className="sr-only"
              aria-label="Use team names (Alpha, Bravo…) instead of numbers"
            />
            {/* LEGO-style checkbox */}
            <div
              className="flex items-center justify-center"
              style={{
                width: 24,
                height: 24,
                border: `3px solid ${legoTheme.colors.black}`,
                borderRadius: legoTheme.borderRadius,
                backgroundColor: useTeamNames ? legoTheme.colors.yellow : legoTheme.colors.white,
                boxShadow: useTeamNames ? "2px 2px 0px #1A1A1A" : "2px 2px 0px #ccc",
                transition: "all 0.1s",
              }}
              aria-hidden="true"
            >
              {useTeamNames && (
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    color: legoTheme.colors.black,
                    lineHeight: 1,
                  }}
                >
                  ✓
                </span>
              )}
            </div>
          </div>
          <span
            className="text-sm font-bold uppercase tracking-wide"
            style={{ color: legoTheme.colors.black }}
          >
            Team names
          </span>
        </label>
      </div>
    </div>
  );
}
