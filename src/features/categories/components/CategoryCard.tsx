import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material"

import { Category } from "../types/Category"

type Props = {
  category : Category
}

export const CategoryCard = ( { category } : Props ) => {

  const navigate = useNavigate()

  return (
    <Card sx={{ width: 300 }}>
      <CardContent>
        <CardMedia component="img" image={category.image} height="300" />
        <CardContent>
          <Typography><Link onClick={() => navigate(`/products/category/${category.id}`)}>{category.name}</Link></Typography>
        </CardContent>
      </CardContent>
    </Card>
  )
}
