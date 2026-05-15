'use client'
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"

const allDestinations = [
  { name: "Peace Pagoda",  district: "Pokhara",    slug: "peace-pagoda",  img: "https://images.unsplash.com/photo-1605131570707-02b7020c5c1a?w=200&h=200&fit=crop" },
  { name: "Namche Bajar",  district: "Solukhumbu", slug: "namche-bajar",  img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=200&fit=crop" },
  { name: "Gosaikunda",    district: "Rasuwa",     slug: "gosaikunda",    img: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=200&h=200&fit=crop" },
  { name: "Bouddha",       district: "Kathmandu",  slug: "bouddha",       img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=200&h=200&fit=crop" },
  { name: "Muktinath",     district: "Mustang",    slug: "muktinath",     img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop" },
  { name: "Rara Lake",     district: "Mugu",       slug: "rara-lake",     img: "https://images.unsplash.com/photo-1585016495481-91613bde4a72?w=200&h=200&fit=crop" },
  { name: "Everest Base",  district: "Solukhumbu", slug: "everest-base",  img: "https://images.unsplash.com/photo-1516208813382-f4f8f86dc902?w=200&h=200&fit=crop" },
]

const allPosts = [
  { id: 1, title: "Early morning sunrise at Tilicho Lake", type: "post", author: "Bidhya Rai", tags: ["trekking", "lake", "sunrise"] },
  { id: 2, title: "7-day Annapurna Circuit itinerary", type: "itinerary", author: "Sagar Khatri", tags: ["annapurna", "trekking", "circuit"] },
  { id: 3, title: "Shared jeep Pokhara to Jomsom", type: "transport", author: "Ram Prasad", tags: ["transport", "jeep", "pokhara"] },
  { id: 4, title: "Budget guesthouse in Namche", type: "stay", author: "Maya Lama", tags: ["stay", "namche", "budget"] },
]

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const q = query.toLowerCase()

  const matchedDestinations = allDestinations.filter(d =>
    d.name.toLowerCase().includes(q) || d.district.toLowerCase().includes(q)
  )

  const matchedPosts = allPosts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.author.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  )

  const totalResults = matchedDestinations.length + matchedPosts.length

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Back button */}
      <Link href="/" style={{
        position: "fixed", top: "20px", left: "20px", zIndex: 10,
        width: "38px", height: "38px", background: "#fff",
        border: "1px solid #e5e7eb", borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px 24px" }}>

        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111", marginBottom: "4px" }}>
          Results for "{query}"
        </h1>
        <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "28px" }}>
          {totalResults} result{totalResults !== 1 ? "s" : ""} found
        </p>

        {/* Destinations */}
        {matchedDestinations.length > 0 && (
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#111", marginBottom: "14px" }}>
              Destinations
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
              {matchedDestinations.map((d) => (
                <Link key={d.slug} href={`/destinations/${d.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden", cursor: "pointer" }}>
                    <img src={d.img} alt={d.name} style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }} />
                    <div style={{ padding: "10px 12px" }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#111" }}>{d.name}</p>
                      <p style={{ fontSize: "11px", color: "#9ca3af" }}>{d.district}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Posts */}
        {matchedPosts.length > 0 && (
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#111", marginBottom: "14px" }}>
              Posts
            </h2>
            {matchedPosts.map((post) => (
              <div key={post.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{
                    fontSize: "11px", padding: "2px 10px", borderRadius: "99px", fontWeight: "500",
                    background: post.type === "itinerary" ? "#E1F5EE" : post.type === "transport" ? "#E6F1FB" : post.type === "stay" ? "#EEEDFE" : "#F1EFE8",
                    color: post.type === "itinerary" ? "#0F6E56" : post.type === "transport" ? "#185FA5" : post.type === "stay" ? "#3C3489" : "#5F5E5A",
                  }}>
                    {post.type}
                  </span>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>by {post.author}</span>
                </div>
                <p style={{ fontSize: "14px", fontWeight: "500", color: "#111", marginBottom: "8px" }}>{post.title}</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {post.tags.map(tag => (
                    <span key={tag} style={{ fontSize: "11px", padding: "2px 8px", background: "#f3f4f6", borderRadius: "99px", color: "#6b7280" }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {totalResults === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</p>
            <p style={{ fontSize: "16px", fontWeight: "600", color: "#111", marginBottom: "6px" }}>No results found</p>
            <p style={{ fontSize: "14px", color: "#9ca3af" }}>Try searching for Pokhara, trekking, or Namche</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: "60px", textAlign: "center", color: "#9ca3af" }}>Searching...</div>}>
      <SearchResults />
    </Suspense>
  )
}