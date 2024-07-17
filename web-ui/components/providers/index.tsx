'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

import darkTheme from '@/app/dark.theme'
import { AuthContext } from '@/context/auth'
import { ComponentWithChildren } from '@/types/ComponentWithChildren'

interface IProvidersProps extends ComponentWithChildren {
  authenticated: boolean
}

export function Providers({ children, authenticated }: IProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <AuthContext.Provider value={authenticated}>{children}</AuthContext.Provider>
        </CssBaseline>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
