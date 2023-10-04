import { Box, Typography } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"
import { ProductCard } from "../components/ProductCard"

export const ProductsPage = () => {

  const products = useAppSelector(state => state.productsReducer.products)
  
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <Typography>Products</Typography>
      {products && products.map(c => <ProductCard product={c} key={c.id}/>)}
    </Box>
  )
}
