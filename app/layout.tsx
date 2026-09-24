import './globals.css'
  import { Inter, Playfair_Display } from 'next/font/google'

  const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
  const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

  export const metadata = {
    title: 'STUDIO_VOID | Mode Minimaliste',
    description: 'L essence du minimalisme',
  }

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="fr" className="bg-dark-bg text-light-text">
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    )
  }