import './globals.css'
import { Cormorant_Garamond } from 'next/font/google'
import Head from 'next/head'

const garamond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variabe: '--font-gara'
})


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head>
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      </Head>
      <body className={garamond.className}>{children}</body>
    </html>
  )
}
