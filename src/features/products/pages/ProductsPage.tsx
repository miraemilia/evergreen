import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { ProductCard } from "../components/ProductCard"
import { fetchAllProducts, fetchWithFilters, sortByPrice } from "../reducers/productsReducer"
import { ProductFilter } from "../types/ProductFilter"

export const ProductsPage = () => {

  const dispatch = useAppDispatch()

  const categoryId = useParams().categoryId
  const categories = useAppSelector(state => state.categoriesReducer.categories)
  const category = categories.find(c => c.id === Number(categoryId))

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

  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('')
  const [sliderValues, setSliderValues] = useState<number[]>([0, 10000])
  const [titleSearch, setTitleSearch] = useState<string>('')

  const handleSort = (e : SelectChangeEvent<"asc" | "desc">) => {
    if (e.target.value === 'asc' || e.target.value === 'desc') {
        setSortDirection(e.target.value)
        dispatch(sortByPrice(e.target.value))
    }
  }

  const handleSliderChange = (e : Event, value : number[] | number) => {
    if (typeof value !== 'number') {
      setSliderValues(value)
    }
  }

  const handleTitleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitleSearch(e.target.value)
  }

  const handleFilterChange = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let filter : ProductFilter[] = []
    if (sliderValues) {
      const max : ProductFilter = {
        name: 'price_max',
        value: sliderValues[1]
      }
      filter.push(max)
      const min : ProductFilter = {
        name: 'price_min',
        value: sliderValues[0]
      }
      filter.push(min)
    }
    if (categoryId) {
      const cat : ProductFilter = {
        name: 'categoryId',
        value: Number(categoryId)
      }
      filter.push(cat)
    }
    if (titleSearch) {
      const title : ProductFilter = {
        name: 'title',
        value: titleSearch
      }
      filter.push(title)
    }
    console.log(filter)
    dispatch(fetchWithFilters(filter))
  }
  
  return (
    <>
      <Typography variant="h2">Products {category && `- ${category.name}`}</Typography>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id='sort'>Sort by price</InputLabel>
          <Select labelId='sort' value={sortDirection} onChange={handleSort}>
              <MenuItem value={'asc'}>Lowest price first</MenuItem>
              <MenuItem value={'desc'}>Highest price first</MenuItem>
          </Select>
        </FormControl>        
      </Box>
      <Box>
        <FormControl>
          <Slider
            value={sliderValues}
            onChange={handleSliderChange}
            min={0}
            max={10000}
            valueLabelDisplay="on"
          />
          <TextField value={titleSearch} onChange={handleTitleSearchChange}></TextField>
          <Button type='submit' onClick={handleFilterChange}>Filter</Button>
        </FormControl>        
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {products && products.map(c => <ProductCard product={c} key={c.id}/>)}
      </Box>
    </>
  )
}
