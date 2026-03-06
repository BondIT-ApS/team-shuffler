import { legoTheme } from "@/styles/themes/lego";

export default function Header() {
  return (
    <header className="py-8 text-center">
      <h1
        className="text-5xl font-black tracking-tight"
        style={{ color: legoTheme.colors.black, fontFamily: legoTheme.fontFamily }}
      >
        <span style={{ color: legoTheme.colors.red }}>Team</span>{" "}
        <span style={{ color: legoTheme.colors.blue }}>Shuffler</span>
      </h1>
      <p className="mt-2 text-base font-bold uppercase tracking-widest" style={{ color: "#888" }}>
        Fair teams in seconds
      </p>
    </header>
  );
}
