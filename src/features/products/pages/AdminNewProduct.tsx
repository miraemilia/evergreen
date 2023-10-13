import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { NewProduct } from "../types/NewProduct"
import { createProduct } from "../reducers/productsReducer"
import { NewProductForm } from "../types/NewProductForm"
import { NotAuthorized } from "../../../shared/pages/NotAuthorized";

export const AdminNewProduct = () => {

    const dispatch = useAppDispatch()

    const profile = useAppSelector(state => state.credentialsReducer.profile)
    const categories = useAppSelector(state => state.categoriesReducer.categories)

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [dialogMessage, setDialogMessage] = useState<string>('')

    const createProductSchema = yup.object({
        title: yup.string().required(),
        price: yup.number().required(),
        description: yup.string().required(),
        categoryId: yup.number().min(1, 'A category needs to be selected').required(),
        image1: yup.string().url().required(),
        image2: yup.string().url().required(),
        image3: yup.string().url().required()
    }).required()
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm<NewProductForm>({
        defaultValues: {
            title: '',
            price: undefined,
            description: '',
            categoryId: 0,
            image1: 'https://picsum.photos/id/535/500/',
            image2: 'https://picsum.photos/id/56/500/',
            image3: 'https://picsum.photos/id/660/500/'
        },
        resolver: yupResolver(createProductSchema)
    })

    const onFormSubmit: SubmitHandler<NewProductForm> = async (data) => {
        const imageList : string[] = [data.image1, data.image2, data.image3]
        const images = imageList.filter(i => i !== '')
        const createParams : NewProduct = {
          title: data.title,
          price: data.price,
          description: data.description,
          categoryId: data.categoryId,
          images: images
        }
        const response = await dispatch(createProduct(createParams))
        if (typeof response.payload === 'string') {
          setDialogMessage(`Failed to create new product`)
        } else if (response.payload){
          setDialogMessage(`New product ${response.payload.id} ${response.payload.title} added`)
        }
        setDialogOpen(true)
        reset()
    }

    if (!profile || (profile && profile.role !== 'admin')) {
      return (
          <main>
              <NotAuthorized />
          </main>
      )
  }

  return (
    <main>
        <Button component={RouterLink} to='/admin'>Back to Admin Dashboard</Button>
        <Typography variant='h2'>Create new product</Typography>
        <Box 
          component='form' 
          display='flex' 
          flexDirection='column'
          gap='1.5em'
          onSubmit={handleSubmit(onFormSubmit)} 
          sx={{width: '25em', mx: 'auto'}}
        >
          <TextField
              id='title'
              error={errors.title !== undefined}
              label='Title'
              {...register('title')}
              helperText={errors.title && (<p>{errors.title.message}</p>)}
            /> 
            <TextField
              id='price'
              error={errors.price !== undefined}
              label='Price'
              {...register('price')}
              helperText={errors.price && (<p>{errors.price.message}</p>)}
            /> 
            <TextField
              id='description'
              error={errors.description !== undefined}
              label='Description'
              {...register('description')}
              helperText={errors.description && (<p>{errors.description.message}</p>)}
            />
            <TextField
              id='image1'
              error={errors.image1 !== undefined}
              label='Image 1'
              {...register('image1')}
              helperText={errors.image1 && (<p>{errors.image1.message}</p>)}
            />
             <TextField
              id='image2'
              error={errors.image2 !== undefined}
              label='Image 2'
              {...register('image2')}
              helperText={errors.image2 && (<p>{errors.image2.message}</p>)}
            />
             <TextField
              id='image3'
              error={errors.image3 !== undefined}
              label='Image 3'
              {...register('image3')}
              helperText={errors.image3 && (<p>{errors.image3.message}</p>)}
            />
            <FormControl>
              <InputLabel id='cat'>Category ID</InputLabel>
              <Select
                id='categoryId'
                error={errors.categoryId !== undefined}
                labelId = 'cat'
                label='Category ID'
                defaultValue={0}
                {...register('categoryId')}
              >
                <MenuItem key='0' value={0}><em>None</em></MenuItem>
                {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
              </Select>
              {errors.categoryId && <FormHelperText><div>{errors.categoryId.message}</div></FormHelperText>}
            </FormControl>
            <Button type='submit'>Create product</Button>
        </Box>
        <Dialog open={dialogOpen}>
          <DialogContent>
              <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Ok</Button>
          </DialogActions>
        </Dialog>
    </main>
  )
}
