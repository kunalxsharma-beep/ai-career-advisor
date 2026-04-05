"use client";
import { useState } from "react";

export default function SignupForm({ onSignup }) {
    const [form, setForm] = useState({ name: "", email: "", role: "", company: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); setError(""); }
    async function handleSubmit(e) {
          e.preventDefault();
          if (!form.name.trim() || !form.email.trim()) { setError("Name and email are required."); return; }
          setLoading(true); setError("");
          try {
                  const res = await fetch("/api/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                  const data = await res.json();
                  if (!res.ok) { setError(data.error || "Something went wrong."); return; }
                  onSignup({ name: form.name, email: form.email });
          } catch { setError("Network error."); } finally { setLoading(false); }
    }
    const ic = "w-full px-4 py-3 rounded-xl border border-white/10 bg-black/30 text-white font-body text-sm outline-none focus:border-[#f97316]/50 transition-all placeholder:text-white/25";
    return (
          <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-12">
            <div className="w-full max-w-md">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2.5 bg-[#f97316]/10 border border-[#f97316]/20 rounded-full px-5 py-2 mb-6"><span className="text-lg">&#9889;</span><span className="text-[11px] font-extrabold tracking-[3px] uppercase text-[#f97316] font-body">AI Career Advisor</span></div>
            <h1 className="font-display font-black leading-[1.1] mb-4" style={{ fontSize: "clamp(30px,7vw,44px)", background: "linear-gradient(135deg,#fff 30%,#f97316 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Discover Your<br/>AI Power Tools</h1>
          <p className="text-white/45 text-[15px] leading-relaxed max-w-sm mx-auto font-body">Get a personalized AI toolkit for your role. Free.</p>
  </div>
        <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div><label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#f97316] mb-2 font-body">Full Name *</label><input type="text" placeholder="John Doe" value={form.name} onChange={(e)=>update("name",e.target.value)} className={ic} required/></div>
            <div><label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#f97316] mb-2 font-body">Work Email *</label><input type="email" placeholder="john@company.com" value={form.email} onChange={(e)=>update("email",e.target.value)} className={ic} required/></div>
            <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#f97316] mb-2 font-body">Job Title</label><input type="text" placeholder="Sales Leader" value={form.role} onChange={(e)=>update("role",e.target.value)} className={ic}/></div>
              <div><label className="block text-[10px] font-bold tracking-[2px] uppercase text-[#f97316] mb-2 font-body">Company</label><input type="text" placeholder="Acme Inc" value={form.company} onChange={(e)=>update("company",e.target.value)} className={ic}/></div>
  </div>
{error && <p className="text-red-400 text-xs font-semibold font-body">{error}</p>}
             <button type="submit" disabled={loading} className="w-full mt-2 py-4 rounded-xl border-none text-white text-[15px] font-bold font-body cursor-pointer transition-all flex items-center justify-center gap-2.5 disabled:opacity-50" style={{background:loading?"rgba(249,115,22,0.3)":"linear-gradient(135deg,#f97316,#ea580c)",boxShadow:loading?"none":"0 4px 24px rgba(249,115,22,0.3)"}}>
{loading ? "Creating account..." : "Get My Free AI Playbook"}
</button>
  </form>
          <p className="text-white/20 text-[11px] text-center mt-5 font-body">No spam. Your info stays private.</p>
  </div>
  </div>
  </div>
  );
}
