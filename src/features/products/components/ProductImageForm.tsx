import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Alert, Box, Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, TextField, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { createProductImage, deleteProductImage } from "../reducers/productsReducer";
import { NewProductImage } from "../types/NewProductImage";
import { Product } from "../types/Product";

type Props = {
    product : Product
}

export const ProductImageForm = ({ product } : Props) => {

  const productId = product.id

  const dispatch = useAppDispatch()

  const [ imageError, setImageError ] = useState<string>('')

  const {error} = useAppSelector(state => state.productsReducer)

  const handleDeleteImage = (id : string) => {
    if (product!.productImages.length > 1) {
        dispatch(deleteProductImage(id))
    } else {
        setImageError('Only one image left: add more images to be able to delete this one')
    }
  }

  const productImageSchema = yup.object({
    productId: yup.string().optional(),
    imageUrl: yup.string().required(),
    description: yup.string().optional()
    }).required()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<NewProductImage>({
        defaultValues: {
            productId: productId,
            imageUrl: '',
            description: ''
        },
        resolver: yupResolver(productImageSchema)
    })

    const onFormSubmit: SubmitHandler<NewProductImage> = (data) => {
        data.productId = productId
        dispatch(createProductImage(data))
        setImageError('')
        reset()
    }

  return (
    <Grid container spacing={2} sx={{padding: '2em'}}>
    <Typography variant='h4'>Product images</Typography>
    {imageError && <Alert severity='error'>{imageError}</Alert>}
    { error && <Alert severity='error'>{error}</Alert>}
    <Grid item xs={12}>
        <ImageList cols={4}>
        {product.productImages.map(pi => (
            <ImageListItem key={pi.id}>
            <img
                srcSet={`${pi.imageUrl}?fit=crop&auto=format&dpr=2 2x`}
                src={`${pi.imageUrl}?fit=crop&auto=format`}
                alt={pi.description}
                loading="lazy"
            />
                <ImageListItemBar
                    sx={{
                        background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    title={pi.description}
                    position="top"
                    actionIcon={
                        <IconButton sx={{ color: 'white' }} onClick={() => handleDeleteImage(pi.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    }
                    actionPosition="left"
                />
            </ImageListItem>
        ))}
        </ImageList>
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
                id='imageUrl'
                error={errors.imageUrl !== undefined}
                placeholder='Image url'
                {...register('imageUrl')}
                helperText={errors.imageUrl && (<p>{errors.imageUrl.message}</p>)}
            /> 
            <TextField
                id='description'
                type='description'
                error={errors.description !== undefined}
                placeholder='Description'
                {...register('description')}
                helperText={errors.description && (<p>{errors.description.message}</p>)}
            /> 
            <Button type='submit'>Add image</Button>
        </Box>
    </Grid>
    </Grid>
  )    

}
