'use client'
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError("Invalid email or password")
      setLoading(false)
      return
    }
    router.push("/")
    router.refresh()
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>

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

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <img
            src="/images/logo.png"
            alt="YatVenture"
            style={{ height: "52px", width: "auto", margin: "0 auto 16px", display: "block" }}
          />
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111", marginBottom: "4px" }}>Welcome back</h1>
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>Login to your YatVenture account</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
              Email
            </label>
            <input
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" required
              style={{ width: "100%", height: "42px", padding: "0 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required
              style={{ width: "100%", height: "42px", padding: "0 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {error && (
            <p style={{ fontSize: "13px", color: "#ef4444", background: "#fef2f2", padding: "10px 12px", borderRadius: "8px" }}>
              {error}
            </p>
          )}

          <button
            type="submit" disabled={loading}
            style={{ width: "100%", height: "44px", background: loading ? "#f0a090" : "#E8593C", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", marginTop: "4px" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginTop: "20px" }}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "#E8593C", fontWeight: "600", textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}