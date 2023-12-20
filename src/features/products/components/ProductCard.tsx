import { Link as RouterLink } from "react-router-dom"
import { Card, CardContent, CardMedia, Grid, Link, Typography } from "@mui/material"

import { Product } from "../types/Product"

interface Props {
  product: Product
}

export const ProductCard = ({ product } : Props) => {

  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <CardMedia component='img' image={product.productImages[0].imageUrl} height='300' />
          <CardContent>
            <Typography>{product.category.name}</Typography>
            <Typography><Link component={RouterLink} to={`/products/${product.id}`}>{product.title}</Link></Typography>
            <Typography>{product.price} €</Typography>
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  )
}
