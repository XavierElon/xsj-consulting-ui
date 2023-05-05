'use clientee'
import { useContext, useState } from 'react'
import { CartStateContext } from '@/context/CartContext'
import CartProduct from '../store/CartProduct'

const CartModal = () => {
  const cart = useContext(CartStateContext)

  return (
    <div className="flex flex-col">
      <div
        style={{ width: '450px' }}
        className="left-24 w-96 h-96 bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
      >
        <h2 className="text-black text-center">Your shopping cart</h2>
      </div>
    </div>
  )
}

export default CartModal
