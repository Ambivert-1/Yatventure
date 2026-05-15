import Link from "next/link"

type Props = {
  name: string
  district: string
  img: string
}

export default function DestinationCard({ name, district, img }: Props) {
  return (
    <Link href={`/destinations/${name.toLowerCase().replace(/ /g, "-")}`} style={{ textDecoration: "none" }}>
      <div style={{ cursor: "pointer" }}>
        <img
          src={img}
          alt={name}
          style={{
            width: "100%",
            aspectRatio: "1",
            borderRadius: "10px",
            objectFit: "cover",
            display: "block",
            marginBottom: "8px",
          }}
        />
        <p style={{ fontSize: "14px", fontWeight: "600", color: "#111", marginBottom: "2px" }}>{name}</p>
        <p style={{ fontSize: "12px", color: "#6b7280" }}>{district}</p>
      </div>
    </Link>
  )
}