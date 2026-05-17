'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

const DESTINATIONS = [
  "Peace Pagoda", "Namche Bajar", "Gosaikunda",
  "Bouddha", "Muktinath", "Rara Lake", "Everest Base Camp",
  "Pokhara", "Kathmandu", "Chitwan", "Mustang", "Ilam",
]

const POST_TYPES = [
  { value: "post",      label: "Trip Post",   color: "#F1EFE8", text: "#5F5E5A" },
  { value: "itinerary", label: "Itinerary",   color: "#E1F5EE", text: "#0F6E56" },
  { value: "transport", label: "Transport",   color: "#E6F1FB", text: "#185FA5" },
  { value: "stay",      label: "Stay",        color: "#EEEDFE", text: "#3C3489" },
  { value: "tip",       label: "Travel Tip",  color: "#FAEEDA", text: "#633806" },
]

export default function CreatePostPage() {
  const router = useRouter()
  const [type, setType] = useState("post")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [destination, setDestination] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [preview, setPreview] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const supabase = createClient()

    // Check user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError("You must be logged in to post")
      setLoading(false)
      return
    }

    // Get user row from users table
    const { data: userRow } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!userRow) {
      setError("User profile not found. Please log out and log back in.")
      setLoading(false)
      return
    }

    // Convert tags string to array
    // "trekking, nepal, mountains" → ["trekking", "nepal", "mountains"]
    const tagsArray = tags
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0)

    // Insert post into Supabase
    const { data: post, error: insertError } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        title,
        body,
        cover_image_url: imgUrl || null,
        type,
        tags: tagsArray,
        likes_count: 0,
      })
      .select()
      .single()

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    // Success — go to home page
    router.push("/")
    router.refresh()
  }

  const selectedType = POST_TYPES.find(t => t.value === type)!

  return (
    <div style={{
      minHeight: "100vh", background: "#f9fafb",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>

      {/* Top bar */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        height: "60px", display: "flex", alignItems: "center",
        padding: "0 24px", gap: "16px", position: "sticky", top: 0, zIndex: 50,
      }}>
        <Link href="/" style={{
          width: "36px", height: "36px", borderRadius: "50%",
          background: "#f9fafb", border: "1px solid #e5e7eb",
          display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 style={{ fontSize: "16px", fontWeight: "600", color: "#111", flex: 1 }}>
          Create a post
        </h1>
        <button
          onClick={() => setPreview(!preview)}
          style={{
            padding: "7px 16px", border: "1px solid #e5e7eb",
            borderRadius: "8px", background: "transparent",
            color: "#374151", fontSize: "13px", cursor: "pointer",
          }}
        >
          {preview ? "Edit" : "Preview"}
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || !title.trim() || !body.trim()}
          style={{
            padding: "7px 20px",
            background: loading || !title.trim() || !body.trim() ? "#f0a090" : "#E8593C",
            color: "white", border: "none", borderRadius: "8px",
            fontSize: "13px", fontWeight: "600",
            cursor: loading || !title.trim() || !body.trim() ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "28px 24px" }}>

        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: "8px", padding: "12px 16px",
            fontSize: "13px", color: "#ef4444", marginBottom: "20px",
          }}>
            {error}
          </div>
        )}

        {/* POST TYPE SELECTOR */}
        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontSize: "13px", fontWeight: "500", color: "#374151", marginBottom: "10px" }}>
            What are you sharing?
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {POST_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                style={{
                  padding: "6px 14px", borderRadius: "99px",
                  border: type === t.value ? "2px solid #E8593C" : "1.5px solid #e5e7eb",
                  background: type === t.value ? t.color : "transparent",
                  color: type === t.value ? t.text : "#6b7280",
                  fontSize: "13px", fontWeight: type === t.value ? "600" : "400",
                  cursor: "pointer",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {preview ? (
          /* PREVIEW MODE */
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px 10px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#E8593C", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "600", fontSize: "16px" }}>
                Y
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>You</p>
                <p style={{ fontSize: "12px", color: "#9ca3af" }}>Just now</p>
              </div>
              <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "99px", background: selectedType.color, color: selectedType.text, fontWeight: "500" }}>
                {selectedType.label}
              </span>
            </div>
            <div style={{ padding: "0 16px 6px" }}>
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#111", marginBottom: "6px" }}>{title || "Your title here"}</p>
              <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.6" }}>{body || "Your post content here..."}</p>
            </div>
            {imgUrl && (
              <img src={imgUrl} alt="preview" style={{ width: "100%", maxHeight: "360px", objectFit: "cover", display: "block", marginTop: "10px" }} />
            )}
            {tags && (
              <div style={{ padding: "12px 16px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {tags.split(",").map(t => t.trim()).filter(Boolean).map(tag => (
                  <span key={tag} style={{ fontSize: "12px", padding: "2px 10px", background: "#f3f4f6", borderRadius: "99px", color: "#6b7280" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* EDIT MODE */
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Title */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                Title <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. My 7 days in Annapurna Circuit"
                required
                style={{
                  width: "100%", padding: "10px 14px",
                  border: "1px solid #d1d5db", borderRadius: "8px",
                  fontSize: "15px", outline: "none", boxSizing: "border-box",
                  color: "#111",
                }}
              />
            </div>

            {/* Body */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                Your story <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Share your experience, tips, route details..."
                required
                rows={8}
                style={{
                  width: "100%", padding: "12px 14px",
                  border: "1px solid #d1d5db", borderRadius: "8px",
                  fontSize: "14px", outline: "none", boxSizing: "border-box",
                  color: "#111", lineHeight: "1.6", resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Photo URL */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                Photo URL <span style={{ color: "#9ca3af", fontWeight: "400" }}>(optional)</span>
              </label>
              <input
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                style={{
                  width: "100%", padding: "10px 14px",
                  border: "1px solid #d1d5db", borderRadius: "8px",
                  fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#111",
                }}
              />
              {/* Image preview */}
              {imgUrl && (
                <img
                  src={imgUrl} alt="preview"
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginTop: "8px" }}
                  onError={(e) => { e.currentTarget.style.display = "none" }}
                />
              )}
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "6px" }}>
                Tip: Upload your photo to{" "}
                <a href="https://imgbb.com" target="_blank" rel="noreferrer" style={{ color: "#E8593C" }}>imgbb.com</a>
                {" "}and paste the link here
              </p>
            </div>

            {/* Destination */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                Destination <span style={{ color: "#9ca3af", fontWeight: "400" }}>(optional)</span>
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px",
                  border: "1px solid #d1d5db", borderRadius: "8px",
                  fontSize: "14px", outline: "none", boxSizing: "border-box",
                  color: destination ? "#111" : "#9ca3af",
                  background: "#fff",
                }}
              >
                <option value="">Select a destination</option>
                {DESTINATIONS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label style={{ fontSize: "13px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>
                Tags <span style={{ color: "#9ca3af", fontWeight: "400" }}>(optional)</span>
              </label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="trekking, nepal, mountains, budget"
                style={{
                  width: "100%", padding: "10px 14px",
                  border: "1px solid #d1d5db", borderRadius: "8px",
                  fontSize: "14px", outline: "none", boxSizing: "border-box", color: "#111",
                }}
              />
              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
                Separate tags with commas — these power the trending sidebar
              </p>
              {/* Tag preview */}
              {tags && (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "8px" }}>
                  {tags.split(",").map(t => t.trim()).filter(Boolean).map(tag => (
                    <span key={tag} style={{ fontSize: "12px", padding: "2px 10px", background: "#f3f4f6", borderRadius: "99px", color: "#6b7280" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </form>
        )}
      </div>
    </div>
  )
}