import { useState } from "react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { CartItemRow } from "../components/CartItemRow"
import { checkoutCart, resetCart } from "../reducers/cartReducer"
import { LoginPrompt } from "../../../shared/pages/LoginPrompt"

export const Cart = () => {

  const cart = useAppSelector(state => state.cartReducer.cart)
  const profile = useAppSelector(state => state.credentialsReducer.profile)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const handleCheckout = () => {
    console.log('checkout')
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

  if (cart.checkedOut === true) {
    return (
      <main>
        <Box sx={{padding: '5em', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2em'}}>
          <Typography variant='h5'>Thank you for ordering!</Typography>
          <Button onClick={handleReset}>Reset cart</Button>
          <Dialog open={dialogOpen}>
            <DialogContent>
                <DialogContentText>Order complete</DialogContentText>
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
