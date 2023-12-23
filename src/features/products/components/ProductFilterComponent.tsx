import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material"

import { setId, setPriceMax, setSearch, setSortCriterion, setSortOrder, sortByPrice } from "../reducers/productsReducer"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"

type FilterProps = {
  categoryId : string | undefined
}

export const ProductFilterComponent = ( {categoryId} : FilterProps ) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const categories = useAppSelector(state => state.categoriesReducer.categories)

    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('')
    const [max, setMax] = useState<string>('')
    const [titleSearch, setTitleSearch] = useState<string>('')

    const handleOpenFilter = () => {
      setFilterOpen(true)
    }

    const handleSort = (e : SelectChangeEvent<'asc' | 'desc' | 'new'>) => {
        if (e.target.value === 'asc' || e.target.value === 'desc') {
            dispatch(setSortOrder(e.target.value))
            dispatch(setSortCriterion('price'))
        }
        if (e.target.value === 'new')
        {
            dispatch(setSortOrder('desc'))
            dispatch(setSortCriterion('createdAt'))
        }
      }

    const handleCategoryChange = (e : SelectChangeEvent<string>) => {
      if (e.target.value === '0'){
        navigate('/products')
      } else {
        navigate(`/products/category/${e.target.value}`)
      }
    }
    
    const handlePriceMaxChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setMax(e.target.value)
    }

    const handleTitleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTitleSearch(e.target.value)
    }

    const clearFilters = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setTitleSearch('')
      setMax('')
    }

    const handleFilterChange = () => {
      var newMax = max === '0' || max === '' ? undefined : Number(max)
      dispatch(setPriceMax(newMax))
      dispatch(setId(categoryId))
      var newSearch = titleSearch === '' ? undefined : titleSearch
      dispatch(setSearch(newSearch))
      setFilterOpen(false)
    }

  return (
    <>
    <Stack direction='row' justifyContent='space-around' alignItems='center' sx={{border: '2px'}}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id='sort'>Sort by price</InputLabel>
          <Select id='sorting' labelId='sort' value={sortDirection} onChange={handleSort}>
              <MenuItem value={'new'}>Newest first</MenuItem>
              <MenuItem value={'asc'}>Lowest price first</MenuItem>
              <MenuItem value={'desc'}>Highest price first</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <InputLabel id='cat'>Category</InputLabel>
          <Select id='categoryId' labelId = 'cat' defaultValue={'0'} onChange={handleCategoryChange}>
            <MenuItem key={'0'} value={'0'}>All</MenuItem>
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
            <TextField value={max} type='number' onChange={handlePriceMaxChange} label='Maximum price'/>
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

