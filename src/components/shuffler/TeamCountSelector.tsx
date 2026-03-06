interface TeamCountSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TeamCountSelector({ value, onChange }: TeamCountSelectorProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed)) {
      onChange(Math.max(2, parsed));
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="team-count"
        className="text-sm font-medium text-gray-700"
      >
        Number of teams
      </label>
      <input
        id="team-count"
        type="number"
        min={2}
        value={value}
        onChange={handleChange}
        className="w-24 rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}
