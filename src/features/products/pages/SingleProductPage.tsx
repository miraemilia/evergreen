import { useNavigate, useParams } from "react-router-dom"
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Alert, Box, Button, ButtonGroup, Grid, Paper, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import { useFetchOneQuery } from "../reducers/productQuery"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { addCartItem, deleteCartItem, updateCartItem } from "../../cart/reducers/cartReducer"
import { CartUpdate } from "../../cart/types/CartUpdate";
import { ImageCarousel } from "../components/ImageCarousel";
import { ProductSize } from "../types/ProductSize";
import { DetailsOption } from "../types/DetailsOption";

export const SingleProductPage = () => {

  const productId = useParams().productId!

  const {data: product, isLoading, isError} = useFetchOneQuery(productId)
  const profile = useAppSelector(state => state.credentialsReducer.profile)
  const cart = useAppSelector(state => state.cartReducer.cart)

  const cartIndex = cart.cartItems.findIndex(i => i.product.id === productId)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()

  console.log(product)

  const handleAddToCart = () => {
    if (product) {
      dispatch(addCartItem(product))
    }
  }

  const handleReduce = () => {
    const cartItem = cart.cartItems[cartIndex]
    if (cartItem) {
    const update : CartUpdate = {
      productId: productId,
      quantity: cartItem.quantity -1
    }
    dispatch(updateCartItem(update))
    }
  }

  const handleAdd = () => {
    const cartItem = cart.cartItems[cartIndex]
    if (cartItem) {
      const update : CartUpdate = {
        productId: productId,
        quantity: cartItem.quantity +1
      }
      dispatch(updateCartItem(update))
    }
  }

  const handleDelete = () => {
    dispatch(deleteCartItem(productId))
  }

  return (
    <main>
      {isLoading && 'Loading...'}
      {isError && <Alert severity='error'>Could not retrieve product data</Alert>}
      <Button onClick={() => navigate(-1)}>Back</Button>
      {product && 
        <Paper>
          <Typography variant='h3'>{product.title} <Box fontSize={24} fontStyle='italic' display='inline'>- {product.latinName}</Box></Typography>
          <Grid container spacing={2} sx={{padding: '2em'}}>
            {profile && profile.role === 'Customer' &&
              <Grid item xs={12}>
              {(cartIndex === -1)
                ? <Button onClick={handleAddToCart}>Add to cart <LocalGroceryStoreIcon/></Button>
                : <Box>
                    <Button onClick={handleReduce}>-</Button>
                    {cart.cartItems[cartIndex].quantity}
                    <Button onClick={handleAdd}>+</Button>
                    <Button onClick={handleDelete}><DeleteIcon/></Button>
                  </Box>
              }
            </Grid>}
            <Grid item xs={6}>
                <ImageCarousel images={product.productImages.map(pi => pi.imageUrl)}/>
            </Grid>
            <Grid item xs={6}>
              <Typography>{product.description}</Typography>
              <Typography>{product.price} €</Typography>
              {product.inventory > 5 && <Alert severity='success'>{product.inventory} left in stock</Alert>}
              {product.inventory <= 5 && product.inventory > 0 && <Alert severity='warning'>{product.inventory} left in stock</Alert>}
              {product.inventory <= 0 && <Alert severity='error'>Out of stock</Alert>}
              <Grid padding={4}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Size</Typography>
                  </Grid>
                  <Grid item xs={6}>
                  <ToggleButtonGroup value={product.productDetails?.size}>
                      <ToggleButton disabled value={ProductSize.Small}><LocalFloristOutlinedIcon fontSize="small"/></ToggleButton>
                      <ToggleButton disabled value={ProductSize.Medium}><LocalFloristOutlinedIcon fontSize="medium"/></ToggleButton>
                      <ToggleButton disabled value={ProductSize.Large}><LocalFloristOutlinedIcon fontSize="large"/></ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Watering</Typography>
                  </Grid>
                  <Grid item xs={6}>
                  <ToggleButtonGroup value={product.productDetails?.watering}>
                      <ToggleButton disabled value={DetailsOption.Low}><WaterDropOutlinedIcon fontSize="small"/></ToggleButton>
                      <ToggleButton disabled value={DetailsOption.Medium}><WaterDropOutlinedIcon fontSize="medium"/></ToggleButton>
                      <ToggleButton disabled value={DetailsOption.High}><WaterDropOutlinedIcon fontSize="large"/></ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Light</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <ToggleButtonGroup value={product.productDetails?.light}>
                      <ToggleButton disabled value={DetailsOption.Low}><WbSunnyOutlinedIcon fontSize="small"/></ToggleButton>
                      <ToggleButton disabled value={DetailsOption.Medium}><WbSunnyOutlinedIcon fontSize="medium"/></ToggleButton>
                      <ToggleButton disabled value={DetailsOption.High}><WbSunnyOutlinedIcon fontSize="large"/></ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1">Difficulty</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <ToggleButtonGroup value={product.productDetails?.difficulty}>
                      <ToggleButton disabled value={DetailsOption.Low}><BuildOutlinedIcon fontSize="small"/></ToggleButton>
                      <ToggleButton disabled value={DetailsOption.Medium}><BuildOutlinedIcon fontSize="medium"/></ToggleButton>
                      <ToggleButton disabled value={DetailsOption.High}><BuildOutlinedIcon fontSize="large"/></ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>
                {product.productDetails?.airPurifying && <Typography sx={{color: theme.palette.primary.main}}><AirOutlinedIcon />  Air-purifying </Typography>}
                {product.productDetails?.hanging && <Typography sx={{color: theme.palette.primary.main}}><CheckCircleOutlineOutlinedIcon />  Hanging </Typography>}
                {product.productDetails?.nonToxic && <Typography sx={{color: theme.palette.primary.main}}><CheckCircleOutlineOutlinedIcon />  Non-toxic </Typography>}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      }
    </main>
  )    

}
