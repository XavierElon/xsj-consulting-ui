import React, { useContext } from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap'
import { CartStateContext } from '@/context/CartContext'

interface Props {
  product: any
}

const ProductCard = (props: Props) => {
  const product = props.product

  const cart = useContext(CartStateContext)
  const productQuantity = cart.getProductQuantity(product.id)

  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="lg" sm="6">
                In Cart: {productQuantity}
              </Form.Label>
              <Col sm="6">
                <Button
                  size="sm"
                  className="mx-2 bg-blue-600"
                  onClick={() => cart.addOneToCart(product.id)}
                >
                  +
                </Button>
                <Button
                  size="sm"
                  className="mx-2 bg-gray-500 border-current"
                  onClick={() => cart.removeOneFromCart(product.id)}
                >
                  -
                </Button>
              </Col>
            </Form>
            <Button
              variant="danger"
              className="my-2 bg-red-600"
              onClick={() => cart.deleteFromCart(product.id)}
            >
              Remove from Cart
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary bg-blue-600"
              onClick={() => cart.addOneToCart(product.id)}
            >
              {' '}
              Add To Cart
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
