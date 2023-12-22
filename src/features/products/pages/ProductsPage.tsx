import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Box, Grid, MenuItem, Pagination, Select, SelectChangeEvent, Stack, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { ProductCard } from "../components/ProductCard"
import { ProductFilterComponent } from "../components/ProductFilterComponent"
import { fetchAllProducts, setId, setLimit, setOffset } from "../reducers/productsReducer"

export const ProductsPage = () => {

  const categoryId = useParams().categoryId
  const dispatch = useAppDispatch()

  const categories = useAppSelector(state => state.categoriesReducer.categories)
  const category = categories.find(c => c.id === categoryId)

  const {products, filters, totalProducts, totalPages, loading, error} = useAppSelector(state => state.productsReducer)

  const [perPage, setPerPage] = useState<number>(12)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    dispatch(setId(categoryId))
  }, [categoryId])

  useEffect(() => {
    dispatch(fetchAllProducts())
    console.log(products)
  }, [filters, page, perPage])

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    dispatch(setOffset((value -1) * perPage))
  }

  const handlePerPageChange = (e: SelectChangeEvent<number>) => {
    setPerPage(Number(e.target.value))
    dispatch(setLimit(Number(e.target.value)))
    setPage(1)
  }
  
  return (
    <main>
      <Typography variant='h2'>Products {category && `- ${category.name}`}</Typography>
      <ProductFilterComponent categoryId={categoryId}/>
      {error && <Typography>{error}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {!loading &&
        <Box>
          <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{padding: '1em'}}>
            <Typography sx={{margin: 2}}>{totalProducts} products</Typography>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} size='large'/>
            <Select value={perPage} onChange={handlePerPageChange}> 
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={36}>36</MenuItem>
            </Select>
          </Stack>
          <Grid container spacing={2}>
            {products && products.map(c => <ProductCard product={c} key={c.id}/>)}
          </Grid>
        </Box>}
    </ main>
  )
}