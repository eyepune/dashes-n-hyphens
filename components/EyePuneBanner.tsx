import Link from "next/link";

export default function EyePuneBanner() {
  return (
    <section style={{ background: "#F5F7FA", borderTop: "1px solid #E2E8F0", padding: "40px 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div className="eyepune-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
          <div>
            <div style={{ color: "#4EC3C7", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>
              Powered by our Digital Partner
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "22px", color: "#DC143C" }}>
                EyE PunE
              </span>
              <span style={{ background: "#0B1F2F", color: "#4EC3C7", fontSize: "9px", fontWeight: 700, padding: "3px 9px", borderRadius: "3px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
                Growth Accelerator
              </span>
            </div>
            <p style={{ color: "#4A5568", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", marginTop: "4px" }}>
              Need business collateral for your IPO or fundraise? EyE PunE has you covered.
            </p>
          </div>
          <a
            href="https://eyepune.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "10px 20px", background: "#0B1F2F", color: "#fff", fontSize: "12px", fontWeight: 600, borderRadius: "4px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}
          >
            Visit eyepune.com →
          </a>
        </div>

        {/* Service cards */}
        <div className="eyepune-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
          {[
            { icon: "📊", title: "Pitch Decks", desc: "Investor-ready decks that close rounds" },
            { icon: "📁", title: "Presentations", desc: "Board, SEBI & roadshow presentations" },
            { icon: "🌐", title: "Website Design", desc: "Professional business websites" },
            { icon: "📱", title: "Social Media", desc: "Brand building & content strategy" },
            { icon: "🎨", title: "Brand Identity", desc: "Logo, colours & brand guidelines" },
            { icon: "📈", title: "Digital Marketing", desc: "SEO, ads & lead generation" },
          ].map((s) => (
            <a
              key={s.title}
              href="https://eyepune.com"
              target="_blank"
              rel="noopener noreferrer"
              className="card-3d" style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "10px", padding: "14px 16px", textDecoration: "none", display: "block", transition: "all 0.2s" }}
            >
              <div style={{ fontSize: "20px", marginBottom: "7px" }}>{s.icon}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "13px", color: "#0B1F2F", marginBottom: "3px" }}>{s.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#718096", lineHeight: 1.5 }}>{s.desc}</div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
