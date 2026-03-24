"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ipo-advisory", label: "IPO Advisory" },
  { href: "/startup-funding", label: "Startup Funding" },
  { href: "/government-grants", label: "Gov. Grants" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(11,31,47,0.98)" : "#0B1F2F",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/logo.png"
              alt="Dashes n Hyphens"
              width={180}
              height={48}
              style={{ height: "42px", width: "auto", objectFit: "contain" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center" style={{ gap: "28px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "13px", fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
                  color: pathname === link.href ? "#4EC3C7" : "rgba(255,255,255,0.7)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/startup-funding"
              style={{ marginLeft: "8px", padding: "9px 20px", background: "#4EC3C7", color: "#0B1F2F", fontSize: "13px", fontWeight: 600, borderRadius: "4px", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: "#fff", background: "none", border: "none", cursor: "pointer", padding: "4px" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "rgba(11,31,47,0.98)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "16px 24px 24px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "12px 0", fontSize: "14px", fontWeight: 500, color: pathname === link.href ? "#4EC3C7" : "rgba(255,255,255,0.7)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/startup-funding"
            onClick={() => setMobileOpen(false)}
            style={{ display: "block", marginTop: "16px", padding: "12px", background: "#4EC3C7", color: "#0B1F2F", textAlign: "center", fontSize: "14px", fontWeight: 600, borderRadius: "4px", textDecoration: "none" }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
