import { useState } from "react";
import { Link as RouterLink } from "react-router-dom"
import { Button, Link, TableCell, TableRow, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch } from "../../../app/hooks"
import { CartItem } from "../types/CartItem"
import { deleteCartItem, updateCartItem } from "../reducers/cartReducer"
import { CartUpdate } from "../types/CartUpdate"

type CartItemRowProps = {
  item: CartItem
}

export const CartItemRow = ({item} : CartItemRowProps) => {

  const [quantity, setQuantity] = useState<number>(item.quantity)

  const dispatch = useAppDispatch()

  const handleUpdate = (e : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const update : CartUpdate = {
      productId: item.product.id,
      quantity: Number(e.target.value)
    }
    dispatch(updateCartItem(update))
  }

  const handleDelete = () => {
    dispatch(deleteCartItem(item.product.id))
  }

  return (
    <TableRow>
      <TableCell><Link component={RouterLink} to={`/products/${item.product.id}`}>{item.product.title}</Link></TableCell>
      <TableCell>{item.product.price} €</TableCell>
      <TableCell>
        <TextField type='number' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} onBlur={handleUpdate} sx={{width: '15em', fontSize: '50%'}}></TextField>
      </TableCell>
      <TableCell>{item.quantity * item.product.price} €</TableCell>
      <Button onClick={handleDelete}><DeleteIcon/></Button>
    </TableRow>
  )
}
