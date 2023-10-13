import './globals.css'
import { Inter, Cormorant_Garamond } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const garamond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variabe: '--font-gara'
})


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={garamond.className}>{children}</body>
    </html>
  )
}
