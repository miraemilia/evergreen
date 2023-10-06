import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

import { Product } from "../types/Product"

interface Props {
  product: Product
}

export const ProductCard = ({ product } : Props) => {

  const navigate = useNavigate()

  return (
    <Card sx={{ width: 300 }}>
      <CardContent>
        <CardMedia component="img" image={product.images[0]} height="300" />
        <CardContent>
          <Typography>{product.category.name}</Typography>
          <Typography><Link onClick={() => navigate(`/products/${product.id}`)}>{product.title}</Link></Typography>
          <Typography>{product.price} €</Typography>
        </CardContent>
      </CardContent>
    </Card>
  )
}
