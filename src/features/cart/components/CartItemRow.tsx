import { Button, TableCell, TableRow } from "@mui/material"
import { CartItem } from "../types/CartItem"
import { useAppDispatch } from "../../../app/hooks"
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
      <TableCell>{item.product.title}</TableCell>
      <TableCell>{item.product.price} €</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.quantity * item.product.price} €</TableCell>
      <TableCell><Button onClick={handleReduce}>Reduce quantity</Button></TableCell>
      <TableCell><Button onClick={handleAdd}>Add quantity</Button></TableCell>
      <TableCell><Button onClick={handleDelete}>Remove product</Button></TableCell>
    </TableRow>
  )
}
