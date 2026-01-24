import Link from "next/link";

export default function SuccessPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Plată reușită ✅</h1>
      <p>Accesul tău este activ.</p>

      <Link href="/">
        <button
          style={{
            padding: "12px 20px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Intră în aplicație
        </button>
      </Link>
    </main>
  );
}
