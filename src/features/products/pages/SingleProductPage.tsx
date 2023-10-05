import { useParams } from "react-router-dom"

import { ErrorPage } from "../../../app/pages/ErrorPage"
import { Button, Card, CardMedia, Paper, Typography } from "@mui/material"
import { useFetchOneQuery } from "../reducers/productQuery"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { addCartItem } from "../../cart/reducers/cartReducer"

export const SingleProductPage = () => {

  const productId = useParams().productId

  const product = useFetchOneQuery(Number(productId)).data
  const profile = useAppSelector(state => state.credentialsReducer.profile)

  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    if (product) {
      dispatch(addCartItem(product))
    }
  }

  if (!product) {
    <ErrorPage />
  }

  return (
    <>
      {product && 
        <Paper>
          <Typography>{product.title}</Typography>
          <Typography>{product.description}</Typography>
          <Typography>{product.price} €</Typography>
          {profile && <Button onClick={handleAddToCart}>Add to cart</Button>}
          <Card>
            <CardMedia component="img" image={product.images[0]} />
          </Card>
        </Paper>
      }
    </>
  )    

}
