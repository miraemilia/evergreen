import { useNavigate, useParams } from "react-router-dom"
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Alert, Box, Button, Grid, Paper, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import { useFetchOneQuery } from "../reducers/productQuery"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { addCartItem, deleteCartItem, updateCartItem } from "../../cart/reducers/cartReducer"
import { CartUpdate } from "../../cart/types/CartUpdate";
import { ImageCarousel } from "../components/ImageCarousel";

export const AdminSingleProductPage = () => {

  const productId = useParams().productId!

  const {data: product, isLoading, isError} = useFetchOneQuery(productId)
  const profile = useAppSelector(state => state.credentialsReducer.profile)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <main>
      {isLoading && 'Loading...'}
      {isError && <Alert severity='error'>Could not retrieve product data</Alert>}
      <Button onClick={() => navigate(-1)}>Back</Button>
      {product && 
        <Paper>
          <Typography variant='h3'>{product.title}</Typography>
          <Grid container spacing={2} sx={{padding: '2em'}}>
            <Grid item xs={6}>
                <ImageCarousel images={product.productImages.map(pi => pi.imageUrl)}/>
            </Grid>
            <Grid item xs={6}>
              <Typography>{product.description}</Typography>
              <Typography>{product.price} €</Typography>
            </Grid>
          </Grid>
        </Paper>
      }
    </main>
  )    

}
