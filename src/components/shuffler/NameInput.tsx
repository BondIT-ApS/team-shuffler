import { legoTheme } from "@/styles/themes/lego";

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
        className="text-sm font-black uppercase tracking-widest"
        style={{ color: legoTheme.colors.black }}
      >
        Participants
      </label>
      <textarea
        id="name-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Alice\nBob\nCharlie\n..."}
        rows={10}
        className="w-full p-3 text-sm leading-relaxed resize-y font-semibold"
        style={{
          border: `${legoTheme.borderWidth} solid ${legoTheme.colors.border}`,
          borderRadius: legoTheme.borderRadius,
          boxShadow: legoTheme.shadow,
          backgroundColor: legoTheme.colors.white,
          outline: 'none',
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
    </div>
  );
}
