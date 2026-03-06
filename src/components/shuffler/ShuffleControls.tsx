import { legoTheme } from "@/styles/themes/lego";

interface ShuffleControlsProps {
  onShuffle: () => void;
  onCopy: () => void;
  onReset: () => void;
  onShowTeams: () => void;
  hasResult: boolean;
  disabled?: boolean;
  copyConfirmed?: boolean;
}

const legoButton = {
  base: {
    border: `${legoTheme.borderWidth} solid ${legoTheme.colors.border}`,
    borderRadius: legoTheme.borderRadius,
    fontFamily: legoTheme.fontFamily,
    fontWeight: 900,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    padding: "12px 24px",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.1s",
  },
};

export default function ShuffleControls({
  onShuffle,
  onCopy,
  onReset,
  onShowTeams,
  hasResult,
  disabled = false,
  copyConfirmed = false,
}: ShuffleControlsProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onShuffle}
        disabled={disabled}
        style={{
          ...legoButton.base,
          width: "100%",
          backgroundColor: disabled ? "#ccc" : legoTheme.colors.red,
          color: disabled ? "#888" : legoTheme.colors.white,
          boxShadow: disabled ? "2px 2px 0px #999" : legoTheme.shadow,
        }}
        onMouseEnter={(e) => {
          if (!disabled) e.currentTarget.style.backgroundColor = "#C0241A";
        }}
        onMouseLeave={(e) => {
          if (!disabled) e.currentTarget.style.backgroundColor = legoTheme.colors.red;
        }}
        onMouseDown={(e) => {
          if (!disabled) e.currentTarget.style.transform = "translate(2px, 2px)";
        }}
        onMouseUp={(e) => {
          if (!disabled) e.currentTarget.style.transform = "";
        }}
      >
        {hasResult ? "Reshuffle" : "Create Teams"}
      </button>

      {hasResult && (
        <>
          {/* Copy + Show Teams side by side */}
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              style={{
                ...legoButton.base,
                flex: 1,
                backgroundColor: legoTheme.colors.blue,
                color: legoTheme.colors.white,
                boxShadow: legoTheme.shadow,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005a9a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = legoTheme.colors.blue)}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translate(2px, 2px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "")}
            >
              <span aria-live="polite">{copyConfirmed ? "Copied! ✓" : "Copy Results"}</span>
            </button>

            <button
              onClick={onShowTeams}
              aria-label="Open presentation view"
              style={{
                ...legoButton.base,
                flex: 1,
                backgroundColor: legoTheme.colors.green,
                color: legoTheme.colors.white,
                boxShadow: legoTheme.shadow,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#008040")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = legoTheme.colors.green)}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translate(2px, 2px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "")}
            >
              Show Teams
            </button>
          </div>

          <button
            onClick={onReset}
            style={{
              ...legoButton.base,
              width: "100%",
              backgroundColor: legoTheme.colors.white,
              color: legoTheme.colors.black,
              boxShadow: "2px 2px 0px #ccc",
              border: `2px solid #ccc`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = legoTheme.colors.white)}
            onMouseDown={(e) => (e.currentTarget.style.transform = "translate(2px, 2px)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "")}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}
