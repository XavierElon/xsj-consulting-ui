'use client'
import { createContext, useState } from 'react'

type ContextInterface = {
  items: any
  getProductQuantity: any
  addOneToCart: any
  removeOneFromCart: any
  deleteFromCart: any
}
const CartStateContext = createContext<ContextInterface>({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
})

const CartStateProvider = (props: any) => {
  const [cartProducts, setCartProducts] = useState<any[]>([])

  const getProductQuantity = (id: number) => {
    const quantity = cartProducts.find((product) => product.id === id)?.quantity
    // console.log(quantity)
    if (quantity === undefined) {
      return 0
    }

    return quantity
  }

  const addOneToCart = (id: number) => {
    const quantity = getProductQuantity(id)
    console.log(quantity)
    console.log('add')
    if (quantity === 0) {
      console.log('here')
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ])
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      )
    }
    console.log(cartProducts)
  }

  const removeOneFromCart = (id: number) => {
    const quantity = getProductQuantity(id)

    if (quantity === 1) {
      deleteFromCart(id)
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      )
    }
  }

  const deleteFromCart = (id: number) => {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id
      })
    )
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
  }

  return (
    <CartStateContext.Provider value={contextValue}>
      {props.children}
    </CartStateContext.Provider>
  )
}

export { CartStateContext, CartStateProvider }
