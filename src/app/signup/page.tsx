'use client'
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        name,
        email,
        role: 'traveler',
      })
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <div style={{ width: "60px", height: "60px", background: "#E1F5EE", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111", marginBottom: "8px" }}>Check your email</h2>
          <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "24px", lineHeight: "1.6" }}>
            We sent a confirmation link to <strong style={{ color: "#374151" }}>{email}</strong>.<br/>
            Click it to activate your account.
          </p>
          <Link href="/login" style={{ display: "inline-block", padding: "10px 24px", background: "#E8593C", color: "white", borderRadius: "8px", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
            Go to login →
          </Link>
        </div>
      </div>
    )
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
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111", marginBottom: "4px" }}>Create account</h1>
          <p style={{ fontSize: "14px", color: "#9ca3af" }}>Join the YatVenture community</p>
        </div>

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
              Full name
            </label>
            <input
              type="text" value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bidhya Rai" required
              style={{ width: "100%", height: "42px", padding: "0 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
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
              placeholder="••••••••" required minLength={6}
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
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#E8593C", fontWeight: "600", textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}