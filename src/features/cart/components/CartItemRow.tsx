import { useAppDispatch } from "../../../app/hooks"
import { Link as RouterLink } from "react-router-dom"
import { Button, Link, TableCell, TableRow, Typography } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import { CartItem } from "../types/CartItem"
import { deleteCartItem, updateCartItem } from "../reducers/cartReducer"
import { CartUpdate } from "../types/CartUpdate"

type CartItemRowProps = {
  item: CartItem
}

export const CartItemRow = ({item} : CartItemRowProps) => {

  const dispatch = useAppDispatch()

  const handleReduce = () => {
    const update : CartUpdate = {
      productId: item.product.id,
      quantity: item.quantity -1
    }
    dispatch(updateCartItem(update))
  }

  const handleAdd = () => {
    const update : CartUpdate = {
      productId: item.product.id,
      quantity: item.quantity +1
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
        <Button onClick={handleReduce}><RemoveCircleOutlineIcon /></Button>
          {item.quantity}
        <Button onClick={handleAdd}><AddCircleOutlineIcon /></Button>
      </TableCell>
      <TableCell>{item.quantity * item.product.price} €</TableCell>
      <Button onClick={handleDelete}><DeleteIcon/></Button>
    </TableRow>
  )
}
