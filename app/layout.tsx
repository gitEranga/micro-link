import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import Script from "next/script"
import "./globals.css"

import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Micro Link - URL Shortener",
  description: "Shorten, share, and track your links in one place",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
        
        {/* Datadog RUM Script */}
        <Script id="datadog-rum" strategy="afterInteractive">
          {`
            (function(h,o,u,n,d) {
              h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
              d=o.createElement(u);d.async=1;d.src=n
              n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
            })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum.js','DD_RUM')
            DD_RUM.onReady(function() {
              DD_RUM.init({
                applicationId: '${process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID}',
                clientToken: '${process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN}',
                site: 'datadoghq.com',
                service: 'micro-link',
                env: '${process.env.NODE_ENV || 'development'}',
                version: '1.0.0',
                sampleRate: 100,
                trackInteractions: true,
                defaultPrivacyLevel: 'mask-user-input'
              }),
              DD_RUM.setUser({
                id: 'user-id',
               name: 'user-name',
               email: 'user-email'
              })
            })
          `}
        </Script>
      </body>
    </html>
  )
}