import type React from "react"
import type { Metadata } from "next"

import { MaterialThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
    title: "v0 App",
    description: "Created with v0",
    generator: "v0.app",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body >
                <MaterialThemeProvider>{children}</MaterialThemeProvider>
            </body>
        </html>
    )
}
