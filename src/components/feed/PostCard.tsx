'use client'
import { useState } from "react"

// ─────────────────────────────────────────────────────────────
// TYPE — defines what data this component expects to receive.
// This is TypeScript. It means: whoever uses <PostCard />
// MUST pass these props with these exact types.
// string = text, number = number, boolean = true/false
// ─────────────────────────────────────────────────────────────
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

// Badge colors per post type — matches your design
const badgeColors: Record<string, { bg: string; color: string }> = {
  post:      { bg: "#F1EFE8", color: "#5F5E5A" },
  itinerary: { bg: "#E1F5EE", color: "#0F6E56" },
  transport: { bg: "#E6F1FB", color: "#185FA5" },
  stay:      { bg: "#EEEDFE", color: "#3C3489" },
  tip:       { bg: "#FAEEDA", color: "#633806" },
}

export default function PostCard({ type, author, date, body, img, likes, comments, shares, avatar }: Props) {
  // Two pieces of state:
  // liked — is the heart filled or not
  // likeCount — the number shown next to the heart
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const badge = badgeColors[type] || badgeColors.post

  const handleLike = () => {
    // Toggle liked state and adjust count accordingly
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      marginBottom: "16px",
      overflow: "hidden", // clips the image to rounded corners
    }}>

      {/* ── POST HEADER: avatar + name + date + badge + menu ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px 10px" }}>
        <img
          src={avatar} alt={author}
          style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
        />
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "14px", fontWeight: "600", color: "#111", marginBottom: "2px" }}>{author}</p>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>{date}</p>
        </div>

        {/* Type badge — only shows if not a plain "post" */}
        {type !== "post" && (
          <span style={{
            fontSize: "11px", padding: "3px 10px", borderRadius: "99px",
            fontWeight: "500", background: badge.bg, color: badge.color,
          }}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        )}

        {/* Three dot menu button */}
        <button style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 8px", color: "#6b7280" }}>
          <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor">
            <circle cx="2" cy="2" r="1.5"/>
            <circle cx="2" cy="8" r="1.5"/>
            <circle cx="2" cy="14" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* ── POST BODY TEXT ── */}
      <p style={{ padding: "0 16px 12px", fontSize: "14px", color: "#374151", lineHeight: "1.55" }}>
        {body}
      </p>

      {/* ── POST IMAGE — only renders if img exists ── */}
      {img && img !== "" && (
        <img
          src={img} alt="post photo"
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover", display: "block" }}
        />
      )}

      {/* ── LIKES ROW — heart + count + comments + shares ── */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
      }}>
        {/* Heart button + count — matches your Figma exactly */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <button
            onClick={handleLike}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
          >
            {/* Heart SVG — filled when liked, outline when not */}
            <svg width="20" height="20" viewBox="0 0 24 24"
              fill={liked ? "#E8593C" : "none"}
              stroke="#E8593C" strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>{likeCount}</span>
        </div>

        {/* Comments and shares — right side */}
        <div style={{ display: "flex", gap: "16px" }}>
          <span style={{ fontSize: "13px", color: "#9ca3af" }}>{comments} comments</span>
          <span style={{ fontSize: "13px", color: "#9ca3af" }}>{shares} shares</span>
        </div>
      </div>

      {/* ── COMMENT INPUT — matches your Figma design ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "10px 16px 14px",
        borderTop: "1px solid #f3f4f6",
      }}>
        <img
          src={avatar} alt="you"
          style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
        />
        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          border: "1px solid #e5e7eb", borderRadius: "99px",
          padding: "8px 14px", gap: "8px", background: "#fafafa",
        }}>
          {/* Smiley face icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 13s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9" strokeLinecap="round" strokeWidth="2.5"/>
            <line x1="15" y1="9" x2="15.01" y2="9" strokeLinecap="round" strokeWidth="2.5"/>
          </svg>
          <span style={{ fontSize: "13px", color: "#9ca3af", flex: 1 }}>Add a comment...</span>
          <button style={{
            background: "none", border: "none",
            fontSize: "13px", fontWeight: "600",
            color: "#9ca3af", cursor: "pointer",
          }}>
            Comment
          </button>
        </div>
      </div>
    </div>
  )
}