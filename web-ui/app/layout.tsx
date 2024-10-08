import './globals.css'

import { Container } from '@mui/material'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import authenticated from '@/actions/auth/authenticated'
import logout from '@/actions/auth/logout'
import { Header } from '@/components/header'
import { Providers } from '@/components/providers'
import { ComponentWithChildren } from '@/types/ComponentWithChildren'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shopping app',
  description: 'Generated by me'
}

export default async function RootLayout({ children }: ComponentWithChildren) {
  const isAuthenticated = await authenticated()

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers authenticated={isAuthenticated}>
          <Header logout={logout} />
          <Container className={isAuthenticated ? 'mt-10' : ''}>{children}</Container>
        </Providers>
      </body>
    </html>
  )
}
