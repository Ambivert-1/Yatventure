'use client'
import { useState, useRef } from "react"
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import TrendingSidebar from "@/components/layout/TrendingSidebar"
import ComposeBox from "@/components/feed/ComposeBox"
import PostCard from "@/components/feed/PostCard"
import DestinationCard from "@/components/feed/DestinationCard"

const destinations = [
  { name: "Peace Pagoda",  district: "Pokhara",    img: "https://images.unsplash.com/photo-1605131570707-02b7020c5c1a?w=300&h=300&fit=crop" },
  { name: "Namche Bajar",  district: "Solukhumbu", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=300&h=300&fit=crop" },
  { name: "Gosaikunda",    district: "Rasuwa",     img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=300&h=300&fit=crop" },
  { name: "Bouddha",       district: "Kathmandu",  img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=300&h=300&fit=crop" },
  { name: "Muktinath",     district: "Mustang",    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop" },
  { name: "Rara Lake",     district: "Mugu",       img: "https://images.unsplash.com/photo-1585016495481-91613bde4a72?w=300&h=300&fit=crop" },
  { name: "Everest Base",  district: "Solukhumbu", img: "https://images.unsplash.com/photo-1516208813382-f4f8f86dc902?w=300&h=300&fit=crop" },
]

const posts = [
  {
    id: 1, type: "post",
    author: "Bidhya Rai", date: "12 April, 2024",
    body: "It's not just about the destination. It's about the early morning sunrises.",
    img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=900&h=500&fit=crop",
    likes: 20, comments: 2, shares: 3,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  },
  {
    id: 2, type: "itinerary",
    author: "Sagar Khatri", date: "10 April, 2024",
    body: "7-day Annapurna Circuit — transport, stays, and cost per day all mapped out.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&h=500&fit=crop",
    likes: 45, comments: 8, shares: 12,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  },
  {
    id: 3, type: "transport",
    author: "Ram Prasad", date: "9 April, 2024",
    body: "Shared jeep going Pokhara → Jomsom this Saturday. 3 seats left. NPR 1,500 per seat.",
    img: "",
    likes: 5, comments: 3, shares: 1,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
  },
  {
    id: 4, type: "stay",
    author: "Maya Lama", date: "8 April, 2024",
    body: "Great little guesthouse in Namche — clean, hot water, mountain views. NPR 800/night.",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&h=500&fit=crop",
    likes: 31, comments: 6, shares: 4,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
  },
]

const AVATAR = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
const TABS = ["All", "Itineraries", "Transport", "Stays", "Tips"]
const TAB_MAP: Record<string, string> = {
  "All": "all", "Itineraries": "itinerary",
  "Transport": "transport", "Stays": "stay", "Tips": "tip",
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("All")
  // useRef gives us a reference to the scrollable div
  // so we can programmatically scroll it left/right
  const scrollRef = useRef<HTMLDivElement>(null)

  const filteredPosts = activeTab === "All"
    ? posts
    : posts.filter((p) => p.type === TAB_MAP[activeTab])

  // Scroll left by 300px when left arrow clicked
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  // Scroll right by 300px when right arrow clicked
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Navbar />

      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "28px 32px", minWidth: 0 }}>

          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#111", marginBottom: "16px" }}>
            Top destinations
          </h2>

          {/*
            SCROLLABLE ROW WITH ARROW BUTTONS
            position: relative on wrapper so arrows can be
            positioned absolutely on left and right edges
          */}
          <div style={{ position: "relative", marginBottom: "28px" }}>

            {/* LEFT ARROW — scrolls back to start */}
            <button
              onClick={scrollLeft}
              style={{
                position: "absolute", left: "-14px", top: "50%",
                transform: "translateY(-60%)",
                zIndex: 2,
                width: "32px", height: "32px", borderRadius: "50%",
                background: "#fff", border: "1px solid #e5e7eb",
                cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* SCROLLABLE CARDS ROW */}
            <div
              ref={scrollRef}
              style={{
                display: "flex",
                gap: "14px",
                overflowX: "auto",
                paddingBottom: "8px",
                scrollbarWidth: "none",
              }}
            >
              {destinations.map((d) => (
                <div key={d.name} style={{ flexShrink: 0, width: "150px" }}>
                  <DestinationCard name={d.name} district={d.district} img={d.img} />
                </div>
              ))}
            </div>

            {/* RIGHT ARROW */}
            <button
              onClick={scrollRight}
              style={{
                position: "absolute", right: "-14px", top: "50%",
                transform: "translateY(-60%)",
                zIndex: 2,
                width: "32px", height: "32px", borderRadius: "50%",
                background: "#fff", border: "1px solid #e5e7eb",
                cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Feed tabs */}
          <div style={{ display: "flex", borderBottom: "2px solid #e5e7eb", marginBottom: "16px" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "8px 18px", fontSize: "14px", border: "none",
                  borderBottom: activeTab === tab ? "2px solid #E8593C" : "2px solid transparent",
                  background: "transparent",
                  color: activeTab === tab ? "#E8593C" : "#6b7280",
                  fontWeight: activeTab === tab ? "600" : "400",
                  cursor: "pointer", marginBottom: "-2px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <ComposeBox avatar={AVATAR} />

          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontSize: "14px" }}>
              No posts in this category yet.
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))
          )}
        </main>

        <TrendingSidebar />
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}