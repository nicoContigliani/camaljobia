"use client"

import { MaterialThemeProvider } from "@/components/theme-provider"

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <MaterialThemeProvider>{children}</MaterialThemeProvider>
}