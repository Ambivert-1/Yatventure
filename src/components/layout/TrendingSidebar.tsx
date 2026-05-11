const trending = [
  { tag: "#Pokhara", posts: "100 posts" },
  { tag: "#Annapurna", posts: "84 posts" },
  { tag: "#Namche", posts: "61 posts" },
  { tag: "#Chitwan", posts: "43 posts" },
]

export default function TrendingSidebar() {
  return (
    <aside style={{
      width: "200px",
      flexShrink: 0,
      padding: "20px 16px",
      background: "#fff",
      borderLeft: "1px solid #e5e7eb",
      minHeight: "calc(100vh - 60px)",
    }}>
      <p style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "16px" }}>
        Trending
      </p>
      {trending.map((item) => (
        <div key={item.tag} style={{ marginBottom: "16px", cursor: "pointer" }}>
          <p style={{ fontSize: "13px", fontWeight: "600", color: "#111", marginBottom: "2px" }}>
            {item.tag}
          </p>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>{item.posts}</p>
        </div>
      ))}
    </aside>
  )
}