"use client";

import { useState, useEffect } from "react";
import SignupForm from "@/components/SignupForm";
import AdvisorApp from "@/components/AdvisorApp";

export default function Home() {
  const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);

      useEffect(() => {
          const stored = typeof window !== "undefined" ? localStorage.getItem("ai_advisor_user") : null;
              if (stored) {
                    try { setUser(JSON.parse(stored)); } catch {}
                        }
                            setChecking(false);
                              }, []);

                                function handleSignup(userData) {
                                    localStorage.setItem("ai_advisor_user", JSON.stringify(userData));
                                        setUser(userData);
                                          }

                                            function handleLogout() {
                                                localStorage.removeItem("ai_advisor_user");
                                                    setUser(null);
                                                      }

                                                        if (checking) {
                                                            return (
                                                                  <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                                                                          <div className="shimmer-bg w-12 h-12 rounded-full" />
                                                                                </div>
                                                                                    );
                                                                                      }

                                                                                        return (
                                                                                            <main className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
                                                                                                  <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 0%, rgba(249,115,22,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(249,115,22,0.05) 0%, transparent 50%)" }} />
                                                                                                        {!user ? <SignupForm onSignup={handleSignup} /> : <AdvisorApp user={user} onLogout={handleLogout} />}
                                                                                                            </main>
                                                                                                              );
                                                                                                              }
