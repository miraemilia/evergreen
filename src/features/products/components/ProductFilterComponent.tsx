import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material"

import { fetchAllProducts, fetchWithFilters, sortByPrice } from "../reducers/productsReducer"
import { ProductFilter } from "../types/ProductFilter"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"

type FilterProps = {
  categoryId : string | undefined
}

export const ProductFilterComponent = ( {categoryId} : FilterProps ) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const categories = useAppSelector(state => state.categoriesReducer.categories)

    useEffect(() => {
      if (categoryId) {
        const categoryFilter : ProductFilter = {
          name: 'categoryId',
          value: categoryId
        }
        dispatch(fetchWithFilters([categoryFilter]))
      } else {
        dispatch(fetchAllProducts())
      }
    }, [categoryId])

    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('')
    const [priceMax, setPriceMax] = useState<string>('')
    const [titleSearch, setTitleSearch] = useState<string>('')

    const handleOpenFilter = () => {
      setFilterOpen(true)
    }

    const handleSort = (e : SelectChangeEvent<'asc' | 'desc'>) => {
        if (e.target.value === 'asc' || e.target.value === 'desc') {
            setSortDirection(e.target.value)
            dispatch(sortByPrice(e.target.value))
        }
      }

    const handleCategoryChange = (e : SelectChangeEvent<number>) => {
      if (e.target.value === 0) {
        navigate('/products')
      } else {
        navigate(`/products/category/${e.target.value}`)
      }
    }
    
    const handlePriceMaxChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPriceMax(e.target.value)
    }

    const handleTitleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTitleSearch(e.target.value)
    }

    const clearFilters = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setTitleSearch('')
      setPriceMax('')
    }

    const handleFilterChange = () => {
      let newFilter : ProductFilter[] = []
      if (priceMax) {
        const min : ProductFilter = {
          name: 'price_min',
          value: 1
        }
        newFilter.push(min)
        const max : ProductFilter = {
          name: 'price_max',
          value: Number(priceMax)
        }
        newFilter.push(max)
      }
      if (categoryId) {
        const cat : ProductFilter = {
          name: 'categoryId',
          value: Number(categoryId)
        }
        newFilter.push(cat)
      }
      if (titleSearch) {
        const title : ProductFilter = {
          name: 'title',
          value: titleSearch
        }
        newFilter.push(title)
      }
      dispatch(fetchWithFilters(newFilter))
      setFilterOpen(false)
    }

  return (
    <>
    <Stack direction='row' justifyContent='space-around' alignItems='center' sx={{border: '2px'}}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id='sort'>Sort by price</InputLabel>
          <Select id='sorting' labelId='sort' value={sortDirection} onChange={handleSort}>
              <MenuItem value={'asc'}>Lowest price first</MenuItem>
              <MenuItem value={'desc'}>Highest price first</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <InputLabel id='cat'>Category</InputLabel>
          <Select id='categoryId' labelId = 'cat' defaultValue={0} onChange={handleCategoryChange}>
            <MenuItem key={0} value={0}>All</MenuItem>
            {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
          </Select>
        </FormControl>
        <Button onClick={handleOpenFilter}>Set filters</Button>     
    </Stack>
    <Dialog open={filterOpen} sx={{padding: '2em'}}>
      <DialogTitle>Set filters</DialogTitle>
      <DialogContent>
        <FormControl sx={{padding: '2em'}}>
        <Grid container spacing={3} direction='column'>
          <Grid item>
            <TextField value={titleSearch} onChange={handleTitleSearchChange} label='Search for name'></TextField>
          </Grid>
          <Grid item>
            <TextField value={priceMax} type='number' onChange={handlePriceMaxChange} label='Maximum price'/>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
          <Button onClick={clearFilters}>Clear</Button>
          <Button type='submit' variant='outlined' color='secondary' onClick={handleFilterChange}>Ok</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

