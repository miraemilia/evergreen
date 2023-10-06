import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

import { CartItemRow } from "../components/CartItemRow"
import { resetCart } from "../reducers/cartReducer"

export const Cart = () => {

  const cart = useAppSelector(state => state.cartReducer.cart)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const handleCheckout = () => {
    console.log("checkout")
    setDialogOpen(true)
    dispatch(resetCart())
  }

  const handleReset = () => {
    dispatch(resetCart())
  }

  if (cart.cartItems.length === 0) {
    return (
      <Box>
        <Typography>Cart empty</Typography>
        <Dialog open={dialogOpen}>
          <DialogContent>
              <DialogContentText>Thank you for ordering!</DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }

  return (
    <Box>
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
          {cart.cartItems.map(i => <CartItemRow key={i.product.id} item={i}/>)}
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
    </Box>
  )
}
