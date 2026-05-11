'use client'
import { useState } from "react"

type Props = {
  id: number
  type: string
  author: string
  date: string
  body: string
  img: string
  likes: number
  comments: number
  shares: number
  avatar: string
}

const badgeColors: Record<string, { bg: string; color: string }> = {
  post:      { bg: "#F1EFE8", color: "#5F5E5A" },
  itinerary: { bg: "#E1F5EE", color: "#0F6E56" },
  transport: { bg: "#E6F1FB", color: "#185FA5" },
}

export default function PostCard({ type, author, date, body, img, likes, comments, shares, avatar }: Props) {
  return (
    <div style={{ padding: "16px", background: "#fff", borderRadius: "8px", marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
        <img src={avatar} alt={author} style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "12px" }} />
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: "600", fontSize: "14px", color: "#111", margin: 0 }}>{author}</p>
          <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{date}</p>
        </div>
        <span style={{ ...badgeColors[type], padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" }}>
          {type}
        </span>
      </div>
      <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#111", marginBottom: "12px" }}>{body}</p>
      {img && <img src={img} alt="" style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }} />}
      <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "#6b7280" }}>
        <span>👍 {likes}</span>
        <span>💬 {comments}</span>
        <span>↗️ {shares}</span>
      </div>
    </div>
  )
}
