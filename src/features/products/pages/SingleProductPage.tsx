import { useParams } from "react-router-dom"

import { ErrorPage } from "../../../app/pages/ErrorPage"
import { Avatar, Card, CardMedia, ImageListItem, Paper, Typography } from "@mui/material"
import { useFetchOneQuery } from "../reducers/productQuery"

export const SingleProductPage = () => {

  const productId = useParams().productId

  const product = useFetchOneQuery(Number(productId)).data

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
          <Card>
            <CardMedia component="img" image={product.images[0]} />
          </Card>
        </Paper>
      }
    </>
  )    

}
