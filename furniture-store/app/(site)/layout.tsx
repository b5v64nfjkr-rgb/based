import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Modern Furniture',
  description: 'A modern furniture shop'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="logo">Modern Furniture</Link>
            <nav>
              <Link href="/about">About</Link>
              <Link href="/cart">Cart</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">© {new Date().getFullYear()} Modern Furniture</div>
        </footer>
      </body>
    </html>
  )
}
