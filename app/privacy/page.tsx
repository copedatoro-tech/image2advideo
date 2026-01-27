export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <h1>Politica de Confidențialitate</h1>

      <p>
        Image2AdVideo respectă confidențialitatea datelor tale și se angajează să
        protejeze informațiile personale.
      </p>

      <h2>1. Ce date colectăm</h2>
      <ul>
        <li>Adresa de email (pentru procesarea plăților)</li>
        <li>Imagini încărcate pentru generarea video</li>
        <li>Date tehnice necesare funcționării platformei</li>
      </ul>

      <h2>2. Cum folosim datele</h2>
      <p>
        Datele sunt utilizate exclusiv pentru:
      </p>
      <ul>
        <li>Procesarea plăților</li>
        <li>Generarea videoclipurilor</li>
        <li>Îmbunătățirea serviciului</li>
      </ul>

      <h2>3. Plăți securizate</h2>
      <p>
        Plățile sunt procesate de Stripe. Image2AdVideo nu stochează datele
        cardurilor bancare.
      </p>

      <h2>4. Stocarea datelor</h2>
      <p>
        Imaginile și videoclipurile sunt stocate temporar, strict pentru
        furnizarea serviciului, apoi pot fi șterse automat.
      </p>

      <h2>5. Drepturile tale</h2>
      <p>
        Ai dreptul să soliciți ștergerea datelor tale sau informații despre modul
        în care sunt utilizate.
      </p>

      <p style={{ marginTop: 40 }}>
        Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
      </p>
    </main>
  );
}
