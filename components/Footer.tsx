import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#0B1F2F" }}>

      {/* Top accent line */}
      <div style={{ height: "2px", background: "linear-gradient(to right, transparent, #4EC3C7, transparent)" }} />

      {/* Main section */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 32px 0" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr 1fr 1fr 1.4fr", gap: "40px", alignItems: "start" }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "14px" }}>
              <Image src="/logo.png" alt="Dashes n Hyphens" width={160} height={40} style={{ height: "36px", width: "auto", objectFit: "contain" }} />
            </Link>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "12.5px", lineHeight: 1.75, marginBottom: "18px", fontFamily: "'DM Sans', sans-serif", maxWidth: "220px" }}>
              Preparing tomorrow&apos;s public companies through expert IPO advisory, startup capital, and government grant navigation.
            </p>
            <a
              href="https://www.linkedin.com/company/dashes-n-hyphens"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "7px 14px", border: "1px solid rgba(78,195,199,0.3)", borderRadius: "4px", color: "#4EC3C7", fontSize: "11px", fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}
            >
              <Linkedin size={13} />
              Follow on LinkedIn
            </a>
          </div>

          {/* Services */}
          <div>
            <div style={{ color: "#4EC3C7", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "'DM Sans', sans-serif" }}>Services</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                { label: "IPO Advisory", href: "/ipo-advisory" },
                { label: "Startup Funding", href: "/startup-funding" },
                { label: "Government Grants", href: "/government-grants" },
                { label: "CS Compliance", href: "/about" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.48)", fontSize: "12.5px", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", transition: "color 0.2s" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div style={{ color: "#4EC3C7", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "'DM Sans', sans-serif" }}>Company</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Admin", href: "/admin" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ color: "rgba(255,255,255,0.48)", fontSize: "12.5px", fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <div style={{ color: "#4EC3C7", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "'DM Sans', sans-serif" }}>Legal</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Disclaimer", href: "/disclaimer" },
              ].map((l) => (
                <Link key={l.label} href={l.href} style={{ color: "rgba(255,255,255,0.48)", fontSize: "12.5px", fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: "#4EC3C7", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px", fontFamily: "'DM Sans', sans-serif" }}>Get in Touch</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="tel:+917718899466" style={{ display: "flex", alignItems: "center", gap: "9px", color: "rgba(255,255,255,0.48)", fontSize: "12.5px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>
                <Phone size={12} style={{ color: "#4EC3C7", flexShrink: 0 }} />
                +91 77188 99466
              </a>
              <a href="mailto:support@dashesnhyphens.com" style={{ display: "flex", alignItems: "center", gap: "9px", color: "rgba(255,255,255,0.48)", fontSize: "12.5px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", wordBreak: "break-all" }}>
                <Mail size={12} style={{ color: "#4EC3C7", flexShrink: 0 }} />
                support@dashesnhyphens.com
              </a>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "9px", color: "rgba(255,255,255,0.48)", fontSize: "12.5px", fontFamily: "'DM Sans', sans-serif" }}>
                <MapPin size={12} style={{ color: "#4EC3C7", flexShrink: 0, marginTop: "2px" }} />
                New Delhi, India
              </div>
            </div>

            {/* CTA */}
            <Link href="/contact?consult=true" style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginTop: "18px", padding: "9px 16px", background: "#4EC3C7", color: "#0B1F2F", fontSize: "11px", fontWeight: 700, borderRadius: "4px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>
              Free Consultation →
            </Link>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "32px 0 0" }} />
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar" style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 32px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", fontFamily: "'DM Sans', sans-serif" }}>
          © {new Date().getFullYear()} Dashes n Hyphens. All rights reserved.
        </p>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", fontFamily: "'DM Sans', sans-serif" }}>
          Capital Advisory · IPO Consulting · Company Secretary Practice · New Delhi
        </p>
        <a
          href="https://eyepune.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.22)", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
        >
          Designed & Developed by{" "}
          <span style={{ color: "#DC143C", fontWeight: 600 }}>EyE PunE</span>
        </a>
      </div>

    </footer>
  );
}
