import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { CartItemRow } from "../components/CartItemRow"
import { resetCart } from "../reducers/cartReducer"

export const Cart = () => {

  const cart = useAppSelector(state => state.cartReducer.cart)

  const dispatch = useAppDispatch()

  const handleCheckout = () => {
    dispatch(resetCart())
  }

  const handleReset = () => {
    dispatch(resetCart())
  }

/*   if (cart.checkedOut) {
    return (
    <Paper>
      <Typography>Thank you for ordering!</Typography>
    </Paper>
    )
  } */

  if (cart.cartItems.length === 0) {
    return (
      <Typography>Cart empty</Typography>
    )
  }

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price per product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.cartItems.map(i => <CartItemRow item={i}/>)}
          <TableRow>
            <TableCell>Total:</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{cart.cartItems.reduce((a, i) => a + (i.product.price * i.quantity), 0)} €</TableCell>
            <TableCell><Button onClick={handleCheckout}>Checkout</Button></TableCell>
            <TableCell><Button onClick={handleReset}>Delete cart</Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}
