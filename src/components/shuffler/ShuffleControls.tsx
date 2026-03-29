import { legoTheme } from "@/styles/themes/lego";

interface ShuffleControlsProps {
  onShuffle: () => void;
  onCopy: () => void;
  onReset: () => void;
  onShowTeams: () => void;
  onExport: () => void;
  onHistoryBack?: () => void;
  onHistoryForward?: () => void;
  hasResult: boolean;
  canGoBack?: boolean;
  canGoForward?: boolean;
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
  onExport,
  onHistoryBack,
  onHistoryForward,
  hasResult,
  canGoBack = false,
  canGoForward = false,
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
          {/* History navigation */}
          <div className="flex gap-2">
            <button
              onClick={onHistoryBack}
              disabled={!canGoBack}
              aria-label="Previous shuffle"
              style={{
                ...legoButton.base,
                flex: 1,
                backgroundColor: canGoBack ? legoTheme.colors.orange : "#ccc",
                color: canGoBack ? legoTheme.colors.white : "#888",
                boxShadow: canGoBack ? legoTheme.shadow : "2px 2px 0px #999",
                cursor: canGoBack ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => {
                if (canGoBack) e.currentTarget.style.backgroundColor = "#D4681A";
              }}
              onMouseLeave={(e) => {
                if (canGoBack) e.currentTarget.style.backgroundColor = legoTheme.colors.orange;
              }}
              onMouseDown={(e) => {
                if (canGoBack) e.currentTarget.style.transform = "translate(2px, 2px)";
              }}
              onMouseUp={(e) => {
                if (canGoBack) e.currentTarget.style.transform = "";
              }}
            >
              ← Prev
            </button>
            <button
              onClick={onHistoryForward}
              disabled={!canGoForward}
              aria-label="Next shuffle"
              style={{
                ...legoButton.base,
                flex: 1,
                backgroundColor: canGoForward ? legoTheme.colors.orange : "#ccc",
                color: canGoForward ? legoTheme.colors.white : "#888",
                boxShadow: canGoForward ? legoTheme.shadow : "2px 2px 0px #999",
                cursor: canGoForward ? "pointer" : "not-allowed",
              }}
              onMouseEnter={(e) => {
                if (canGoForward) e.currentTarget.style.backgroundColor = "#D4681A";
              }}
              onMouseLeave={(e) => {
                if (canGoForward)
                  e.currentTarget.style.backgroundColor = legoTheme.colors.orange;
              }}
              onMouseDown={(e) => {
                if (canGoForward) e.currentTarget.style.transform = "translate(2px, 2px)";
              }}
              onMouseUp={(e) => {
                if (canGoForward) e.currentTarget.style.transform = "";
              }}
            >
              Next →
            </button>
          </div>

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
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = legoTheme.colors.green)
              }
              onMouseDown={(e) => (e.currentTarget.style.transform = "translate(2px, 2px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "")}
            >
              Show Teams
            </button>
          </div>

          {/* Download as image */}
          <button
            onClick={onExport}
            aria-label="Download teams as PNG image"
            style={{
              ...legoButton.base,
              width: "100%",
              backgroundColor: legoTheme.colors.orange,
              color: legoTheme.colors.white,
              boxShadow: legoTheme.shadow,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c96310")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = legoTheme.colors.orange)
            }
            onMouseDown={(e) => (e.currentTarget.style.transform = "translate(2px, 2px)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "")}
          >
            Download as Image
          </button>

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
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = legoTheme.colors.white)
            }
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
