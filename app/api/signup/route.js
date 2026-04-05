import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
    try {
          const { name, email, role, company } = await request.json();
          if (!name || !email) {
                  return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
                }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
                  return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
                }
          const lead = { name, email, role: role || "", company: company || "", signedUpAt: new Date().toISOString() };
          const dataDir = path.join(process.cwd(), "data");
          const filePath = path.join(dataDir, "leads.json");
          try { await fs.mkdir(dataDir, { recursive: true }); } catch {}
          let leads = [];
          try { const existing = await fs.readFile(filePath, "utf-8"); leads = JSON.parse(existing); } catch {}
          const exists = leads.find((l) => l.email.toLowerCase() === email.toLowerCase());
          if (exists) {
                  return NextResponse.json({ success: true, message: "Welcome back!", user: { name: exists.name, email: exists.email } });
                }
          leads.push(lead);
          await fs.writeFile(filePath, JSON.stringify(leads, null, 2));
          console.log("New signup:", name, email, role, company);
          return NextResponse.json({ success: true, message: "Welcome!", user: { name, email } });
        } catch (err) {
          console.error("Signup error:", err);
          return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
  }
