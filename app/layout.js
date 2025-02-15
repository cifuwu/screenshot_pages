import { Inter } from 'next/font/google'
import "./globals.css";


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}


export const metadata = {
  title: "Generate Screenshot and PDF",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} `}>
      <body>
        {children}
      </body>
    </html>
  );
}
