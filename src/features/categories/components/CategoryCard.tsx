import { Link as RouterLink } from 'react-router-dom'
import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material"

import { Category } from "../types/Category"

type Props = {
  category : Category
}

export const CategoryCard = ( { category } : Props ) => {

  const linkTo = `products/category/${category.id}`

  return (
    <Card sx={{ width: 300 }}>
      <CardContent>
        <CardMedia component="img" image={category.image} height="300" />
        <CardContent>
          <Typography><Link component={RouterLink} to={linkTo}>{category.name}</Link></Typography>
        </CardContent>
      </CardContent>
    </Card>
  )
}
