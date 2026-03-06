import { legoTheme } from "@/styles/themes/lego";

interface TeamCountSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TeamCountSelector({ value, onChange }: TeamCountSelectorProps) {
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
