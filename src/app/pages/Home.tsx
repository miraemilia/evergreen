import Box from "@mui/material/Box"
import { CategoryCard } from "../../features/categories/components/CategoryCard"
import { useAppSelector } from "../hooks"
import { Grid, Typography } from "@mui/material"

export const Home = () => {

  const categories = useAppSelector(state => state.categoriesReducer.categories)
  
  return (
    <main>
      <Box>
        <Typography variant="h4">Shop by category</Typography>
        <Grid container spacing={4}>
          {categories && categories.map(c => c.image === "https://placeimg.com/640/480/any" ? null : <CategoryCard category={c} key={c.id}/>)}
        </Grid>
      </Box>
    </main>
  )
}
