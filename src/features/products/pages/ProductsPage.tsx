import { Box, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useParams } from "react-router-dom"

import { ProductCard } from "../components/ProductCard"
import { useEffect } from "react"
import { fetchAllProducts, fetchWithFilters } from "../reducers/productsReducer"
import { ProductFilter } from "../types/ProductFilter"

export const ProductsPage = () => {

  const dispatch = useAppDispatch()

  const categoryId = useParams().categoryId

  useEffect(() => {
    if (categoryId) {
      const filter : ProductFilter = {
        name: 'categoryId',
        value: Number(categoryId)
      }
      dispatch(fetchWithFilters([filter]))
    } else {
      dispatch(fetchAllProducts())
    }
  }, [categoryId])

  const products = useAppSelector(state => state.productsReducer.products)
  
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <Typography>Products</Typography>
      {products && products.map(c => <ProductCard product={c} key={c.id}/>)}
    </Box>
  )
}
