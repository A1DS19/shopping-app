import { Box } from '@mui/material'

import { ComponentWithChildren } from '@/types/ComponentWithChildren'

export default function AuthLayout({ children }: ComponentWithChildren) {
  return <Box className='h-screen flex items-center justify-center'>{children}</Box>
}
