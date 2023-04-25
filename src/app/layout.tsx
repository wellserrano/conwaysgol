import './globals.css'

export const metadata = {
  title: 'Game of Life',
  description: "Simple Conway's Game of Life",
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
