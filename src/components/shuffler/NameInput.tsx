interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function NameInput({ value, onChange, placeholder }: NameInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="name-input"
        className="text-sm font-medium text-gray-700"
      >
        Participants
      </label>
      <textarea
        id="name-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Alice\nBob\nCharlie\n..."}
        rows={10}
        className="w-full rounded-lg border border-gray-300 p-3 text-sm leading-relaxed shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-y"
      />
    </div>
  );
}
