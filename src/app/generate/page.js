"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText, Copy, Check, ExternalLink,
  ChevronLeft, Code2, Download, Eye, EyeOff
} from "lucide-react";
import { generateLatex, copyToClipboard, openInOverleaf } from "@/utils/latexGenerator";

const DEMO_DATA = {
  personal:       { firstName: "John", lastName: "Doe", title: "Full Stack Developer", summary: "" },
  contact:        { email: "john@email.com", phone: "+1 555 000 0000", linkedin: "linkedin.com/in/johndoe", github: "github.com/johndoe", portfolio: "johndoe.dev", location: "San Francisco, CA" },
  education:      [{ id: 1, institution: "Massachusetts Institute of Technology", degree: "B.Sc. Computer Science", startYear: "2018", endYear: "2022", gpa: "3.9/4.0" }],
  experience:     [{ id: 1, company: "Google", role: "Software Engineer", startDate: "Jun 2022", endDate: "Present", description: "• Built scalable APIs serving 10M+ requests/day\n• Led migration from monolith to microservices\n• Reduced page load time by 40% through caching" }],
  skills:         ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "AWS", "Docker", "SQL", "Git"],
  projects:       [{ id: 1, name: "ResumeForge", techStack: "Next.js, TypeScript, Tailwind CSS", link: "github.com/johndoe/resumeforge", description: "• Built a full-stack resume builder with LaTeX export\n• 500+ users in first week of launch" }],
  certifications: [{ id: 1, name: "AWS Solutions Architect", issuer: "Amazon Web Services", issueDate: "Mar 2023", expiryDate: "Mar 2026" }],
  achievements:   [{ id: 1, title: "Dean's List", year: "2021", description: "Top 5% of graduating class" }],
};

export default function GeneratePage() {
  const [latex,    setLatex]    = useState("");
  const [copied,   setCopied]   = useState(false);
  const [showCode, setShowCode] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("resumeforge_data");
      setLatex(generateLatex(raw ? JSON.parse(raw) : DEMO_DATA));
    } catch {
      setLatex(generateLatex(DEMO_DATA));
    }
  }, []);

  const handleCopy = async () => {
    const ok = await copyToClipboard(latex);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const lineCount = latex.split("\n").length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 md:px-8 h-14 flex items-center justify-between gap-2">

        {/* Left — back + logo */}
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/create"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors flex-shrink-0"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Back to form</span>
          </Link>

          <span className="text-gray-200 hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
              <FileText size={12} color="white" />
            </div>
            <span className="text-sm font-bold text-black hidden md:inline">ResumeForge</span>
          </div>
        </div>

        {/* Right — actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Toggle code — icon only on mobile */}
          <button
            onClick={() => setShowCode((p) => !p)}
            className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200
                       px-2.5 py-2 rounded-xl hover:bg-gray-50 hover:text-black transition-all"
          >
            {showCode ? <EyeOff size={15} /> : <Eye size={15} />}
            <span className="hidden sm:inline text-sm">{showCode ? "Hide" : "Show"} code</span>
          </button>

          {/* Copy — icon + label on desktop, icon only on mobile */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 text-sm font-semibold px-2.5 py-2 rounded-xl border transition-all
              ${copied
                ? "bg-green-50 text-green-600 border-green-200"
                : "bg-white text-black border-gray-200 hover:bg-gray-50"
              }`}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy LaTeX"}</span>
          </button>

          {/* Overleaf — icon + label on desktop, icon only on mobile */}
          <button
            onClick={() => openInOverleaf(latex)}
            className="flex items-center gap-1.5 text-sm font-semibold bg-black text-white
                       px-2.5 py-2 rounded-xl hover:bg-gray-800 transition-all"
          >
            <ExternalLink size={15} />
            <span className="hidden sm:inline">Open in Overleaf</span>
          </button>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-6 flex flex-col gap-4">

        {/* ── Status card ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                <h1 className="text-sm font-bold text-black">LaTeX generated successfully</h1>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {lineCount} lines · Paste into Overleaf to compile your PDF resume.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-center flex-shrink-0 self-start sm:self-auto">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Template</p>
              <p className="text-sm font-bold text-black">Jake's Style</p>
            </div>
          </div>
        </div>

        {/* ── How to use ── */}
        <div className="bg-black text-white rounded-2xl p-4 md:p-5">
          <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Download size={14} /> How to get your PDF
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: "1", text: 'Click "Copy LaTeX" or "Open in Overleaf" above' },
              { step: "2", text: "Paste the code into Overleaf's editor (or it auto-fills)" },
              { step: "3", text: 'Click "Compile" in Overleaf → Download your PDF' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold
                                flex items-center justify-center flex-shrink-0 mt-0.5">
                  {s.step}
                </div>
                <p className="text-sm text-white/70 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Code block ── */}
        {showCode && (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Code header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2 min-w-0">
                <Code2 size={14} className="text-gray-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-black">resume.tex</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                  {lineCount} lines
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                            transition-all flex-shrink-0 ml-2
                  ${copied
                    ? "bg-green-50 text-green-600"
                    : "text-gray-500 hover:text-black hover:bg-gray-100"
                  }`}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Code content — horizontally scrollable on mobile */}
            <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
              <pre className="p-4 md:p-5 text-xs leading-relaxed text-gray-800 font-mono whitespace-pre min-w-0">
                {latex || "% Generating your LaTeX code..."}
              </pre>
            </div>
          </div>
        )}

        {/* ── Bottom actions ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center
                        justify-between gap-3 pt-4 border-t border-gray-200 mt-auto">
          <Link
            href="/create"
            className="flex items-center justify-center sm:justify-start gap-2 text-sm
                       text-gray-500 hover:text-black transition-colors py-2"
          >
            <ChevronLeft size={15} /> Edit my resume
          </Link>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 text-sm font-semibold
                         bg-white text-black border border-gray-200 px-5 py-3 sm:py-2.5
                         rounded-xl hover:bg-gray-50 transition-all"
            >
              <Copy size={15} /> Copy LaTeX
            </button>
            <button
              onClick={() => openInOverleaf(latex)}
              className="flex items-center justify-center gap-2 text-sm font-semibold
                         bg-black text-white px-5 py-3 sm:py-2.5 rounded-xl
                         hover:bg-gray-800 transition-all"
            >
              <ExternalLink size={15} /> Open in Overleaf
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}