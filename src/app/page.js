import Head from "next/head";
import Link from "next/link";

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 md:px-12 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="2" width="11" height="14" rx="1.5" fill="white" opacity="0.9" />
            <rect x="9" y="8" width="11" height="14" rx="1.5" fill="white" opacity="0.5" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-black tracking-tight">ResumeForge</span>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/templates" className="text-sm text-gray-500 hover:text-black transition-colors">Templates</Link>
        <a href="#how-it-works" className="text-sm text-gray-500 hover:text-black transition-colors">How it works</a>
        <a href="#latex-guide" className="text-sm text-gray-500 hover:text-black transition-colors">LaTeX Guide</a>
      </div>

      {/* CTA */}
      <Link
        href="/create"
        className="text-sm font-medium bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        Build Resume →
      </Link>
    </nav>
  );
}

// ── Resume Mockup ──────────────────────────────────────────────────────────
function ResumePreview() {
  return (
    <div className="bg-white rounded-2xl border font-mono border-gray-200 p-5 shadow-md w-56 z-10">
      <div className="h-1.5 w-full bg-black rounded mb-3" />
      <p className="text-sm font-semibold text-black">John Doe</p>
      <p className="text-xs text-gray-400 mb-3">Full Stack Developer · San Francisco, CA</p>

      {/* Experience */}
      <p className="text-[9px] font-semibold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5">Experience</p>
      <div className="space-y-1 mb-3">
        {[100, 80, 70].map((w, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0 mt-0.5" />
            <div className="h-1 rounded bg-gray-200" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>

      {/* Education */}
      <p className="text-[9px] font-semibold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5">Education</p>
      <div className="h-1 w-full bg-gray-100 rounded mb-1" />
      <div className="h-1 w-3/5 bg-gray-100 rounded mb-3" />

      {/* Skills */}
      <p className="text-[9px] font-semibold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5">Skills</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {["React", "Node.js", "TypeScript", "AWS", "SQL"].map((s) => (
          <span key={s} className="text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">{s}</span>
        ))}
      </div>

      {/* Projects */}
      <p className="text-[9px] font-semibold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5">Projects</p>
      <div className="space-y-1">
        {[80, 65].map((w, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0 mt-0.5" />
            <div className="h-1 rounded bg-gray-200" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Template Selector Card ─────────────────────────────────────────────────
const TEMPLATES = [
  { id: 1, bg: "bg-white border border-gray-200", strip: "bg-black", selected: true },
  { id: 2, bg: "bg-gray-900", strip: "bg-white", dark: true },
  { id: 3, bg: "bg-blue-50 border border-gray-200", strip: "bg-blue-500" },
  { id: 4, bg: "bg-amber-50 border border-gray-200", strip: "bg-amber-400" },
];

function TemplateSelectorCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-md w-44 z-20 absolute left-0 top-10">
      <p className="text-xs font-medium text-black mb-3">Choose a template</p>
      <div className="grid grid-cols-2 gap-1.5">
        {TEMPLATES.map((t) => (
          <div
            key={t.id}
            className={`h-16 rounded-lg cursor-pointer overflow-hidden relative ${t.bg} ${
              t.selected ? "ring-2 ring-black" : ""
            }`}
          >
            <div className="p-1.5">
              <div className={`h-1 w-2/5 ${t.strip} rounded mb-1`} />
              {[80, 60].map((w, i) => (
                <div
                  key={i}
                  className={`h-1 rounded mb-0.5 ${t.dark ? "bg-white/20" : "bg-black/10"}`}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            {t.selected && (
              <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-black rounded-full flex items-center justify-center">
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


const STEPS = [
  {
    num: 1,
    title: "Fill in your details",
    desc: "Enter your info across 8 sections — experience, education, skills, projects, and more.",
  },
  {
    num: 2,
    title: "Pick a LaTeX template",
    desc: "Choose from clean, minimal LaTeX templates — from classic to modern developer styles.",
  },
  {
    num: 3,
    title: "Export & compile",
    desc: 'Copy your generated LaTeX or click "Open in Overleaf" to compile and download your PDF.',
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 border-t border-gray-100 py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-black text-center tracking-tight mb-12">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-8 h-8 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center mb-4">
                {step.num}
              </div>
              <h3 className="text-sm font-semibold text-black mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 px-6 md:px-12 py-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="2" width="11" height="14" rx="1.5" fill="white" opacity="0.9" />
              <rect x="9" y="8" width="11" height="14" rx="1.5" fill="white" opacity="0.5" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-black">ResumeForge</span>
        </div>
        <p className="text-xs text-gray-400">No login. No backend. All data stays on your device.</p>
        <div className="flex gap-6">
          <Link href="/templates" className="text-xs text-gray-400 hover:text-black transition-colors">Templates</Link>
          <a href="#how-it-works" className="text-xs text-gray-400 hover:text-black transition-colors">How it works</a>
        </div>
      </div>
    </footer>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Head>
        <title>ResumeForge — LaTeX Resume Builder</title>
        <meta name="description" content="Build a professional LaTeX resume in minutes. No login required." />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-white font-sans">
        <Navbar />

        {/* ── HERO ── */}
        <main className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 text-xs text-gray-500 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                No login required · 100% free
              </div>

              {/* Headline */}
              <h1
                className="text-5xl md:text-6xl leading-tight text-black tracking-tight mb-5 font-normal"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                Build a resume<br />
                that gets you<br />
                <em className="italic text-black">hired.</em>
              </h1>

              {/* Desc */}
              <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md">
                Fill in your details, pick a LaTeX template, and get professional-grade
                resume code — ready to compile on Overleaf in seconds.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1v14M1 8h14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Build my resume
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Browse templates
                </Link>
              </div>

              <p className="text-xs text-gray-400">* No account needed. All data stays on your device.</p>

              {/* Stats */}
              <div className="flex gap-8 mt-8 pt-8 border-t border-gray-100">
                {[
                  { num: "5+", label: "LaTeX templates" },
                  { num: "8", label: "Resume sections" },
                  { num: "0s", label: "Time to generate" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-xl font-semibold text-black tracking-tight">{s.num}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Visual */}
            <div className="relative h-[460px] hidden md:flex items-center justify-center">
              <TemplateSelectorCard />
              <ResumePreview />

              {/* LaTeX badge */}
              <div className="absolute bottom-16 right-0 bg-black text-white text-xs font-medium px-4 py-2 rounded-xl z-20 shadow-lg">
                LaTeX generated ✓
                <span className="block text-[9px] text-white/70 mt-0.5">Ready to compile</span>
              </div>

              {/* Overleaf badge */}
              <div className="absolute bottom-2 left-4 bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-medium text-black z-20 shadow-md">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Open in Overleaf →
              </div>
            </div>
          </div>
        </main>

        <HowItWorks />
        <Footer />
      </div>
    </>
  );
}