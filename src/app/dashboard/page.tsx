'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Back arrow */}
      <Link href="/" style={{
        position: "fixed", top: "20px", left: "20px",
        width: "38px", height: "38px",
        background: "#fff", border: "1px solid #e5e7eb",
        borderRadius: "50%", display: "flex",
        alignItems: "center", justifyContent: "center",
        textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "80px 24px" }}>

        {/* Welcome card */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "32px", marginBottom: "16px", textAlign: "center" }}>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "#E8593C", color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "24px", fontWeight: "700",
            margin: "0 auto 16px",
          }}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
            Welcome to YatVenture!
          </h1>
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>{user?.email}</p>
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { label: "My Trips", icon: "🗺️", href: "/saved" },
            { label: "Create Post", icon: "✍️", href: "/create" },
            { label: "Find Transport", icon: "🚙", href: "/transport" },
            { label: "Book a Stay", icon: "🏠", href: "/stays" },
          ].map((item) => (
            <Link key={item.label} href={item.href} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: "12px", padding: "20px",
                textAlign: "center", cursor: "pointer",
              }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
                <p style={{ fontSize: "14px", fontWeight: "500", color: "#111" }}>{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}