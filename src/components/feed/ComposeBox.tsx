import Link from "next/link"

type Props = {
  avatar: string
}

export default function ComposeBox({ avatar }: Props) {
  return (
    <Link href="/create" style={{ textDecoration: "none" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "12px 14px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        background: "#fff",
        marginBottom: "16px",
        cursor: "pointer",
      }}>
        <img
          src={avatar} alt="you"
          style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
        />
        <span style={{ fontSize: "14px", color: "#9ca3af" }}>
          Share a trip, itinerary, or tip...
        </span>
        <div style={{ marginLeft: "auto", padding: "6px 14px", background: "#E8593C", color: "white", borderRadius: "8px", fontSize: "13px", fontWeight: "500" }}>
          Post
        </div>
      </div>
    </Link>
  )
}