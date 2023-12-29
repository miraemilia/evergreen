import { useState } from "react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { CartItemRow } from "../components/CartItemRow"
import { checkoutCart, resetCart } from "../reducers/cartReducer"
import { LoginPrompt } from "../../../shared/pages/LoginPrompt"
import { createOrder } from "../../order/reducers/ordersReducer"
import { NewOrder, NewOrderDetails } from "../../order/types/NewOrder"
import { NotAuthorized } from "../../../shared/pages/NotAuthorized"

export const Cart = () => {

  const cart = useAppSelector(state => state.cartReducer.cart)
  const profile = useAppSelector(state => state.credentialsReducer.profile)
  const orderError = useAppSelector(state => state.ordersReducer.error)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const handleCheckout = () => {
    console.log('checkout')
    var checkedOut : NewOrder = {
      orderDetails: []
    }
    cart.cartItems.forEach((item) => {
      const orderProduct : NewOrderDetails = {
        productId: item.product.id,
        quantity: item.quantity
      }
      checkedOut.orderDetails.push(orderProduct)
    })
    dispatch(createOrder(checkedOut))
    setDialogOpen(true)
    dispatch(checkoutCart())
  }

  const handleReset = () => {
    dispatch(resetCart())
  }

  if (!profile) {
    return (
      <LoginPrompt />
    )
  }

  if (profile.role !== 'Customer') {
    return (
      <NotAuthorized />
    )
  }

  if (cart.checkedOut === true) {
    return (
      <main>
        <Box sx={{padding: '5em', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2em'}}>
          <Typography variant='h5'>Thank you for ordering!</Typography>
          <Button onClick={handleReset}>Reset cart</Button>
          <Dialog open={dialogOpen}>
            <DialogContent>
                <DialogContentText>{orderError ? orderError : "Order complete"}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </main>
    )
  }

  return (
    <main>
      <Typography variant='h2'>Cart</Typography>
      <Box>
        <Table>
          <TableHead>
            <TableRow sx={{fontStyle: 'italic'}}>
              <TableCell>Product</TableCell>
              <TableCell>Price per product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.cartItems.map(i => <CartItemRow key={i.product.id} item={i}/>)}
            <TableRow>
              <TableCell sx={{fontSize: '125%'}}>Total:</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell sx={{fontSize: '125%'}}>{cart.cartItems.reduce((a, i) => a + (i.product.price * i.quantity), 0)} €</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Button onClick={handleReset}>Delete cart</Button></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell><Button onClick={handleCheckout}>Checkout</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </main>
  )
}
