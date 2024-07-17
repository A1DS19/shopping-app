'use client'

import { Box, Button, Modal, Stack, SxProps, TextField, Theme } from '@mui/material'
import { useState } from 'react'

import createProduct from '@/actions/products/create-product'
import { FormResponse } from '@/types/form-response'

interface ICreateProductModalProps {
  open: boolean
  handleClose: () => void
}

const styles: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export function CreateProductModal({ handleClose, open }: ICreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>()

  const onClose = () => {
    setResponse(undefined)
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles}>
        <form
          action={async (formData) => {
            const response = await createProduct(formData)
            setResponse(response)
            if (!response.error) {
              onClose()
            }
          }}
          className='w-full max-w-xs'
        >
          <Stack spacing={2}>
            <TextField
              name='name'
              label='Name'
              variant='outlined'
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name='description'
              label='Description'
              variant='outlined'
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name='price'
              label='Price'
              variant='outlined'
              type='number'
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
