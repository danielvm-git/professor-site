import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { LanguageProvider } from "@/lib/language-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Profa. Mariana Sombrio - Historiadora",
  description:
    "Site pessoal da Professora Mariana Sombrio - Historiadora, Doutora em Geociências pela Unicamp, Professora da UFABC",
  generator: "v0.app",
  keywords: "história, educação, teoria da história, políticas educacionais, UFABC, Unicamp",
  authors: [{ name: "Mariana Sombrio" }],
  openGraph: {
    title: "Profa. Mariana Sombrio - Historiadora",
    description: "Site pessoal da Professora Mariana Sombrio - Historiadora, Doutora em Geociências pela Unicamp",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
