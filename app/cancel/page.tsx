export default function CancelPage() {
  return (
    <main style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#020617",
      color: "white",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        ❌ Plata a fost anulată
      </h1>
      <p>Poți încerca din nou oricând.</p>
    </main>
  );
}
