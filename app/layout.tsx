import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Image2AdVideo AI",
  description: "Generate premium video ads from images",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
