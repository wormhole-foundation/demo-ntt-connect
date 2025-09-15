import './globals.css'

export const metadata = {
  title: 'ASSDAQ Wormhole NTT Connect',
  description: 'Cross-chain ASSDAQ transfers with Wormhole NTT',
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