import { useNavigate, useParams } from "react-router-dom"
import { Alert, Button, Paper, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useEffect } from "react";
import { fetchOneProduct } from "../reducers/productsReducer";
import { ProductImageForm } from "../components/ProductImageForm";
import { ProductDetailsForm } from "../components/ProductDetailsForm";
import { InventoryForm } from "../components/InventoryForm";
import { NotAuthorized } from "../../../shared/pages/NotAuthorized";

export const AdminSingleProductPage = () => {

  const productId = useParams().productId!

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(fetchOneProduct(productId)) 
  }, [])

  const {product, loading, error} = useAppSelector(state => state.productsReducer)
  const profile = useAppSelector(state => state.credentialsReducer.profile)

  if (!profile || (profile && profile.role !== 'Admin')) {
    return (
        <NotAuthorized />
    )
  }

  return (
    <main>
      {loading && 'Loading...'}
      { error && <Alert severity='error'>{error}</Alert>}
      <Button onClick={() => navigate(-1)}>Back</Button>
      {product && 
        <Paper>
          <Typography variant='h3'>Manage product: {product.title}</Typography>
          <InventoryForm product={product}/>
          <ProductImageForm product={product} />
          <ProductDetailsForm product={product}/>
        </Paper>
      }
    </main>
  )    

}
