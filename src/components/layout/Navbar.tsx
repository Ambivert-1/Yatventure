export default function Navbar() {
  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      height: "60px",
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      gap: "16px",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <div style={{
          width: "36px", height: "36px",
          background: "#E8593C",
          borderRadius: "10px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
            <rect x="2" y="6" width="18" height="13" rx="2" fill="white" fillOpacity="0.95"/>
            <path d="M7 6V5a4 4 0 0 1 8 0v1" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <rect x="9" y="10" width="4" height="3" rx="1" fill="#E8593C"/>
          </svg>
        </div>
        <span style={{ fontSize: "18px", fontWeight: "600", color: "#111", letterSpacing: "-0.3px" }}>
          atventure
        </span>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: "480px", margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          height: "38px", padding: "0 14px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          background: "#fff",
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: "14px", color: "#9ca3af" }}>Top destinations</span>
        </div>
      </div>

      {/* Auth buttons */}
      <div style={{ marginLeft: "auto", display: "flex", gap: "10px", alignItems: "center" }}>
        <button style={{
          padding: "7px 18px",
          border: "1.5px solid #E8593C",
          borderRadius: "8px",
          background: "transparent",
          color: "#E8593C",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}>Login</button>
        <button style={{
          padding: "7px 18px",
          border: "none",
          borderRadius: "8px",
          background: "#E8593C",
          color: "white",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
        }}>Sign Up</button>
      </div>
    </nav>
  )
}