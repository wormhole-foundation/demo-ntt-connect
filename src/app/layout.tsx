import './globals.css'

export const metadata = {
  title: 'Wormhole NTT Connect (Demo Jose Mainnet Ethereum/Seievm)',
  description: 'Cross-chain token transfers with Wormhole NTT',
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