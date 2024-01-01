import { Alert, Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import * as yup from 'yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Product } from "../types/Product";
import { ProductSize } from "../types/ProductSize";
import { DetailsOption } from "../types/DetailsOption";
import { DetailsUpdate, DetailsUpdateParams } from "../types/ProductUpdate";
import { updateProductDetails } from "../reducers/productsReducer";

type Props = {
    product : Product
}

export const ProductDetailsForm = ({ product } : Props) => {

  const productId = product.id

  const dispatch = useAppDispatch()

  const {error} = useAppSelector(state => state.productsReducer)

  const detailsSchema = yup.object({
    size: yup.mixed<ProductSize>().oneOf(Object.values(ProductSize)).optional(),
    watering: yup.mixed<DetailsOption>().oneOf(Object.values(DetailsOption)).optional(),
    light: yup.mixed<DetailsOption>().oneOf(Object.values(DetailsOption)).optional(),
    difficulty: yup.mixed<DetailsOption>().oneOf(Object.values(DetailsOption)).optional(),
    hanging: yup.boolean().optional(),
    nonToxic: yup.boolean().optional(),
    airPurifying: yup.boolean().optional(),
    }).required()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<DetailsUpdate>({
        defaultValues: {
            size: undefined,
            watering: undefined,
            light: undefined,
            difficulty: undefined,
            hanging: undefined,
            nonToxic: undefined,
            airPurifying: undefined
        },
        resolver: yupResolver(detailsSchema)
    })

    const onFormSubmit: SubmitHandler<DetailsUpdate> = (data) => {
        const detailsUpdate : DetailsUpdate = { 
            size: data.size,
            watering: data.watering,
            light: data.light,
            difficulty: data.difficulty,
            hanging: data.hanging,
            nonToxic: data.nonToxic,
            airPurifying: data.airPurifying
        }
        const update : DetailsUpdateParams = {
          id: productId,
          update: detailsUpdate
        }
        dispatch(updateProductDetails(update))
        reset()
    }

  return (
    <Grid container spacing={2} sx={{padding: '2em'}}>
    <Typography variant='h4' display='flex'>Product details</Typography>
    <Typography variant='body1' display='flex'>
        Size: {product.productDetails?.size} - Watering: {product.productDetails?.watering} - Light: {product.productDetails?.light} - Difficulty: {product.productDetails?.difficulty} 
        {product.productDetails?.hanging && ' - Hanging'}{product.productDetails?.nonToxic && ' - Non-toxic'}{product.productDetails?.airPurifying && ' - Air-purifying'}
    </Typography>
    { error && <Alert severity='error'>{error}</Alert>}
    <Grid item xs={12}>
        <Box 
            component='form'
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap='1em'
            onSubmit={handleSubmit(onFormSubmit)}
        >
        <Grid container>
            <Grid item xs={3}>
            <FormControl>
              <InputLabel id='size'>Size</InputLabel>
              <Select
                id='size'
                error={errors.size !== undefined}
                labelId = 'size'
                label='Product size'
                defaultValue={product.productDetails ? product.productDetails.size : ProductSize.Medium}
                {...register('size')}
              >
                <MenuItem key={'Small'} value={ProductSize.Small}>Small</MenuItem>
                <MenuItem key={'Medium'} value={ProductSize.Medium}>Medium</MenuItem>
                <MenuItem key={'Large'} value={ProductSize.Large}>Large</MenuItem>
              </Select>
              {errors.size && <FormHelperText><div>{errors.size.message}</div></FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl>
              <InputLabel id='watering'>Watering</InputLabel>
              <Select
                id='watering'
                error={errors.watering !== undefined}
                labelId = 'watering'
                label='Watering'
                defaultValue={product.productDetails ? product.productDetails.watering : DetailsOption.Medium}
                {...register('watering')}
              >
                <MenuItem key={'Low'} value={DetailsOption.Low}>Low</MenuItem>
                <MenuItem key={'Medium'} value={DetailsOption.Medium}>Medium</MenuItem>
                <MenuItem key={'High'} value={DetailsOption.High}>High</MenuItem>
              </Select>
              {errors.watering && <FormHelperText><div>{errors.watering.message}</div></FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl>
              <InputLabel id='light'>Light</InputLabel>
              <Select
                id='light'
                error={errors.light !== undefined}
                labelId = 'light'
                label='Light'
                defaultValue={product.productDetails ? product.productDetails.light : DetailsOption.Medium}
                {...register('light')}
              >
                <MenuItem key={'Low'} value={DetailsOption.Low}>Low</MenuItem>
                <MenuItem key={'Medium'} value={DetailsOption.Medium}>Medium</MenuItem>
                <MenuItem key={'High'} value={DetailsOption.High}>High</MenuItem>
              </Select>
              {errors.light && <FormHelperText><div>{errors.light.message}</div></FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl>
              <InputLabel id='difficulty'>Difficulty</InputLabel>
              <Select
                id='difficulty'
                error={errors.difficulty !== undefined}
                labelId = 'difficulty'
                label='Difficulty'
                defaultValue={product.productDetails ? product.productDetails.difficulty : DetailsOption.Medium}
                {...register('difficulty')}
              >
                <MenuItem key={'Low'} value={DetailsOption.Low}>Low</MenuItem>
                <MenuItem key={'Medium'} value={DetailsOption.Medium}>Medium</MenuItem>
                <MenuItem key={'High'} value={DetailsOption.High}>High</MenuItem>
              </Select>
              {errors.difficulty && <FormHelperText><div>{errors.difficulty.message}</div></FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl>
              <InputLabel id='hanging'>Hanging</InputLabel>
              <Select
                id='hanging'
                error={errors.hanging !== undefined}
                labelId = 'hanging'
                label='Hanging'
                defaultValue={product.productDetails ? product.productDetails?.hanging : false}
                {...register('hanging')}
              >
                <MenuItem key={'yes'} value={true as any}>Yes</MenuItem>
                <MenuItem key={'no'} value={false as any}>No</MenuItem>
              </Select>
              {errors.hanging && <FormHelperText><div>{errors.hanging.message}</div></FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl>
              <InputLabel id='nonToxic'>Non-toxic</InputLabel>
              <Select
                id='nonToxic'
                error={errors.nonToxic !== undefined}
                labelId = 'nonToxic'
                label='Non-toxic'
                defaultValue={product.productDetails ? product.productDetails?.nonToxic : false}
                {...register('nonToxic')}
              >
                <MenuItem key={'yes'} value={true as any}>Yes</MenuItem>
                <MenuItem key={'no'} value={false as any}>No</MenuItem>
              </Select>
              {errors.nonToxic && <FormHelperText><div>{errors.nonToxic.message}</div></FormHelperText>}
            </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl>
              <InputLabel id='airPurifying'>Air-purifying</InputLabel>
              <Select
                id='airPurifying'
                error={errors.airPurifying !== undefined}
                labelId = 'airPurifying'
                label='airPurifying'
                defaultValue={product.productDetails ? product.productDetails?.airPurifying : false}
                {...register('airPurifying')}
              >
                <MenuItem key={'yes'} value={true as any}>Yes</MenuItem>
                <MenuItem key={'no'} value={false as any}>No</MenuItem>
              </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              {errors.airPurifying && <FormHelperText><div>{errors.airPurifying.message}</div></FormHelperText>}
              <Button type='submit'>Update details</Button>
            </Grid>
        </Grid>
        </Box>
    </Grid>
    </Grid>
  )    

}