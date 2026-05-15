'use client'
import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

// Destination data — later this comes from Supabase
const destinationData: Record<string, {
  name: string
  district: string
  img: string
  description: string
}> = {
  "peace-pagoda": {
    name: "Peace Pagoda",
    district: "Pokhara",
    img: "https://images.unsplash.com/photo-1605131570707-02b7020c5c1a?w=1200&h=400&fit=crop",
    description: "The World Peace Pagoda in Pokhara sits atop a hill overlooking Phewa Lake with stunning views of the Annapurna range.",
  },
  "namche-bajar": {
    name: "Namche Bajar",
    district: "Solukhumbu",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=400&fit=crop",
    description: "The gateway to Everest, Namche Bazaar is a bustling mountain town and the main trading hub for the Khumbu region.",
  },
  "gosaikunda": {
    name: "Gosaikunda",
    district: "Rasuwa",
    img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=1200&h=400&fit=crop",
    description: "A sacred alpine lake at 4,380m, Gosaikunda is a holy Hindu pilgrimage site surrounded by stunning Himalayan scenery.",
  },
  "bouddha": {
    name: "Bouddha",
    district: "Kathmandu",
    img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&h=400&fit=crop",
    description: "One of the largest Buddhist stupas in the world, Boudhanath is the spiritual center of Tibetan Buddhism in Nepal.",
  },
  "muktinath": {
    name: "Muktinath",
    district: "Mustang",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
    description: "A sacred site for both Hindus and Buddhists at 3,800m, Muktinath sits in the rain shadow of the Himalayas.",
  },
}

// Sample posts per destination
const samplePosts = [
  {
    id: 1,
    author: "Bidhya Rai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    date: "12 April, 2024",
    body: "Absolutely breathtaking views. Woke up at 5am for sunrise and it was worth every step.",
    img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800&h=400&fit=crop",
    likes: 20,
    type: "post",
  },
  {
    id: 2,
    author: "Sagar Khatri",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    date: "10 April, 2024",
    body: "Full itinerary here — 3 days including transport from Kathmandu, where to stay, and what to eat.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop",
    likes: 45,
    type: "itinerary",
  },
]

const sampleStays = [
  { id: 1, name: "Mountain View Lodge", price: "NPR 800/night", rating: "4.2", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop" },
  { id: 2, name: "Himalayan Guesthouse", price: "NPR 600/night", rating: "4.0", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=150&fit=crop" },
]

const sampleTransport = [
  { id: 1, from: "Kathmandu", seats: 3, price: "NPR 1,500", time: "Sat 6:00 AM", type: "Jeep" },
  { id: 2, from: "Pokhara", seats: 2, price: "NPR 800", time: "Sun 7:00 AM", type: "Bus" },
]

const TABS = ["Posts", "Stays", "Transport"]

export default function DestinationPage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState("Posts")

  const dest = destinationData[slug] || {
    name: slug.replace(/-/g, " "),
    district: "Nepal",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=400&fit=crop",
    description: "Explore this beautiful destination in Nepal.",
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Back button */}
      <Link href="/" style={{
        position: "fixed", top: "20px", left: "20px", zIndex: 10,
        width: "38px", height: "38px",
        background: "#fff", border: "1px solid #e5e7eb",
        borderRadius: "50%", display: "flex",
        alignItems: "center", justifyContent: "center",
        textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      {/* Hero image */}
      <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
        <img
          src={dest.img} alt={dest.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
          padding: "40px 32px 24px",
        }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "4px" }}>{dest.district}</p>
          <h1 style={{ fontSize: "32px", fontWeight: "700", color: "white" }}>{dest.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>

        {/* Description */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
          <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7" }}>{dest.description}</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "2px solid #e5e7eb", marginBottom: "20px" }}>
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "8px 20px", fontSize: "14px", border: "none",
              borderBottom: activeTab === tab ? "2px solid #E8593C" : "2px solid transparent",
              background: "transparent",
              color: activeTab === tab ? "#E8593C" : "#6b7280",
              fontWeight: activeTab === tab ? "600" : "400",
              cursor: "pointer", marginBottom: "-2px",
            }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Posts tab */}
        {activeTab === "Posts" && (
          <div>
            {samplePosts.map((post) => (
              <div key={post.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", marginBottom: "16px", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px 10px" }}>
                  <img src={post.avatar} alt={post.author} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>{post.author}</p>
                    <p style={{ fontSize: "12px", color: "#9ca3af" }}>{post.date}</p>
                  </div>
                  {post.type !== "post" && (
                    <span style={{ fontSize: "11px", padding: "2px 10px", borderRadius: "99px", background: "#E1F5EE", color: "#0F6E56", fontWeight: "500" }}>
                      {post.type}
                    </span>
                  )}
                </div>
                <p style={{ padding: "0 16px 12px", fontSize: "14px", color: "#374151", lineHeight: "1.5" }}>{post.body}</p>
                {post.img && <img src={post.img} alt="post" style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }} />}
                <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "14px", color: "#E8593C" }}>♥</span>
                  <span style={{ fontSize: "14px", color: "#374151" }}>{post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stays tab */}
        {activeTab === "Stays" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {sampleStays.map((stay) => (
              <div key={stay.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
                <img src={stay.img} alt={stay.name} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                <div style={{ padding: "14px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#111", marginBottom: "4px" }}>{stay.name}</p>
                  <p style={{ fontSize: "13px", color: "#E8593C", fontWeight: "500", marginBottom: "4px" }}>{stay.price}</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af" }}>★ {stay.rating}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transport tab */}
        {activeTab === "Transport" && (
          <div>
            {sampleTransport.map((t) => (
              <div key={t.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px", marginBottom: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: "600", color: "#111", marginBottom: "4px" }}>{t.from} → Destination</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af" }}>{t.type} · {t.time} · {t.seats} seats left</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "15px", fontWeight: "600", color: "#111", marginBottom: "6px" }}>{t.price}</p>
                  <button style={{ padding: "6px 14px", background: "#E8593C", color: "white", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: "500", cursor: "pointer" }}>
                    Request seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}