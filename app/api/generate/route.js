import { NextResponse } from "next/server";

export async function POST(request) {
    try {
          const { role, industry, experience } = await request.json();
          if (!role || typeof role !== "string" || role.trim().length === 0) {
                  return NextResponse.json({ error: "Role is required" }, { status: 400 });
                }
          const apiKey = process.env.ANTHROPIC_API_KEY;
          if (!apiKey) {
                  return NextResponse.json({ error: "API key not configured" }, { status: 500 });
                }
          const prompt = `You are an expert AI career advisor. A professional has shared their details:\n- Role: ${role}\n- Industry: ${industry || "Not specified"}\n- Experience Level: ${experience || "Not specified"}\n\nRespond ONLY in valid JSON (no markdown, no backticks, no preamble). Use this exact structure:\n{\n  "headline": "A short punchy headline summarizing the AI opportunity for this role (max 15 words)",\n  "categories": [\n    {\n      "icon": "emoji",\n      "title": "Category name",\n      "tools": [{ "name": "Tool Name", "how": "One practical sentence on how to use this tool in their specific role" }]\n    }\n  ],\n  "career_tips": ["Specific actionable tip on using AI to grow in this career (5-6 tips)"]\n}\n\nRequirements:\n- Provide 3-5 categories relevant to the role\n- Each category should have 2-3 tools\n- Tools must be real, currently available AI tools\n- Career tips should be actionable and specific to the role`;

          const response = await fetch("https://api.anthropic.com/v1/messages", {
                  method: "POST",
                  headers: {
                            "Content-Type": "application/json",
                            "x-api-key": apiKey,
                            "anthropic-version": "2023-06-01",
                          },
                  body: JSON.stringify({
                            model: "claude-sonnet-4-20250514",
                            max_tokens: 1500,
                            messages: [{ role: "user", content: prompt }],
                          }),
                });

          if (!response.ok) {
                  return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 502 });
                }

          const data = await response.json();
          const text = data.content.map((item) => (item.type === "text" ? item.text : "")).filter(Boolean).join("\n");
          const clean = text.replace(/```json|```/g, "").trim();
          const parsed = JSON.parse(clean);
          return NextResponse.json(parsed);
        } catch (err) {
          console.error("Generate error:", err);
          return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
        }
  }
