import { Route } from '@/types/route'

export const unAuthenticatedRoutes: Route[] = [
  {
    title: 'Login',
    path: '/auth/login'
  },
  {
    title: 'Sign Up',
    path: '/auth/signup'
  }
]

export const routes: Route[] = [
  {
    title: 'Home',
    path: '/'
  }
]
