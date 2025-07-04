import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Sistema de Exámenes",
  description: "Aplicación de exámenes con sistema de vidas y progreso",
  keywords: ["exámenes", "educación", "aprendizaje", "quiz"],
  authors: [{ name: "Sistema de Exámenes" }],
  creator: "Sistema de Exámenes",
  publisher: "Sistema de Exámenes",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Sistema de Exámenes",
    description: "Aplicación de exámenes con sistema de vidas y progreso",
    siteName: "Sistema de Exámenes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema de Exámenes",
    description: "Aplicación de exámenes con sistema de vidas y progreso",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
