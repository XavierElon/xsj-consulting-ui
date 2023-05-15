'use clientee'
import { useContext, useState } from 'react'
import { CartStateContext } from '@/context/CartContext'
import CartProduct from '../store/CartProduct'
import { Button } from 'react-bootstrap'

const CartModal = () => {
  const cart = useContext(CartStateContext)

  const productsCount = cart.items.reduce(
    (sum: any, product: { quantity: any }) => sum + product.quantity,
    0
  )

  return (
    <div className="flex flex-col">
      <div
        style={{ width: '450px' }}
        className="left-24 w-96 h-96 bg-white border-b-2 border-gray-200 rounded-lg p-4 shadow-md"
      >
        {productsCount > 0 ? (
          <>
            <h2 className="text-black text-center">Items in your cart: </h2>
            {cart.items.map(
              (currentProduct: { id: string; quantity: number }, idx: any) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                />
              )
            )}
            <Button
              variant="light"
              className="bg-slate-50 hover:bg-slate-200 transform hover:scale-110 transition-all duration-300 px-2 py-2 rounded-lg text-black"
            >
              Checkout
            </Button>
          </>
        ) : (
          <>
            <h1>There are no products in your cart</h1>
          </>
        )}
      </div>
    </div>
  )
}

export default CartModal
