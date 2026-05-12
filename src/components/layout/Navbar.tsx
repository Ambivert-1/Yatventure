// src/components/layout/Navbar.tsx

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

      {/* ── LOGO ──
        Your Figma logo goes here.
        Step 1: In Figma, click your logo group
        Step 2: Right panel bottom → Export → PNG 2x → Export
        Step 3: In VS Code, right-click public folder → New Folder → name it "images"
        Step 4: Drag logo file into public/images/ folder
        Step 5: Rename it logo.png
        It will appear automatically — no code change needed.
        
        Until then, the text logo shows as fallback.
      */}
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="/images/logo.png"
          alt="YatVenture"
          style={{ height: "36px", width: "auto", display: "block" }}
          onError={(e) => { e.currentTarget.style.display = "none" }}
        />
        {/* Text fallback — always visible, sits next to image */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "34px", height: "34px",
            background: "#E8593C", borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="18" viewBox="0 0 22 20" fill="none">
              <rect x="2" y="6" width="18" height="13" rx="2" fill="white" fillOpacity="0.95"/>
              <path d="M7 6V5a4 4 0 0 1 8 0v1" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
              <rect x="9" y="10" width="4" height="3" rx="1" fill="#E8593C"/>
            </svg>
          </div>
          <span style={{ fontSize: "17px", fontWeight: "600", color: "#111" }}>atventure</span>
        </div>
      </div>

      {/* ── SEARCH BAR — centered ── */}
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

      {/* ── AUTH BUTTONS — same size ── */}
      <div style={{ flexShrink: 0, display: "flex", gap: "10px", alignItems: "center" }}>
        <button style={{
          width: "100px", height: "38px",
          border: "1.5px solid #E8593C", borderRadius: "8px",
          background: "transparent", color: "#E8593C",
          fontSize: "14px", fontWeight: "500", cursor: "pointer",
        }}>Login</button>
        <button style={{
          width: "100px", height: "38px",
          border: "1.5px solid #E8593C", borderRadius: "8px",
          background: "#E8593C", color: "white",
          fontSize: "14px", fontWeight: "600", cursor: "pointer",
        }}>Sign Up</button>
      </div>
    </nav>
  )
}