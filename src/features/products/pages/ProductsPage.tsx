import { Alert, Box, Grid, Typography } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"
import { useParams } from "react-router-dom"

import { ProductCard } from "../components/ProductCard"
import { ProductFilterComponent } from "../components/ProductFilterComponent"

export const ProductsPage = () => {

  const categoryId = useParams().categoryId
  const categories = useAppSelector(state => state.categoriesReducer.categories)
  const category = categories.find(c => c.id === Number(categoryId))

  const {products, loading, error} = useAppSelector(state => state.productsReducer)
  
  return (
    <main>
      <Typography variant="h2">Products {category && `- ${category.name}`}</Typography>
      <ProductFilterComponent categoryId={categoryId}/>
      <Typography sx={{margin: 2}}>{products.length} products</Typography>
      {error && <Alert>{error}</Alert>}
      {loading && <Typography>Loading...</Typography>}
      {!loading && <Box>
        <Grid container spacing={2}>
          {products && products.map(c => <ProductCard product={c} key={c.id}/>)}
        </Grid>
      </Box>}
    </ main>
  )
}
