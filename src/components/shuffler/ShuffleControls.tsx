interface ShuffleControlsProps {
  onShuffle: () => void;
  disabled?: boolean;
}

export default function ShuffleControls({ onShuffle, disabled = false }: ShuffleControlsProps) {
  return (
    <button
      onClick={onShuffle}
      disabled={disabled}
      className="w-full rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Create Teams
    </button>
  );
}
