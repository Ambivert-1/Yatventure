'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

// Fallback trending data if no real posts yet
const fallbackTrending = [
  { tag: "#Pokhara",   posts: "100 posts" },
  { tag: "#Annapurna", posts: "84 posts"  },
  { tag: "#Namche",    posts: "61 posts"  },
  { tag: "#Chitwan",   posts: "43 posts"  },
  { tag: "#Mustang",   posts: "38 posts"  },
]

const whoToFollow = [
  { name: "Bidhya Rai",   desc: "Pokhara · 2.1k posts", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop" },
  { name: "Sagar Khatri", desc: "Trekker · 890 posts",  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop" },
  { name: "Maya Lama",    desc: "Guide · Namche",       avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop" },
]

export default function TrendingSidebar() {
  const [trending, setTrending] = useState(fallbackTrending)

  useEffect(() => {
    async function fetchTrending() {
      const supabase = createClient()

      // Fetch all posts that have tags
      const { data: posts } = await supabase
        .from('posts')
        .select('tags')
        .not('tags', 'is', null)

      if (!posts || posts.length === 0) return

      // Count how many times each tag appears
      const tagCount: Record<string, number> = {}
      posts.forEach((post) => {
        if (post.tags) {
          post.tags.forEach((tag: string) => {
            tagCount[tag] = (tagCount[tag] || 0) + 1
          })
        }
      })

      // Sort by count, take top 5
      const sorted = Object.entries(tagCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([tag, count]) => ({
          tag: `#${tag}`,
          posts: `${count} post${count !== 1 ? "s" : ""}`,
        }))

      if (sorted.length > 0) setTrending(sorted)
    }

    fetchTrending()
  }, [])

  return (
    <aside style={{
      width: "230px", flexShrink: 0,
      padding: "28px 20px", background: "#fff",
      borderLeft: "1px solid #e5e7eb",
      minHeight: "calc(100vh - 64px)",
    }}>
      <p style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "20px" }}>
        Trending
      </p>

      {trending.map((item) => (
        <div key={item.tag} style={{ marginBottom: "18px", cursor: "pointer" }}>
          <p style={{ fontSize: "13px", fontWeight: "600", color: "#111", marginBottom: "3px" }}>{item.tag}</p>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>{item.posts}</p>
        </div>
      ))}

      <div style={{ height: "1px", background: "#e5e7eb", margin: "22px 0" }} />

      <p style={{ fontSize: "14px", fontWeight: "700", color: "#111", marginBottom: "18px" }}>
        Who to follow
      </p>
      {whoToFollow.map((person) => (
        <div key={person.name} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <img src={person.avatar} alt={person.name}
            style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "13px", fontWeight: "600", color: "#111", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {person.name}
            </p>
            <p style={{ fontSize: "11px", color: "#9ca3af" }}>{person.desc}</p>
          </div>
          <button style={{ flexShrink: 0, fontSize: "12px", padding: "5px 12px", border: "1px solid #e5e7eb", borderRadius: "99px", background: "transparent", cursor: "pointer", color: "#374151", fontWeight: "500" }}>
            Follow
          </button>
        </div>
      ))}
    </aside>
  )
}