import './globals.css'

export const metadata = {
  title: 'Rate My Fit',
  description: 'Get ratings and feedback on your outfit',
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
