"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  User,
  GraduationCap,
  Briefcase,
  Zap,
  FolderGit2,
  BadgeCheck,
  Trophy,
  Phone,
  Menu,
  X,
  Check,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Home,
  Save,
} from "lucide-react";

const STORAGE_KEY = "resumeforge_data";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const INITIAL = {
  personal: { firstName: "", lastName: "", title: "", summary: "" },
  education: [
    { id: 1, institution: "", degree: "", startYear: "", endYear: "", gpa: "" },
  ],
  experience: [
    {
      id: 1,
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: [],
  projects: [{ id: 1, name: "", techStack: "", link: "", description: "" }],
  certifications: [
    { id: 1, name: "", issuer: "", issueDate: "", expiryDate: "" },
  ],
 achievements: "",
  contact: {
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    location: "",
  },
};

const SECTIONS = [
  { id: "personal", label: "Personal Info", Icon: User },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "experience", label: "Work Experience", Icon: Briefcase },
  { id: "skills", label: "Skills", Icon: Zap },
  { id: "projects", label: "Projects", Icon: FolderGit2 },
  { id: "certifications", label: "Certifications", Icon: BadgeCheck },
  { id: "achievements", label: "Achievements", Icon: Trophy },
  { id: "contact", label: "Contact Info", Icon: Phone },
];

const SUGGESTED = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "SQL",
  "Git",
  "Docker",
  "AWS",
  "Figma",
  "REST APIs",
];

function loadFromStorage() {
  if (typeof window === "undefined") return null; // ← KEY FIX
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(data) {
  if (typeof window === "undefined") return; // ← KEY FIX
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

function clearStorage() {
  if (typeof window === "undefined") return; // ← KEY FIX
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
function Label({ children, optional }) {
  return (
    <label className="block text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
      {children}
      {optional && (
        <span className="ml-1 normal-case tracking-normal font-normal text-gray-300">
          (optional)
        </span>
      )}
    </label>
  );
}

function Input({ label, optional, className = "", ...props }) {
  return (
    <div className={className}>
      {label && <Label optional={optional}>{label}</Label>}
      <input
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-black
                   placeholder:text-gray-300 outline-none focus:border-black focus:ring-1
                   focus:ring-black transition-all"
        {...props}
      />
    </div>
  );
}

function Textarea({ label, optional, ...props }) {
  return (
    <div>
      {label && <Label optional={optional}>{label}</Label>}
      <textarea
        rows={4}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-black
                   placeholder:text-gray-300 outline-none focus:border-black focus:ring-1
                   focus:ring-black transition-all resize-y leading-relaxed"
        {...props}
      />
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 shadow-sm">
      {children}
    </div>
  );
}

function CardHeader({ index, onRemove }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Entry {index + 1}
      </span>
      {index > 0 && (
        <button
          onClick={onRemove}
          className="flex items-center gap-1.5 text-xs text-gray-400 border border-gray-200 rounded-lg
                     px-3 py-1.5 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
        >
          <Trash2 size={12} /> Remove
        </button>
      )}
    </div>
  );
}

function AddEntryBtn({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 font-medium
                 border-2 border-dashed border-gray-200 rounded-2xl py-3.5
                 hover:border-black hover:text-black hover:bg-gray-50 transition-all mt-1"
    >
      <Plus size={16} /> {label}
    </button>
  );
}

function SectionTitle({ title, description }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-black tracking-tight">{title}</h2>
      {description && (
        <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION FORMS
// ─────────────────────────────────────────────────────────────────────────────
function PersonalForm({ data, onChange }) {
  const set = (f) => (e) => onChange({ ...data, [f]: e.target.value });
  return (
    <div>
      <SectionTitle
        title="Personal information"
        description="This appears at the top of your resume as your header."
      />
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <Input
            label="First name"
            placeholder="John"
            value={data.firstName}
            onChange={set("firstName")}
          />
          <Input
            label="Last name"
            placeholder="Doe"
            value={data.lastName}
            onChange={set("lastName")}
          />
        </div>
        <div className="mb-5">
          <Input
            label="Professional title"
            placeholder="Full Stack Developer"
            value={data.title}
            onChange={set("title")}
          />
        </div>
        <Textarea
          label="Summary"
          optional
          placeholder="A brief 2–3 sentence summary of your professional background and goals."
          value={data.summary}
          onChange={set("summary")}
        />
      </Card>
    </div>
  );
}

function EducationForm({ data, onChange }) {
  const update = (id, f) => (e) =>
    onChange(
      data.map((d) => (d.id === id ? { ...d, [f]: e.target.value } : d)),
    );
  const add = () =>
    onChange([
      ...data,
      {
        id: Date.now(),
        institution: "",
        degree: "",
        startYear: "",
        endYear: "",
        gpa: "",
      },
    ]);
  const remove = (id) => onChange(data.filter((d) => d.id !== id));
  return (
    <div>
      <SectionTitle
        title="Education"
        description="Add your degrees, diplomas, or relevant coursework."
      />
      {data.map((edu, i) => (
        <Card key={edu.id}>
          <CardHeader index={i} onRemove={() => remove(edu.id)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <Input
              label="Institution"
              placeholder="MIT"
              value={edu.institution}
              onChange={update(edu.id, "institution")}
            />
            <Input
              label="Degree"
              placeholder="B.Sc. Computer Science"
              value={edu.degree}
              onChange={update(edu.id, "degree")}
            />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <Input
              label="Start year"
              placeholder="2018"
              value={edu.startYear}
              onChange={update(edu.id, "startYear")}
            />
            <Input
              label="End year"
              placeholder="2022"
              value={edu.endYear}
              onChange={update(edu.id, "endYear")}
            />
            <Input
              label="GPA"
              optional
              placeholder="10/9"
              value={edu.gpa}
              onChange={update(edu.id, "gpa")}
            />
          </div>
        </Card>
      ))}
      <AddEntryBtn label="Add another education entry" onClick={add} />
    </div>
  );
}

function ExperienceForm({ data, onChange }) {
  const update = (id, f) => (e) =>
    onChange(
      data.map((d) => (d.id === id ? { ...d, [f]: e.target.value } : d)),
    );
  const add = () =>
    onChange([
      ...data,
      {
        id: Date.now(),
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  const remove = (id) => onChange(data.filter((d) => d.id !== id));
  return (
    <div>
      <SectionTitle
        title="Work experience"
        description="List your roles from most recent to oldest."
      />
      {data.map((exp, i) => (
        <Card key={exp.id}>
          <CardHeader index={i} onRemove={() => remove(exp.id)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <Input
              label="Company"
              placeholder="Google"
              value={exp.company}
              onChange={update(exp.id, "company")}
            />
            <Input
              label="Role/Title"
              placeholder="Software Engineer"
              value={exp.role}
              onChange={update(exp.id, "role")}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <Input
              label="Start date"
              placeholder="Jun 2022"
              value={exp.startDate}
              onChange={update(exp.id, "startDate")}
            />
            <Input
              label="End date"
              placeholder="Present"
              value={exp.endDate}
              onChange={update(exp.id, "endDate")}
            />
          </div>
          <Textarea
            label="Responsibilities & achievements"
            placeholder={
              "• Built X, resulting in Y\n• Led a team of N engineers to deliver Z"
            }
            value={exp.description}
            onChange={update(exp.id, "description")}
          />
        </Card>
      ))}
      <AddEntryBtn label="Add another role" onClick={add} />
    </div>
  );
}

function SkillsForm({ data, onChange }) {
  const [input, setInput] = useState("");
  const add = () => {
    const v = input.trim();
    if (!v || data.includes(v)) return;
    onChange([...data, v]);
    setInput("");
  };
  const remove = (s) => onChange(data.filter((x) => x !== s));
  return (
    <div>
      <SectionTitle
        title="Skills"
        description="Add technical and professional skills. Press Enter or click Add."
      />
      <Card>
        {data.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-gray-100">
            {data.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {s}
                <button
                  onClick={() => remove(s)}
                  className="text-white/50 hover:text-white transition-colors ml-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 mb-5">
          <input
            className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-black
                       placeholder:text-gray-300 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            placeholder="e.g. React, Python, Figma…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
          />
          <button
            onClick={add}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white
                       text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} /> Add skill
          </button>
        </div>
        <p className="text-xs text-gray-400 font-medium mb-3">
          Suggested skills
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.filter((s) => !data.includes(s)).map((s) => (
            <button
              key={s}
              onClick={() => onChange([...data, s])}
              className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-200
                         px-3 py-1.5 rounded-full hover:bg-black hover:text-white hover:border-black transition-all"
            >
              <Plus size={10} /> {s}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ProjectsForm({ data, onChange }) {
  const update = (id, f) => (e) =>
    onChange(
      data.map((d) => (d.id === id ? { ...d, [f]: e.target.value } : d)),
    );
  const add = () =>
    onChange([
      ...data,
      { id: Date.now(), name: "", techStack: "", link: "", description: "" },
    ]);
  const remove = (id) => onChange(data.filter((d) => d.id !== id));
  return (
    <div>
      <SectionTitle
        title="Projects"
        description="Highlight personal or professional projects that showcase your skills."
      />
      {data.map((p, i) => (
        <Card key={p.id}>
          <CardHeader index={i} onRemove={() => remove(p.id)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <Input
              label="Project name"
              placeholder="ResumeForge"
              value={p.name}
              onChange={update(p.id, "name")}
            />
            <Input
              label="Tech stack"
              placeholder="Next.js, TypeScript, Tailwind"
              value={p.techStack}
              onChange={update(p.id, "techStack")}
            />
          </div>
          <div className="mb-5">
            <Input
              label="Project link"
              optional
              placeholder="https://github.com/..."
              value={p.link}
              onChange={update(p.id, "link")}
            />
          </div>
          <Textarea
            label="Description"
            placeholder="What did you build? What problem did it solve?"
            value={p.description}
            onChange={update(p.id, "description")}
          />
        </Card>
      ))}
      <AddEntryBtn label="Add another project" onClick={add} />
    </div>
  );
}

function CertsForm({ data, onChange }) {
  const update = (id, f) => (e) =>
    onChange(
      data.map((d) => (d.id === id ? { ...d, [f]: e.target.value } : d)),
    );
  const add = () =>
    onChange([
      ...data,
      { id: Date.now(), name: "", issuer: "", issueDate: "", expiryDate: "" },
    ]);
  const remove = (id) => onChange(data.filter((d) => d.id !== id));
  return (
    <div>
      <SectionTitle
        title="Certifications"
        description="Include relevant professional certifications or licenses."
      />
      {data.map((c, i) => (
        <Card key={c.id}>
          <CardHeader index={i} onRemove={() => remove(c.id)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <Input
              label="Certification name"
              placeholder="AWS Solutions Architect"
              value={c.name}
              onChange={update(c.id, "name")}
            />
            <Input
              label="Issuing organization"
              placeholder="Amazon Web Services"
              value={c.issuer}
              onChange={update(c.id, "issuer")}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Issue date"
              placeholder="Mar 2023"
              value={c.issueDate}
              onChange={update(c.id, "issueDate")}
            />
            <Input
              label="Expiry date"
              optional
              placeholder="Mar 2026"
              value={c.expiryDate}
              onChange={update(c.id, "expiryDate")}
            />
          </div>
        </Card>
      ))}
      <AddEntryBtn label="Add another certification" onClick={add} />
    </div>
  );
}

function AchievementsForm({ data, onChange }) {
  return (
    <div>
      <SectionTitle
        title="Achievements"
        description="List your achievements as bullet points, one per line."
      />
      <Card>
        <Label>Achievements</Label>
        <textarea
          rows={8}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3
                     text-sm text-black placeholder:text-gray-300 outline-none
                     focus:border-black focus:ring-1 focus:ring-black
                     transition-all resize-y leading-relaxed"
          placeholder={"• Secured 1st Prize in Poster Making Competition.\n• Won 2nd Prize in PPT Presentation on AI Tools.\n• Achieved 1st Prize in Short Film Creation using AI."}
          value={data}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-2">
          Start each line with • or - or plain text. One achievement per line.
        </p>
      </Card>
    </div>
  );
}

function ContactForm({ data, onChange }) {
  const set = (f) => (e) => onChange({ ...data, [f]: e.target.value });
  return (
    <div>
      <SectionTitle
        title="Contact information"
        description="These appear in your resume header alongside your name."
      />
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <Input
            label="Email"
            type="email"
            placeholder="john@email.com"
            value={data.email}
            onChange={set("email")}
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone}
            onChange={set("phone")}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <Input
            label="LinkedIn URL"
            placeholder="linkedin.com/in/johndoe"
            value={data.linkedin}
            onChange={set("linkedin")}
          />
          <Input
            label="GitHub URL"
            placeholder="github.com/johndoe"
            value={data.github}
            onChange={set("github")}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Portfolio"
            optional
            placeholder="johndoe.dev"
            value={data.portfolio}
            onChange={set("portfolio")}
          />
          <Input
            label="Location"
            placeholder="San Francisco, CA"
            value={data.location}
            onChange={set("location")}
          />
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
function Sidebar({ current, done, onGoTo, onClose, isMobile, onClear }) {
  const pct = Math.round(((current + 1) / SECTIONS.length) * 100);
  return (
    <aside className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText size={15} color="white" />
          </div>
          <span className="text-sm font-bold text-black">ResumeForge</span>
        </Link>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-shrink-0 px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Progress
          </span>
          <span className="text-[10px] font-semibold text-gray-400">
            {pct}%
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-black rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-2">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">
          Sections
        </p>
        {SECTIONS.map((sec, idx) => {
          const active = current === idx;
          const isDone = done.has(idx) && !active;
          return (
            <button
              key={sec.id}
              onClick={() => onGoTo(idx)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left transition-all text-sm
                ${active ? "bg-black text-white font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-black"}`}
            >
              <sec.Icon size={16} className="flex-shrink-0" />
              <span className="flex-1 truncate">{sec.label}</span>
              {isDone && (
                <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={10} color="white" strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="flex-shrink-0 px-5 py-4 border-t border-gray-100 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-black transition-colors"
        >
          <Home size={13} /> Back to home
        </Link>
        <button
          onClick={onClear}
          className="flex items-center gap-2 text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={13} /> Clear saved data
        </button>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function CreatePage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false); // ← KEY FIX
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(new Set());
  const [data, setData] = useState(INITIAL);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saveState, setSaveState] = useState("idle");
  const mainRef = useRef(null);
  const saveTimer = useRef(null);

  // ── STEP 1: Hydrate from localStorage ONLY after mount ────────────────────
  // This is the key fix — we wait for the component to mount on the client
  // before reading localStorage. This prevents SSR/hydration mismatch on
  // mobile browsers which caused data to vanish on refresh.
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) setData(saved);
    setHydrated(true); // mark as hydrated so auto-save can begin
  }, []);

  // ── STEP 2: Auto-save on every data change — but ONLY after hydration ─────
  // Without the hydrated check, the INITIAL empty state would overwrite
  // the saved data in localStorage on every page load.
  useEffect(() => {
    if (!hydrated) return; // ← KEY FIX: don't save until we've loaded first
    setSaveState("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveToStorage(data);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    }, 800);
    return () => clearTimeout(saveTimer.current);
  }, [data, hydrated]);

  const goTo = (idx) => {
    setDone((p) => new Set([...p, current]));
    setCurrent(idx);
    setMenuOpen(false);
    (mainRef.current ?? window).scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = (dir) => {
    const next = current + dir;
    if (next >= 0 && next < SECTIONS.length) goTo(next);
  };

  const handleGenerate = () => {
    saveToStorage(data);
    router.push("/generate");
  };

  const handleClear = () => {
    if (!confirm("Clear all saved resume data and start fresh?")) return;
    clearStorage();
    setData(INITIAL);
    setDone(new Set());
    setCurrent(0);
  };

  const isLast = current === SECTIONS.length - 1;
  const set = (key) => (val) => setData((p) => ({ ...p, [key]: val }));

  const renderSection = () => {
    const id = SECTIONS[current].id;
    if (id === "personal")
      return <PersonalForm data={data.personal} onChange={set("personal")} />;
    if (id === "education")
      return (
        <EducationForm data={data.education} onChange={set("education")} />
      );
    if (id === "experience")
      return (
        <ExperienceForm data={data.experience} onChange={set("experience")} />
      );
    if (id === "skills")
      return <SkillsForm data={data.skills} onChange={set("skills")} />;
    if (id === "projects")
      return <ProjectsForm data={data.projects} onChange={set("projects")} />;
    if (id === "certifications")
      return (
        <CertsForm
          data={data.certifications}
          onChange={set("certifications")}
        />
      );
    if (id === "achievements") return <AchievementsForm data={data.achievements} onChange={set("achievements")} />;
    if (id === "contact")
      return <ContactForm data={data.contact} onChange={set("contact")} />;
  };

  // ── STEP 3: Show nothing until hydrated to prevent flash of empty form ────
  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
          Loading your resume…
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col sticky top-0 h-screen flex-shrink-0">
        <Sidebar
          current={current}
          done={done}
          onGoTo={goTo}
          isMobile={false}
          onClear={handleClear}
        />
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 flex flex-col md:hidden shadow-2xl overflow-y-auto">
            <Sidebar
              current={current}
              done={done}
              onGoTo={goTo}
              onClose={() => setMenuOpen(false)}
              isMobile
              onClear={handleClear}
            />
          </div>
        </>
      )}

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={18} />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
              <span>
                Section {current + 1} of {SECTIONS.length}
              </span>
              <span className="text-gray-200">·</span>
              <span className="font-semibold text-black">
                {SECTIONS[current].label}
              </span>
            </div>
            <span className="md:hidden text-sm font-semibold text-black">
              {SECTIONS[current].label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Save indicator */}
            <div
              className={`hidden sm:flex items-center gap-1.5 text-xs transition-all duration-300
              ${saveState === "saved" ? "text-green-500 opacity-100" : ""}
              ${saveState === "saving" ? "text-gray-400 opacity-100" : ""}
              ${saveState === "idle" ? "opacity-0 pointer-events-none" : ""}
            `}
            >
              {saveState === "saving" && (
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
              )}
              {saveState === "saved" && <Save size={12} />}
              <span>{saveState === "saving" ? "Saving…" : "Saved"}</span>
            </div>

            <button
              onClick={isLast ? handleGenerate : undefined}
              disabled={!isLast}
              className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all
                ${
                  isLast
                    ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              <Code2 size={15} />
              <span className="hidden sm:inline">Generate LaTeX</span>
              <span className="sm:hidden">Generate</span>
            </button>
          </div>
        </header>

        {/* Form area */}
        <main
          ref={mainRef}
          className="flex-1 px-4 md:px-10 py-8 pb-[calc(2rem+env(safe-area-inset-bottom))]"
        >
          <div className="max-w-2xl mx-auto">
            {renderSection()}

            {/* Bottom nav */}
            <div className="flex items-center justify-between pt-6 mt-2 border-t border-gray-200">
              <button
                onClick={() => navigate(-1)}
                disabled={current === 0}
                className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all
                  ${
                    current === 0
                      ? "border-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-gray-200 text-gray-600 hover:bg-white hover:text-black hover:border-gray-300 hover:shadow-sm"
                  }`}
              >
                <ChevronLeft size={16} /> Back
              </button>

              <div className="flex items-center gap-1">
                {SECTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all ${
                      i === current
                        ? "w-5 h-2 bg-black"
                        : done.has(i)
                          ? "w-2 h-2 bg-green-400"
                          : "w-2 h-2 bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {isLast ? (
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-2 text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-sm"
                >
                  <Code2 size={15} /> Generate LaTeX
                </button>
              ) : (
                <button
                  onClick={() => navigate(1)}
                  className="flex items-center gap-2 text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-sm"
                >
                  Continue <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
