import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image2AdVideo AI",
  description: "Transformă o imagine într-un video publicitar cinematic.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
