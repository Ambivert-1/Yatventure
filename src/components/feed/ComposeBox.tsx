type Props = {
  avatar: string
}

export default function ComposeBox({ avatar }: Props) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
      padding: "10px 14px",
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      background: "#fff",
      marginBottom: "16px",
      cursor: "text",
    }}>
      <img
        src={avatar}
        alt="you"
        style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
      />
      <input
        placeholder="Add a post"
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: "14px",
          color: "#374151",
          background: "transparent",
        }}
      />
    </div>
  )
}