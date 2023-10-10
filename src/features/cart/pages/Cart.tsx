import { useState } from "react"
import { Link as RouterLink} from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

import { CartItemRow } from "../components/CartItemRow"
import { checkoutCart, resetCart } from "../reducers/cartReducer"

export const Cart = () => {

  const cart = useAppSelector(state => state.cartReducer.cart)
  const profile = useAppSelector(state => state.credentialsReducer.profile)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const handleCheckout = () => {
    console.log("checkout")
    setDialogOpen(true)
    dispatch(checkoutCart())
  }

  const handleReset = () => {
    dispatch(resetCart())
  }

  if (!profile) {
    return (
      <Typography>Please <Link component={RouterLink} to='/login'>log in</Link></Typography>
    )
  }

  if (cart.checkedOut === true) {
    return (
      <main>
        <Box sx={{padding: '5em'}}>
          <Typography variant="h5" textAlign={'center'}>Thank you for ordering!</Typography>
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
