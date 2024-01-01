import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material"
import * as yup from 'yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { InventoryUpdate, InventoryUpdateParams } from "../types/ProductUpdate";
import { updateProductInventory } from "../reducers/productsReducer";
import { Product } from "../types/Product";

type Props = {
    product : Product
}

export const InventoryForm = ({ product } : Props) => {

  const dispatch = useAppDispatch()

  const {error} = useAppSelector(state => state.productsReducer)

  const inventorySchema = yup.object({
    inventoryChange: yup.number().required()
    }).required()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<InventoryUpdate>({
        defaultValues: {
            inventoryChange: 0
        },
        resolver: yupResolver(inventorySchema)
    })

    const onFormSubmit: SubmitHandler<InventoryUpdate> = (data) => {
        const inventoryUpdate : InventoryUpdate = {
            inventoryChange: data.inventoryChange
        }
        const update : InventoryUpdateParams = {
            id: product.id,
            update: inventoryUpdate
        }
        dispatch(updateProductInventory(update))
        reset()
    }

  return (
    <Grid container spacing={2} sx={{padding: '2em'}}>
    <Typography variant='h4'>Product inventory : {product.inventory} </Typography>
    { error && <Alert severity='error'>{error}</Alert>}
    <Grid item xs={12}>
        <Box 
            component='form'
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap='1em'
            onSubmit={handleSubmit(onFormSubmit)}
            sx={{width: '25em', mx: 'auto'}}
        >
            <TextField
              id='inventoryChange'
              error={errors.inventoryChange !== undefined}
              label='Inventory change'
              {...register('inventoryChange')}
              helperText={errors.inventoryChange && (<p>{errors.inventoryChange.message}</p>)}
            /> 
            <Button type='submit'>Add / Reduce</Button>
        </Box>
    </Grid>
    </Grid>
  )    

}
