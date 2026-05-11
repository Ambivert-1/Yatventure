'use client'
import { useState } from "react"

const popularPlaces = [
  { name: "Pokhara", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&h=60&fit=crop" },
  { name: "Kathmandu", img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=60&h=60&fit=crop" },
  { name: "Chitwan", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=60&h=60&fit=crop" },
]

const navItems = [
  {
    label: "Home",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    ),
  },
  {
    label: "My Trips",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    label: "Destination",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Book Hotels",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
]

export default function Sidebar() {
  const [active, setActive] = useState("Home")

  return (
    <aside style={{
      width: "180px",
      flexShrink: 0,
      borderRight: "1px solid #e5e7eb",
      minHeight: "calc(100vh - 60px)",
      padding: "20px 12px",
      background: "#fff",
    }}>
      {/* Nav items */}
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setActive(item.label)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "9px 12px",
            borderRadius: "8px",
            border: "none",
            background: active === item.label ? "#FEF0EC" : "transparent",
            color: active === item.label ? "#E8593C" : "#374151",
            fontSize: "14px",
            fontWeight: active === item.label ? "500" : "400",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
            marginBottom: "2px",
          }}
        >
          <span style={{ color: active === item.label ? "#E8593C" : "#6b7280" }}>
            {item.icon}
          </span>
          {item.label}
        </button>
      ))}

      {/* Popular places */}
      <div style={{ marginTop: "20px", padding: "0 4px" }}>
        <p style={{ fontSize: "13px", fontWeight: "600", color: "#111", marginBottom: "12px", padding: "0 8px" }}>
          Popular places
        </p>
        {popularPlaces.map((place) => (
          <div key={place.name} style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "6px 8px", borderRadius: "8px",
            cursor: "pointer",
          }}>
            <img
              src={place.img}
              alt={place.name}
              style={{ width: "36px", height: "36px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }}
            />
            <span style={{ fontSize: "14px", color: "#111" }}>{place.name}</span>
          </div>
        ))}
      </div>

      {/* Book now */}
      <button style={{
        marginTop: "20px",
        padding: "10px",
        background: "#111",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        width: "100%",
      }}>
        Book now!
      </button>
    </aside>
  )
}