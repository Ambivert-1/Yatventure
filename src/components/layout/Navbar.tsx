'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      height: "64px",
      display: "flex",
      alignItems: "center",
      padding: "0 32px",
      gap: "24px",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>

      <Link href="/">
        <img
          src="/images/logo.png"
          alt="YatVenture"
          style={{ height: "52px", width: "auto", display: "block", cursor: "pointer" }}
        />
      </Link>

      {/* SEARCH */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSearch} style={{ width: "100%", maxWidth: "560px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            height: "40px", padding: "0 18px",
            border: "1px solid #d1d5db", borderRadius: "8px",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35" strokeLinecap="round"/>
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations, trips..."
              style={{ flex: 1, border: "none", outline: "none", fontSize: "14px", color: "#374151", background: "transparent" }}
            />
          </div>
        </form>
      </div>

      {/* AUTH — fixed hydration */}
      <div style={{ flexShrink: 0, display: "flex", gap: "10px", alignItems: "center" }}>
        {!mounted ? (
          // Same placeholder on both server and client — no mismatch
          <div style={{ width: "220px", height: "38px" }} />
        ) : user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "50%",
                background: "#E8593C", color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "15px", fontWeight: "600", cursor: "pointer",
              }}>
                {user.email?.charAt(0).toUpperCase()}
              </div>
            </Link>
            <button
              onClick={handleLogout}
              style={{ padding: "7px 16px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "transparent", color: "#374151", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <button style={{ width: "100px", height: "38px", border: "1.5px solid #E8593C", borderRadius: "8px", background: "transparent", color: "#E8593C", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button style={{ width: "100px", height: "38px", border: "1.5px solid #E8593C", borderRadius: "8px", background: "#E8593C", color: "white", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}