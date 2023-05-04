import { Button } from 'react-bootstrap'
import { useContext } from 'react'
import { CartStateContext } from '@/context/CartContext'
import { getProductData } from '@/__mock__/productStore'
import React from 'react'

interface CartProductProps {
  id: string
  quantity: number
}

const CartProduct = (props: CartProductProps) => {
  const cart = useContext(CartStateContext)
  const { id, quantity } = props
  const productData = getProductData(id)

  return (
    <>
      <h3>{productData?.title}</h3>
      <p>{quantity} total</p>
      <p>${(quantity * productData?.price!).toFixed(2)}</p>
      <Button
        size="sm"
        className="bg-blue-600"
        onClick={() => cart.deleteFromCart(id)}
      >
        Remove
      </Button>
      <hr></hr>
    </>
  )
}

export default CartProduct
