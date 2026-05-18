'use client'
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

const badgeColors: Record<string, { bg: string; color: string }> = {
  post:      { bg: "#F1EFE8", color: "#5F5E5A" },
  itinerary: { bg: "#E1F5EE", color: "#0F6E56" },
  transport: { bg: "#E6F1FB", color: "#185FA5" },
  stay:      { bg: "#EEEDFE", color: "#3C3489" },
  tip:       { bg: "#FAEEDA", color: "#633806" },
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [comment, setComment] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    fetchPost()
    fetchCurrentUser()
  }, [id])

  async function fetchCurrentUser() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setCurrentUser(user)
  }

  async function fetchPost() {
    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from('posts')
      .select(`
        id, title, body, cover_image_url,
        type, tags, likes_count, created_at,
        users ( id, name, avatar_url )
      `)
      .eq('id', id)
      .single()

    if (error || !data) {
      setLoading(false)
      return
    }

    setPost(data)
    setLikeCount(data.likes_count || 0)
    setLoading(false)

    // Check if current user already liked
    const supabase2 = createClient()
    const { data: { user } } = await supabase2.auth.getUser()
    if (user) {
      const { data: existingLike } = await supabase2
        .from('likes')
        .select('user_id')
        .eq('user_id', user.id)
        .eq('post_id', id)
        .single()
      if (existingLike) setLiked(true)
    }
  }

  async function handleLike() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) { router.push('/login'); return }

    if (liked) {
      await supabase.from('likes').delete()
        .eq('user_id', user.id).eq('post_id', id)
      await supabase.from('posts')
        .update({ likes_count: likeCount - 1 }).eq('id', id)
      setLiked(false)
      setLikeCount(likeCount - 1)
    } else {
      await supabase.from('likes').insert({ user_id: user.id, post_id: id })
      await supabase.from('posts')
        .update({ likes_count: likeCount + 1 }).eq('id', id)
      setLiked(true)
      setLikeCount(likeCount + 1)
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ background: "#fff", borderRadius: "12px", padding: "24px" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#f3f4f6", marginBottom: "16px" }} />
            <div style={{ height: "24px", background: "#f3f4f6", borderRadius: "4px", marginBottom: "12px" }} />
            <div style={{ height: "300px", background: "#f3f4f6", borderRadius: "8px" }} />
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "40px", marginBottom: "12px" }}>😕</p>
          <p style={{ fontSize: "18px", fontWeight: "600", color: "#111", marginBottom: "8px" }}>Post not found</p>
          <Link href="/" style={{ color: "#E8593C", textDecoration: "none", fontSize: "14px" }}>← Back to home</Link>
        </div>
      </div>
    )
  }

  const badge = badgeColors[post.type] || badgeColors.post

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Back button */}
      <Link href="/" style={{
        position: "fixed", top: "20px", left: "20px", zIndex: 10,
        width: "38px", height: "38px",
        background: "#fff", border: "1px solid #e5e7eb",
        borderRadius: "50%", display: "flex",
        alignItems: "center", justifyContent: "center",
        textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "60px 24px 40px" }}>

        {/* Post card */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", marginBottom: "16px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "20px 20px 14px" }}>
            <img
              src={post.users?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.users?.name || "T")}&background=E8593C&color=fff`}
              alt={post.users?.name}
              style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "15px", fontWeight: "600", color: "#111", marginBottom: "2px" }}>
                {post.users?.name || "Traveler"}
              </p>
              <p style={{ fontSize: "12px", color: "#9ca3af" }}>{formatDate(post.created_at)}</p>
            </div>
            <span style={{
              fontSize: "11px", padding: "3px 12px", borderRadius: "99px",
              fontWeight: "500", background: badge.bg, color: badge.color,
            }}>
              {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
            </span>
          </div>

          {/* Title + body */}
          <div style={{ padding: "0 20px 14px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111", lineHeight: "1.4", marginBottom: "10px" }}>
              {post.title}
            </h1>
            <p style={{ fontSize: "15px", color: "#374151", lineHeight: "1.7" }}>
              {post.body}
            </p>
          </div>

          {/* Image */}
          {post.cover_image_url && (
            <img
              src={post.cover_image_url} alt={post.title}
              style={{ width: "100%", maxHeight: "420px", objectFit: "cover", display: "block" }}
            />
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ padding: "14px 20px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {post.tags.map((tag: string) => (
                <span key={tag} style={{ fontSize: "12px", padding: "3px 10px", background: "#f3f4f6", borderRadius: "99px", color: "#6b7280" }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Like + share row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 20px", borderTop: "1px solid #f3f4f6",
          }}>
            <button
              onClick={handleLike}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: liked ? "#FEF0EC" : "transparent",
                border: liked ? "1px solid #E8593C" : "1px solid #e5e7eb",
                borderRadius: "99px", padding: "7px 16px",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"
                fill={liked ? "#E8593C" : "none"}
                stroke="#E8593C" strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span style={{ fontSize: "14px", fontWeight: "500", color: liked ? "#E8593C" : "#374151" }}>
                {likeCount} {likeCount === 1 ? "like" : "likes"}
              </span>
            </button>
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{ padding: "7px 16px", border: "1px solid #e5e7eb", borderRadius: "99px", background: "transparent", fontSize: "13px", color: "#6b7280", cursor: "pointer" }}>
                Share
              </button>
              <button style={{ padding: "7px 16px", border: "1px solid #e5e7eb", borderRadius: "99px", background: "transparent", fontSize: "13px", color: "#6b7280", cursor: "pointer" }}>
                Save
              </button>
            </div>
          </div>

          {/* Comment input */}
          {currentUser && (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", borderTop: "1px solid #f3f4f6" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "#E8593C", color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "14px", fontWeight: "600", flexShrink: 0,
              }}>
                {currentUser.email?.charAt(0).toUpperCase()}
              </div>
              <div style={{
                flex: 1, display: "flex", alignItems: "center",
                border: "1px solid #e5e7eb", borderRadius: "99px",
                padding: "8px 16px", gap: "8px", background: "#fafafa",
              }}>
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  style={{ flex: 1, border: "none", outline: "none", fontSize: "13px", color: "#374151", background: "transparent" }}
                />
                <button style={{ background: "none", border: "none", fontSize: "13px", fontWeight: "600", color: "#E8593C", cursor: "pointer" }}>
                  Post
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Author card */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src={post.users?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.users?.name || "T")}&background=E8593C&color=fff`}
            alt={post.users?.name}
            style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "15px", fontWeight: "600", color: "#111", marginBottom: "3px" }}>
              {post.users?.name || "Traveler"}
            </p>
            <p style={{ fontSize: "13px", color: "#9ca3af" }}>Travel contributor on YatVenture</p>
          </div>
          <button style={{
            padding: "8px 20px", background: "#E8593C", color: "white",
            border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer",
          }}>
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}