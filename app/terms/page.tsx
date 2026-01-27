export default function TermsPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <h1>Termeni și Condiții</h1>

      <p>
        Bine ai venit pe platforma <strong>Image2AdVideo</strong>. Prin
        utilizarea acestui site ești de acord cu termenii și condițiile de mai
        jos.
      </p>

      <h2>1. Serviciul oferit</h2>
      <p>
        Image2AdVideo oferă un serviciu online de generare automată de videoclipuri
        promoționale pe baza imaginilor încărcate de utilizator, cu ajutorul
        inteligenței artificiale.
      </p>

      <h2>2. Plăți</h2>
      <p>
        Toate plățile sunt procesate securizat prin Stripe. După efectuarea
        plății, utilizatorul primește acces la generarea și descărcarea
        videoclipului.
      </p>
      <p>
        Sumele achitate nu sunt rambursabile odată ce procesarea video a început.
      </p>

      <h2>3. Drepturi asupra conținutului</h2>
      <p>
        Utilizatorul declară că deține drepturile asupra imaginilor încărcate.
        Image2AdVideo nu își asumă responsabilitatea pentru conținutul furnizat
        de utilizatori.
      </p>

      <h2>4. Limitarea răspunderii</h2>
      <p>
        Serviciul este oferit „ca atare”. Nu garantăm disponibilitate continuă
        sau rezultate specifice.
      </p>

      <h2>5. Modificări</h2>
      <p>
        Ne rezervăm dreptul de a modifica acești termeni oricând. Versiunea
        actualizată va fi publicată pe această pagină.
      </p>

      <p style={{ marginTop: 40 }}>
        Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
      </p>
    </main>
  );
}
