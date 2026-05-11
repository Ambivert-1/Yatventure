'use client'
import { useState } from "react"
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import TrendingSidebox from "@/components/layout/TrendingSidebar"
import ComposeBox from "@/components/feed/ComposeBox"
import PostCard from "@/components/feed/PostCard"
import DestinationCard from "@/components/feed/DestinationCard"

const destinations = [
  { name: "Peace Pagoda", district: "Pokhara", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
  { name: "Namche Bajar", district: "Solukhumbu", img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=200&fit=crop" },
  { name: "Gosaikunda", district: "Rasuwa", img: "https://images.unsplash.com/photo-1626196344133-1b8b8a3f66ea?w=200&h=200&fit=crop" },
  { name: "Bouddha", district: "Kathmandu", img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=200&h=200&fit=crop" },
  { name: "Muktinath", district: "Mustang", img: "https://images.unsplash.com/photo-1560258018-c7db7645254e?w=200&h=200&fit=crop" },
]

const posts = [
  {
    id: 1,
    type: "post",
    author: "Bidhya Rai",
    date: "12 April, 2024",
    body: "It's not just about the destination. It's about the early morning sunrises.",
    img: "https://images.unsplash.com/photo-1626196344133-1b8b8a3f66ea?w=800&h=400&fit=crop",
    likes: 20,
    comments: 2,
    shares: 3,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop",
  },
  {
    id: 2,
    type: "itinerary",
    author: "Sagar Khatri",
    date: "10 April, 2024",
    body: "7-day Annapurna Circuit — transport, stays, and cost per day all mapped out.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=400&fit=crop",
    likes: 45,
    comments: 8,
    shares: 12,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
  },
]

const AVATAR = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop"

export default function HomePage() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "24px 28px", minWidth: 0 }}>
          <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#111", marginBottom: "16px" }}>
            Top destinations
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", marginBottom: "28px" }}>
            {destinations.map((d) => (
              <DestinationCard key={d.name} name={d.name} district={d.district} img={d.img} />
            ))}
          </div>
          <ComposeBox avatar={AVATAR} />
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </main>
        <TrendingSidebox />
      </div>
    </div>
  )
}