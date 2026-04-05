"use client";
import { useState, useRef, useEffect } from "react";

  const ROLES = ["Sales Leader","Account Executive","SDR / BDR","Product Manager","Marketing Manager","HR Business Partner","Software Engineer","Data Analyst","Customer Success Manager","Founder / CEO","Content Creator","Finance Manager","Operations Manager","UX Designer","Project Manager"];
const INDUSTRIES = ["SaaS / Technology","Healthcare","Financial Services","E-commerce / Retail","Manufacturing","Education","Real Estate","Media & Entertainment","Consulting","Other"];
const EXPERIENCE = ["Early Career (0-3 yrs)","Mid-Level (3-7 yrs)","Senior (7-15 yrs)","Executive (15+ yrs)"];
const PHRASES = ["Analyzing your role...","Mapping the AI landscape...","Curating tool recommendations...","Crafting career growth tips...","Finalizing your playbook..."];

export default function AdvisorApp({ user, onLogout }) {
  const [role, setRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [lp, setLp] = useState(0);
  const resultRef = useRef(null);

  useEffect(() => { if (!loading) return; const i = setInterval(() => setLp(p => (p+1) % PHRASES.length), 2400); return () => clearInterval(i); }, [loading]);
  useEffect(() => { if (result && resultRef.current) { setTimeout(() => { resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" }); setShowResults(true); }, 200); } }, [result]);

  const er = role === "__custom__" ? customRole : role;

  async function gen() {
    if (!er.trim()) { setError("Please select or enter your role."); return; }
    setError(""); setLoading(true); setResult(null); setShowResults(false); setLp(0);
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role: er, industry, experience }) });
      if (!res.ok) throw new Error("Failed");
      setResult(await res.json());
} catch { setError("Something went wrong. Please try again."); } finally { setLoading(false); }
}

  const pill = (a) => `px-4 py-2 rounded-full text-[13px] font-semibold font-body cursor-pointer transition-all border ${a ? "border-[#f97316] bg-[#f97316]/15 text-[#f97316]" : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20"}`;
  const sel = "w-full py-2.5 px-3.5 rounded-xl border border-white/10 bg-black/40 text-white/80 text-[13px] font-body outline-none cursor-pointer appearance-none";

  return (
    <div className="relative z-10 max-w-[720px] mx-auto px-5 pt-8 pb-16">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-2.5 bg-[#f97316]/10 border border-[#f97316]/20 rounded-full px-4 py-1.5">
          <span>&#9889;</span><span className="text-[10px] font-extrabold tracking-[2.5px] uppercase text-[#f97316] font-body">AI Career Advisor</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/30 text-xs font-body">Hi, {user.name.split(" ")[0]}</span>
          <button onClick={onLogout} className="text-white/20 text-xs font-body hover:text-white/50 cursor-pointer bg-transparent border-none">Sign out</button>
        </div>
      </div>
      <div className="text-center mb-10">
        <h1 className="font-display font-black leading-[1.15] mb-3" style={{ fontSize: "clamp(28px, 5vw, 44px)", background: "linear-gradient(135deg, #fff 30%, #f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Find Your AI<br/>Power Tools</h1>
        <p className="text-white/45 text-[15px] font-body max-w-md mx-auto">Select your role and we will build a personalized AI toolkit.</p>
      </div>
      <div className="bg-white/[0.03] border border-[#f97316]/[0.12] rounded-2xl p-7 backdrop-blur-xl mb-10">
        <label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#f97316] mb-3 font-body">Your Role</label>
        <div className="flex flex-wrap gap-2 mb-6">
{ROLES.map(r => <button key={r} onClick={() => {setRole(r);setError("");}} className={pill(role===r)}>{r}</button>)}
          <button onClick={() => {setRole("__custom__");setError("");}} className={pill(role==="__custom__")}>+ Other</button>
        </div>
{role === "__custom__" && <input type="text" placeholder="Type your role..." value={customRole} onChange={e => setCustomRole(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#f97316]/20 bg-black/30 text-white text-sm font-body outline-none mb-6" />}
        <div className="grid grid-cols-2 gap-4 mb-7">
          <div><label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#f97316] mb-2 font-body">Industry</label><select value={industry} onChange={e => setIndustry(e.target.value)} className={sel}><option value="">Optional</option>{INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}</select></div>
          <div><label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#f97316] mb-2 font-body">Experience</label><select value={experience} onChange={e => setExperience(e.target.value)} className={sel}><option value="">Optional</option>{EXPERIENCE.map(x => <option key={x} value={x}>{x}</option>)}</select></div>
        </div>
{error && <p className="text-red-400 text-xs font-semibold mb-4 font-body">{error}</p>}
        <button onClick={gen} disabled={loading} className="w-full py-4 rounded-xl border-none text-white text-base font-bold font-body cursor-pointer transition-all flex items-center justify-center gap-2.5 disabled:cursor-not-allowed" style={{ background: loading ? "rgba(249,115,22,0.3)" : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", boxShadow: loading ? "none" : "0 4px 24px rgba(249,115,22,0.3)" }}>
{loading ? <span>{PHRASES[lp]}</span> : <><span>&#9889;</span> Generate My AI Playbook</>}
        </button>
      </div>
{result && (
        <div ref={resultRef}>
          <div className="text-center mb-9 transition-all duration-500" style={{ opacity: showResults?1:0, transform: showResults?"translateY(0)":"translateY(20px)" }}>
            <div className="text-[10px] font-bold tracking-[3px] uppercase text-[#f97316] mb-3 font-body">Your Personalized AI Playbook</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white m-0">{result.headline}</h2>
          </div>
          <div className="flex flex-col gap-5 mb-6">
{result.categories?.map((cat,i) => (
              <div key={i} className="border border-[#f97316]/[0.15] rounded-2xl p-6 backdrop-blur-lg transition-all duration-500" style={{ opacity: showResults?1:0, transform: showResults?"translateY(0)":"translateY(20px)", transitionDelay: `${i*120}ms`, background: "rgba(15,15,20,0.6)" }}>
                <div className="flex items-center gap-3 mb-5"><span className="text-[26px]">{cat.icon}</span><h3 
