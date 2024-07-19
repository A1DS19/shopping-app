'use client'

import AddIcon from '@mui/icons-material/Add'
import { Fab } from '@mui/material'
import { useState } from 'react'

import { CreateProductModal } from './create-product-modal'

interface ICreateProductFabProps {}

export function CreateProductFab({}: ICreateProductFabProps) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <CreateProductModal open={modalVisible} handleClose={() => setModalVisible(false)} />
      <div className='absolute left-10 bottom-10' onClick={() => setModalVisible(true)}>
        <Fab color='primary'>
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}
