const version = process.env.NEXT_PUBLIC_APP_VERSION ?? "dev";

export default function Footer() {
  return (
    <footer
      className="py-6 text-center font-bold uppercase tracking-widest"
      style={{ color: "#aaa" }}
    >
      <span style={{ fontSize: "0.85rem" }}>by BondIT</span>
      <span
        style={{
          fontSize: "0.65rem",
          marginLeft: "0.4em",
          opacity: 0.6,
          letterSpacing: "0.05em",
        }}
      >
        (v.{version})
      </span>
    </footer>
  );
}
