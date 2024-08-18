import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { SidebarResizable } from '@/components/sidebar-resizable'
import { NavBarHeaderPages } from '@/components/navbar-pages'
import { ShowNavBarProvider } from '@/components/navbar-pages/useShowNavbar'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="transition-colors duration-700">
      <body className={cn(['transition-colors duration-500'], inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          // disableTransitionOnChange
        >
          <SidebarResizable>
            <ShowNavBarProvider>
              <NavBarHeaderPages />
            </ShowNavBarProvider>
            {children}
          </SidebarResizable>
          <Toaster theme="system" expand richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
