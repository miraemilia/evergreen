import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Stack, TextField } from "@mui/material"

import { setId, setPriceMax, setPriceMin, setSearch, setSortCriterion, setSortOrder } from "../reducers/productsReducer"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { PriceRange } from "../types/ProductsReducerState"

export const ProductFilterComponent = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const categories = useAppSelector(state => state.categoriesReducer.categories)
    const {filters, priceRange} = useAppSelector(state => state.productsReducer)

    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | 'new'>('new')
    const [selectCategory, setSelectCategory] = useState<string | undefined>(filters.id ? filters.id : '0')
    const [sliderValues, setSliderValues] = useState<PriceRange>({max: priceRange.max, min: priceRange.min})
    const [titleSearch, setTitleSearch] = useState<string>('')

    const handleOpenFilter = () => {
      setFilterOpen(true)
    }

    const handleSort = (e : SelectChangeEvent<'asc' | 'desc' | 'new'>) => {
        if (e.target.value === 'asc' || e.target.value === 'desc') {
            dispatch(setSortOrder(e.target.value))
            dispatch(setSortCriterion('price'))
            setSortDirection(e.target.value)
        }
        if (e.target.value === 'new')
        {
            dispatch(setSortOrder('desc'))
            dispatch(setSortCriterion('createdAt'))
            setSortDirection('new')
        }
      }

    const handleCategoryChange = (e : SelectChangeEvent<string>) => {
      if (e.target.value === '0'){
        dispatch(setId(undefined))
        setSelectCategory(e.target.value)
        navigate('/products')
        
      } else {
        dispatch(setId(e.target.value))
        setSelectCategory(e.target.value)
        navigate(`/products/category/${e.target.value}`)
      }
    }
    
    const handleSliderChange = (e : Event, value : number[] | number) => {
      if (typeof value !== 'number') {
        setSliderValues({min: value[0], max: value[1]})
      }
    }

    const handleTitleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTitleSearch(e.target.value)
    }

    const clearFilters = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setTitleSearch('')
      setSliderValues({min: priceRange.min, max: priceRange.max})
    }

    const handleFilterChange = () => {
      var newMax = sliderValues.max === 0 || !sliderValues.max ? undefined : sliderValues.max
      dispatch(setPriceMax(newMax))
      var newMin = sliderValues.min === 0 || !sliderValues.min ? undefined : sliderValues.min
      dispatch(setPriceMin(newMin))
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
          <Select id='categoryId' labelId = 'cat' value={selectCategory} onChange={handleCategoryChange}>
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
            <Slider
              value={[sliderValues.min, sliderValues.max]}
              onChange={handleSliderChange}
              min={priceRange.min}
              max={priceRange.max}
              valueLabelDisplay="on"
            />          
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

