'use client'
import { useState } from "react"
import Link from "next/link"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    // Supabase auth comes next session
    console.log("Signup:", name, email, password)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ width: "44px", height: "44px", background: "#E8593C", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <svg width="24" height="22" viewBox="0 0 22 20" fill="none">
              <rect x="2" y="6" width="18" height="13" rx="2" fill="white" fillOpacity="0.95"/>
              <path d="M7 6V5a4 4 0 0 1 8 0v1" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <rect x="9" y="10" width="4" height="3" rx="1" fill="#E8593C"/>
            </svg>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111", marginBottom: "4px" }}>Create account</h1>
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>Join the YatVenture community</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Full name</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Bidhya Rai" required
              style={{ width: "100%", height: "42px", padding: "0 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" required
              style={{ width: "100%", height: "42px", padding: "0 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required minLength={6}
              style={{ width: "100%", height: "42px", padding: "0 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {error && <p style={{ fontSize: "13px", color: "#ef4444", textAlign: "center" }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ width: "100%", height: "44px", background: "#E8593C", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginTop: "4px" }}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#E8593C", fontWeight: "500", textDecoration: "none" }}>Login</Link>
        </p>
      </div>
    </div>
  )
}