import Box from "@mui/material/Box"
import { CategoryCard } from "../../features/categories/components/CategoryCard"
import { useAppSelector } from "../hooks"
import { Typography } from "@mui/material"

export const Home = () => {

  const categories = useAppSelector(state => state.categoriesReducer.categories)
  
  return (
    <main>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Typography>Shop by category</Typography>
        {categories && categories.map(c => <CategoryCard category={c} key={c.id}/>)}
      </Box>
    </main>
  )
}
