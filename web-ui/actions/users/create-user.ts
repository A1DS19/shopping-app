'use server'

import { redirect } from 'next/navigation'

import { FormResponse } from '@/types/form-response'
import { post } from '@/utils/fetch'

export default async function createUser(_prevState: FormResponse, formData: FormData) {
  const { error } = await post('users', formData)

  if (error) {
    return { error }
  }

  redirect('/')
}
