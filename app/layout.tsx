import "./globals.css"

export const metadata = {
  title: "Image2AdVideo AI",
  description: "Generate premium video ads from images",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
