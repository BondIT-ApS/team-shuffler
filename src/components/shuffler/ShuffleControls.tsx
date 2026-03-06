import { legoTheme } from "@/styles/themes/lego";

interface ShuffleControlsProps {
  onShuffle: () => void;
  onCopy: () => void;
  onReset: () => void;
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
    width: "100%",
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
          backgroundColor: disabled ? "#ccc" : legoTheme.colors.red,
          color: disabled ? "#888" : legoTheme.colors.white,
          boxShadow: disabled ? "2px 2px 0px #999" : legoTheme.shadow,
        }}
        onMouseEnter={(e) => {
          if (!disabled) (e.currentTarget.style.backgroundColor = "#C0241A");
        }}
        onMouseLeave={(e) => {
          if (!disabled) (e.currentTarget.style.backgroundColor = legoTheme.colors.red);
        }}
        onMouseDown={(e) => {
          if (!disabled) (e.currentTarget.style.transform = "translate(2px, 2px)");
        }}
        onMouseUp={(e) => {
          if (!disabled) (e.currentTarget.style.transform = "");
        }}
      >
        {hasResult ? "Reshuffle" : "Create Teams"}
      </button>

      {hasResult && (
        <>
          <button
            onClick={onCopy}
            style={{
              ...legoButton.base,
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
            onClick={onReset}
            style={{
              ...legoButton.base,
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
