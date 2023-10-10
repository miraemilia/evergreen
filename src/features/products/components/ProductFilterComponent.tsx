import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { fetchAllProducts, fetchWithFilters, sortByPrice } from "../reducers/productsReducer"
import { ProductFilter } from "../types/ProductFilter"
import { useAppDispatch } from "../../../app/hooks"

type FilterProps = {
  categoryId : string | undefined
}

export const ProductFilterComponent = ( {categoryId} : FilterProps ) => {

    const dispatch = useAppDispatch()

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

    const handleSort = (e : SelectChangeEvent<"asc" | "desc">) => {
        if (e.target.value === 'asc' || e.target.value === 'desc') {
            setSortDirection(e.target.value)
            dispatch(sortByPrice(e.target.value))
        }
      }
    
      const handlePriceMaxChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPriceMax(e.target.value)
      }
    
      const handleTitleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitleSearch(e.target.value)
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
        console.log(newFilter)
        dispatch(fetchWithFilters(newFilter))
      }

  return (
    <>
    <Grid container spacing={0.5}>
      <Grid item xs={4}>
        <FormControl sx={{ m: 2, minWidth: 150 }}>
          <InputLabel id='sort'>Sort by price</InputLabel>
          <Select labelId='sort' value={sortDirection} onChange={handleSort}>
              <MenuItem value={'asc'}>Lowest price first</MenuItem>
              <MenuItem value={'desc'}>Highest price first</MenuItem>
          </Select>
        </FormControl>        
      </Grid>
      <Grid item xs={4}>
        <Button onClick={handleOpenFilter}>Set filters</Button>     
      </Grid>
    </Grid>
    <Dialog open={filterOpen} sx={{padding: '2em'}}>
      <DialogTitle>Set filters</DialogTitle>
      <DialogContent>
        <FormControl sx={{padding: '2em'}}>
        <Grid container spacing={3} direction='column'>
          <Grid item>
            <TextField value={titleSearch} onChange={handleTitleSearchChange} label='Search in name'></TextField>
          </Grid>
          <Grid item>
            <TextField value={priceMax} type='number' onChange={handlePriceMaxChange} label='Maximum price'/>
          </Grid>
          <Grid item>
            <Button type='submit' onClick={handleFilterChange}>Filter</Button>
          </Grid>
        </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
              <Button onClick={() => setFilterOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}

