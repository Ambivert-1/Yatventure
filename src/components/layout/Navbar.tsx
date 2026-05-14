import Link from "next/link"

export default function Navbar() {
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

      {/* LOGO — clicking goes to home */}
      <Link href="/">
        <img
          src="/images/logo.png"
          alt="YatVenture"
          style={{ height: "52px", width: "auto", display: "block", cursor: "pointer" }}
        />
      </Link>

      {/* SEARCH BAR */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          height: "40px", padding: "0 18px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          background: "#fff",
          width: "100%",
          maxWidth: "560px",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35" strokeLinecap="round"/>
          </svg>
          <input
            placeholder="Top destinations"
            style={{
              flex: 1, border: "none", outline: "none",
              fontSize: "14px", color: "#374151",
              background: "transparent",
            }}
          />
        </div>
      </div>

      {/* AUTH BUTTONS */}
      <div style={{ flexShrink: 0, display: "flex", gap: "10px", alignItems: "center" }}>
        <Link href="/login">
          <button style={{
            width: "100px", height: "38px",
            border: "1.5px solid #E8593C", borderRadius: "8px",
            background: "transparent", color: "#E8593C",
            fontSize: "14px", fontWeight: "500", cursor: "pointer",
          }}>Login</button>
        </Link>
        <Link href="/signup">
          <button style={{
            width: "100px", height: "38px",
            border: "1.5px solid #E8593C", borderRadius: "8px",
            background: "#E8593C", color: "white",
            fontSize: "14px", fontWeight: "600", cursor: "pointer",
          }}>Sign Up</button>
        </Link>
      </div>
    </nav>
  )
}