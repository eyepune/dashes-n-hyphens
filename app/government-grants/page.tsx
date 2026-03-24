import Navbar from "@/components/Navbar";
import EyePuneBanner from "@/components/EyePuneBanner";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import { CheckCircle2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Grants",
  description: "Navigate India's government grant landscape — DPIIT, SIDBI, DST, and state schemes. Non-dilutive capital for Indian startups.",
};

const schemes = [
  {
    name: "DPIIT Startup India",
    ministry: "Dept. for Promotion of Industry & Internal Trade",
    benefit: "Tax exemptions, self-certification, priority government procurement",
    amount: "Non-financial (regulatory benefits)",
    eligibility: "Incorporated < 10 years, turnover < ₹100 Cr",
    tag: "Recognition",
  },
  {
    name: "SIDBI Fund of Funds",
    ministry: "Small Industries Development Bank of India",
    benefit: "Equity funding through SEBI-registered AIFs",
    amount: "₹10 Lakh – ₹50 Cr",
    eligibility: "DPIIT recognized startups, growth stage",
    tag: "Equity Fund",
  },
  {
    name: "DST NIDHI",
    ministry: "Dept. of Science & Technology",
    benefit: "Grant support for deep tech and innovation startups",
    amount: "₹50 Lakh – ₹5 Cr",
    eligibility: "Technology-based startups, prototype stage+",
    tag: "Grant",
  },
  {
    name: "MeitY Startup Hub",
    ministry: "Ministry of Electronics & IT",
    benefit: "Grants for IT, electronics, and digital product startups",
    amount: "₹50 Lakh – ₹2 Cr",
    eligibility: "Tech startups in IT/ITES, hardware, AI/ML",
    tag: "Grant",
  },
  {
    name: "Startup India Seed Fund",
    ministry: "DPIIT / Ministry of Commerce",
    benefit: "Early-stage seed funding via incubators",
    amount: "₹20 Lakh – ₹50 Lakh",
    eligibility: "Seed/early stage, DPIIT recognized",
    tag: "Seed Funding",
  },
  {
    name: "State Industrial Incentives",
    ministry: "Various State Governments",
    benefit: "Capital subsidy, GST refunds, land at concessional rates",
    amount: "₹10 Lakh – ₹50 Cr",
    eligibility: "Varies by state and sector",
    tag: "State Scheme",
  },
];

const process = [
  { step: "01", title: "Eligibility Audit", desc: "We map your startup profile against 50+ central and state schemes to identify every opportunity." },
  { step: "02", title: "Documentation", desc: "Our team prepares and audits all required documents — financials, IP filings, certifications." },
  { step: "03", title: "Application Filing", desc: "We file applications with precision, handling portal submissions and physical filings." },
  { step: "04", title: "Query Management", desc: "We respond to ministry queries, facilitate site visits, and track approval status." },
  { step: "05", title: "Grant Disbursement", desc: "We coordinate with ministries to expedite disbursement and compliance post-approval." },
];

export default function GovernmentGrantsPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0B1F2F] pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at 20% 80%, #4EC3C7, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-[#4EC3C7] text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-5">
              Government Grants
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Unlock Non-Dilutive
              <br />
              <span className="italic text-[#4EC3C7]">Government Capital</span>
            </h1>
            <p className="text-white/55 font-sans text-xl leading-relaxed max-w-xl mb-10">
              Billions of rupees in government grants go unclaimed every year. 
              We help Indian startups secure every rupee they&apos;re entitled to.
            </p>
            <div className="flex gap-4">
              <Link href="/contact?consult=true" className="btn-accent">
                Book Free Consultation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key stat */}
      <section className="bg-[#4EC3C7] py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-serif text-2xl md:text-3xl font-bold text-[#0B1F2F]">
            &quot;Less than 3% of eligible Indian startups successfully secure government grants — 
            not because they don&apos;t qualify, but because they don&apos;t know how.&quot;
          </p>
        </div>
      </section>

      {/* Schemes */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-[#4EC3C7] text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4">
              Grant Schemes
            </div>
            <h2 className="font-serif text-4xl font-bold text-[#0B1F2F]">
              Key Schemes We Navigate
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {schemes.map((scheme) => (
              <div key={scheme.name} className="bg-[#F5F7FA] rounded-2xl p-6 card-hover relative border border-transparent hover:border-[#4EC3C7]/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-sans font-bold tracking-wider uppercase px-2 py-0.5 bg-[#4EC3C7]/10 text-[#4EC3C7] rounded mb-3 inline-block">
                      {scheme.tag}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#0B1F2F]">{scheme.name}</h3>
                  </div>
                </div>
                <p className="text-[#4EC3C7] font-sans text-xs font-medium mb-3">{scheme.ministry}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-[#718096] font-sans text-xs w-20 flex-shrink-0">Amount</span>
                    <span className="text-[#0B1F2F] font-sans text-xs font-medium">{scheme.amount}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#718096] font-sans text-xs w-20 flex-shrink-0">Eligible</span>
                    <span className="text-[#0B1F2F] font-sans text-xs">{scheme.eligibility}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#718096] font-sans text-xs w-20 flex-shrink-0">Benefit</span>
                    <span className="text-[#0B1F2F] font-sans text-xs">{scheme.benefit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[#718096] font-sans text-sm mt-8">
            + 40 more state and sectoral schemes identified based on your profile
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#F5F7FA]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-[#4EC3C7] text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4">
              Our Process
            </div>
            <h2 className="font-serif text-4xl font-bold text-[#0B1F2F]">
              How We Secure Your Grants
            </h2>
          </div>
          <div className="space-y-4">
            {process.map((p, i) => (
              <div key={p.step} className="flex items-start gap-6 bg-white rounded-2xl p-6 border border-[#E2E8F0] card-hover">
                <div className="text-[#4EC3C7] font-mono text-2xl font-bold w-12 flex-shrink-0">{p.step}</div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1F2F] mb-1.5">{p.title}</h3>
                  <p className="text-[#4A5568] font-sans text-sm leading-relaxed">{p.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <ArrowRight size={16} className="text-[#CBD5E0] ml-auto flex-shrink-0 mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
      <EyePuneBanner />
      <Footer />
    </main>
  );
}
