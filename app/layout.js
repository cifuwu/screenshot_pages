import { Inter } from 'next/font/google'
import "./globals.css";
import { Toaster } from 'sonner';


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
    <html lang="en" className={`${inter.variable} `}>
      <body className='bg-gray-50 text-gray-800'>
        <Toaster closeButton richColors position='top-center'/>
        {children}
      </body>
    </html>
  );
}
