import Box from "@mui/material/Box"
import { CategoryCard } from "../../features/categories/components/CategoryCard"
import { useAppSelector } from "../hooks"
import { Typography } from "@mui/material"

export const Home = () => {

  const categories = useAppSelector(state => state.categoriesReducer.categories)
  
  return (
    <main>
      <Typography>Shop by category</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {categories && categories.map(c => c.image === "https://placeimg.com/640/480/any" ? null : <CategoryCard category={c} key={c.id}/>)}
      </Box>
    </main>
  )
}
