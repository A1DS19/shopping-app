'use client'

import CloudUpload from '@mui/icons-material/CloudUpload'
import { Box, Button, Modal, Stack, SxProps, TextField, Theme, Typography } from '@mui/material'
import { CSSProperties, useState } from 'react'

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

const fileInputStyles: CSSProperties = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
}

export function CreateProductModal({ handleClose, open }: ICreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>()
  const [fileName, setFileName] = useState('')

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
            <Button component='label' variant='outlined' startIcon={<CloudUpload />}>
              Upload File
              <input
                name='image'
                type='file'
                style={fileInputStyles}
                onChange={(e) => e.target.files && setFileName(e.target.files[0].name)}
                accept='.jpg'
              />
            </Button>
            <Typography>{fileName}</Typography>
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
