import { Link as RouterLink } from 'react-router-dom'
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material"

import { Category } from "../types/Category"

type Props = {
  category : Category
}

export const CategoryCard = ( { category } : Props ) => {

  return (
    <Grid item xs={4}>
      <Card>
        <CardActionArea component={RouterLink} to={`/products/category/${category.id}`}>
          <CardContent>
            <CardMedia component='img' image={category.imageUrl}/>
            <Box sx={{textAlign: 'center'}}>
              <Typography>{category.name}</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}
