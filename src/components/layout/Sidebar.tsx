'use client'
import { useState } from "react"

const popularPlaces = [
  { name: "Pokhara",   img: "https://images.unsplash.com/photo-1562462181-b228e3cff9ad?q=80&w=1310&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Kathmandu", img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1333&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { name: "Chitwan",   img: "https://images.unsplash.com/photo-1659343295253-be5b4458073a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
]

const navItems = [
  {
    label: "Home",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  },
  {
    label: "My Trips",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  {
    label: "Destination",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeLinecap="round"/></svg>,
  },
  {
    label: "Book Hotels",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
  },
]

export default function Sidebar() {
  const [active, setActive] = useState("Home")

  return (
    <aside style={{
      width: "230px",
      flexShrink: 0,
      borderRight: "1px solid #e5e7eb",
      minHeight: "calc(100vh - 64px)",
      padding: "28px 18px",  // more padding = more breathing room
      background: "#fff",
    }}>

      {/* Nav items — more vertical spacing between each */}
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setActive(item.label)}
          style={{
            display: "flex", alignItems: "center", gap: "14px",
            padding: "11px 16px",  // taller rows
            borderRadius: "10px", border: "none",
            background: active === item.label ? "#FEF0EC" : "transparent",
            color: active === item.label ? "#E8593C" : "#374151",
            fontSize: "14px",
            fontWeight: active === item.label ? "600" : "400",
            cursor: "pointer", width: "100%", textAlign: "left",
            marginBottom: "4px",  // space between nav items
          }}
        >
          <span style={{ color: active === item.label ? "#E8593C" : "#6b7280", flexShrink: 0 }}>
            {item.icon}
          </span>
          {item.label}
        </button>
      ))}

      {/* Section divider */}
      <div style={{ height: "1px", background: "#f3f4f6", margin: "20px 0" }} />

      {/* Popular places */}
      <p style={{ fontSize: "13px", fontWeight: "700", color: "#111", marginBottom: "16px", padding: "0 16px" }}>
        Popular places
      </p>
      {popularPlaces.map((place) => (
        <div key={place.name} style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "9px 16px", borderRadius: "10px", cursor: "pointer",
          marginBottom: "4px",
        }}>
          <img
            src={place.img} alt={place.name}
            style={{ width: "38px", height: "38px", borderRadius: "8px", objectFit: "cover", flexShrink: 0 }}
          />
          <span style={{ fontSize: "14px", color: "#111" }}>{place.name}</span>
        </div>
      ))}

      {/* Book now button */}
      <div style={{ padding: "20px 0 0" }}>
        <button style={{
          padding: "12px", background: "#111",
          color: "white", border: "none", borderRadius: "10px",
          fontSize: "14px", fontWeight: "600", cursor: "pointer", width: "100%",
        }}>
          Book now!
        </button>
      </div>
    </aside>
  )
}