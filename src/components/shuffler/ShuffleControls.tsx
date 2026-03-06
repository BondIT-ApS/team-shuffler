interface ShuffleControlsProps {
  onShuffle: () => void;
  onCopy: () => void;
  onReset: () => void;
  hasResult: boolean;
  disabled?: boolean;
  copyConfirmed?: boolean;
}

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
      {!hasResult && (
        <button
          onClick={onShuffle}
          disabled={disabled}
          className="w-full rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create Teams
        </button>
      )}
      {hasResult && (
        <>
          <button
            onClick={onShuffle}
            disabled={disabled}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reshuffle
          </button>
          <button
            onClick={onCopy}
            className="w-full rounded-xl border border-blue-300 bg-white px-6 py-3 text-base font-medium text-blue-700 shadow-sm transition hover:bg-blue-50 active:scale-95"
          >
            {copyConfirmed ? "Copied! ✓" : "Copy Results"}
          </button>
          <button
            onClick={onReset}
            className="w-full rounded-xl px-6 py-3 text-base font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 active:scale-95"
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}
