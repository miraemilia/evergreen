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
import { NewProductImage } from "../types/NewProductImage";
import { ProductDetails } from "../types/ProductDetails";
import { ProductSize } from "../types/ProductSize";
import { DetailsOption } from "../types/DetailsOption";

export const AdminNewProduct = () => {

    const dispatch = useAppDispatch()

    const profile = useAppSelector(state => state.credentialsReducer.profile)
    const categories = useAppSelector(state => state.categoriesReducer.categories)

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [dialogMessage, setDialogMessage] = useState<string>('')

    const createProductSchema = yup.object({
        title: yup.string().required(),
        latinName: yup.string().optional(),
        price: yup.number().required(),
        description: yup.string().required(),
        categoryId: yup.string().min(1, 'A category needs to be selected').required(),
        size: yup.mixed<ProductSize>().oneOf(Object.values(ProductSize)).required(),
        watering: yup.mixed<DetailsOption>().oneOf(Object.values(DetailsOption)).required(),
        light: yup.mixed<DetailsOption>().oneOf(Object.values(DetailsOption)).required(),
        difficulty: yup.mixed<DetailsOption>().oneOf(Object.values(DetailsOption)).required(),
        hanging: yup.boolean().optional(),
        nonToxic: yup.boolean().optional(),
        airPurifying: yup.boolean().optional(),
        imageUrl1: yup.string().url().required(),
        imageUrl2: yup.string().url().required(),
        imageUrl3: yup.string().url().required(),
        inventory: yup.number().required()
    }).required()
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm<NewProductForm>({
        defaultValues: {
            title: '',
            latinName: undefined,
            price: undefined,
            description: '',
            categoryId: '',
            size: ProductSize.Medium,
            watering: DetailsOption.Medium,
            light: DetailsOption.Medium,
            difficulty: DetailsOption.Medium,
            hanging: false,
            nonToxic: false,
            airPurifying: false,
            imageUrl1: 'https://source.unsplash.com/shallow-photography-of-leaves-W5XTTLpk1-I',
            imageUrl2: 'https://source.unsplash.com/shallow-photography-of-leaves-W5XTTLpk1-I',
            imageUrl3: 'https://source.unsplash.com/shallow-photography-of-leaves-W5XTTLpk1-I',
            imageDescription1: undefined,
            imageDescription2: undefined,
            imageDescription3: undefined,
            inventory: undefined
        },
        resolver: yupResolver(createProductSchema)
    })

    const onFormSubmit: SubmitHandler<NewProductForm> = async (data) => {
        const image1 : NewProductImage = {imageUrl: data.imageUrl1, description: data.imageDescription1}
        const image2 : NewProductImage = {imageUrl: data.imageUrl2, description: data.imageDescription1}
        const image3 : NewProductImage = {imageUrl: data.imageUrl3, description: data.imageDescription1}
        const imageList : NewProductImage[] = [image1, image2, image3]
        const images = imageList.filter(i => i.imageUrl !== '')
        const details : ProductDetails = { 
          size: data.size,
          watering: data.watering,
          light: data.light,
          difficulty: data.difficulty,
          hanging: data.hanging,
          nonToxic: data.nonToxic,
          airPurifying: data.airPurifying
        }
        const createParams : NewProduct = {
          title: data.title,
          latinName: data.latinName,
          price: data.price,
          description: data.description,
          categoryId: data.categoryId,
          productImages: images,
          productDetails: details,
          inventory: data.inventory
        }
        const response = await dispatch(createProduct(createParams))
        if (typeof response.payload === 'string') {
          setDialogMessage(`Failed to create new product`)
        } else if (response.payload){
          setDialogMessage(`New product ${response.payload.title} (${response.payload.inventory} pieces) added`)
        }
        setDialogOpen(true)
        reset()
    }

    if (!profile || (profile && profile.role !== 'Admin')) {
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
              id='latinName'
              error={errors.latinName !== undefined}
              label='Latin name'
              {...register('latinName')}
              helperText={errors.latinName && (<p>{errors.latinName.message}</p>)}
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
            <FormControl>
              <InputLabel id='size'>Size</InputLabel>
              <Select
                id='size'
                error={errors.size !== undefined}
                labelId = 'size'
                label='Product size'
                defaultValue={ProductSize.Medium}
                {...register('size')}
              >
                <MenuItem key={'Small'} value={ProductSize.Small}>Small</MenuItem>
                <MenuItem key={'Medium'} value={ProductSize.Medium}>Medium</MenuItem>
                <MenuItem key={'Large'} value={ProductSize.Large}>Large</MenuItem>
              </Select>
              {errors.size && <FormHelperText><div>{errors.size.message}</div></FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel id='watering'>Watering</InputLabel>
              <Select
                id='watering'
                error={errors.watering !== undefined}
                labelId = 'watering'
                label='Watering'
                defaultValue={DetailsOption.Medium}
                {...register('watering')}
              >
                <MenuItem key={'Low'} value={DetailsOption.Low}>Low</MenuItem>
                <MenuItem key={'Medium'} value={DetailsOption.Medium}>Medium</MenuItem>
                <MenuItem key={'High'} value={DetailsOption.High}>High</MenuItem>
              </Select>
              {errors.watering && <FormHelperText><div>{errors.watering.message}</div></FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel id='light'>Light</InputLabel>
              <Select
                id='light'
                error={errors.light !== undefined}
                labelId = 'light'
                label='Light'
                defaultValue={DetailsOption.Medium}
                {...register('light')}
              >
                <MenuItem key={'Low'} value={DetailsOption.Low}>Low</MenuItem>
                <MenuItem key={'Medium'} value={DetailsOption.Medium}>Medium</MenuItem>
                <MenuItem key={'High'} value={DetailsOption.High}>High</MenuItem>
              </Select>
              {errors.light && <FormHelperText><div>{errors.light.message}</div></FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel id='difficulty'>Difficulty</InputLabel>
              <Select
                id='difficulty'
                error={errors.difficulty !== undefined}
                labelId = 'difficulty'
                label='Difficulty'
                defaultValue={DetailsOption.Medium}
                {...register('difficulty')}
              >
                <MenuItem key={'Low'} value={DetailsOption.Low}>Low</MenuItem>
                <MenuItem key={'Medium'} value={DetailsOption.Medium}>Medium</MenuItem>
                <MenuItem key={'High'} value={DetailsOption.High}>High</MenuItem>
              </Select>
              {errors.difficulty && <FormHelperText><div>{errors.difficulty.message}</div></FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel id='hanging'>Hanging</InputLabel>
              <Select
                id='hanging'
                error={errors.hanging !== undefined}
                labelId = 'hanging'
                label='Hanging'
                defaultValue={false}
                {...register('hanging')}
              >
                <MenuItem key={'yes'} value={true as any}>Yes</MenuItem>
                <MenuItem key={'no'} value={false as any}>No</MenuItem>
              </Select>
              {errors.hanging && <FormHelperText><div>{errors.hanging.message}</div></FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel id='nonToxic'>Non-toxic</InputLabel>
              <Select
                id='nonToxic'
                error={errors.nonToxic !== undefined}
                labelId = 'nonToxic'
                label='Non-toxic'
                defaultValue={false}
                {...register('nonToxic')}
              >
                <MenuItem key={'yes'} value={true as any}>Yes</MenuItem>
                <MenuItem key={'no'} value={false as any}>No</MenuItem>
              </Select>
              {errors.nonToxic && <FormHelperText><div>{errors.nonToxic.message}</div></FormHelperText>}
            </FormControl>
            <FormControl>
              <InputLabel id='airPurifying'>Air-purifying</InputLabel>
              <Select
                id='airPurifying'
                error={errors.airPurifying !== undefined}
                labelId = 'airPurifying'
                label='airPurifying'
                defaultValue={false}
                {...register('airPurifying')}
              >
                <MenuItem key={'yes'} value={true as any}>Yes</MenuItem>
                <MenuItem key={'no'} value={false as any}>No</MenuItem>
              </Select>
              {errors.airPurifying && <FormHelperText><div>{errors.airPurifying.message}</div></FormHelperText>}
            </FormControl>
            <TextField
              id='imageUrl1'
              error={errors.imageUrl1 !== undefined}
              label='Image 1'
              {...register('imageUrl1')}
              helperText={errors.imageUrl1 && (<p>{errors.imageUrl1.message}</p>)}
            />
            <TextField
              id='imageDescription1'
              error={errors.imageDescription1 !== undefined}
              label='Image 1 description'
              {...register('imageDescription1')}
              helperText={errors.imageDescription1 && (<p>{errors.imageDescription1.message}</p>)}
            />
             <TextField
              id='imageUrl2'
              error={errors.imageUrl2 !== undefined}
              label='Image 2'
              {...register('imageUrl2')}
              helperText={errors.imageUrl2 && (<p>{errors.imageUrl2.message}</p>)}
            />
            <TextField
              id='imageDescription2'
              error={errors.imageUrl2 !== undefined}
              label='Image 2 description'
              {...register('imageDescription2')}
              helperText={errors.imageDescription2 && (<p>{errors.imageDescription2.message}</p>)}
            />
             <TextField
              id='imageUrl3'
              error={errors.imageUrl3 !== undefined}
              label='Image 3'
              {...register('imageUrl3')}
              helperText={errors.imageUrl3 && (<p>{errors.imageUrl3.message}</p>)}
            />
             <TextField
              id='imageDescription3'
              error={errors.imageDescription3 !== undefined}
              label='Image 3 description'
              {...register('imageDescription3')}
              helperText={errors.imageDescription3 && (<p>{errors.imageDescription3.message}</p>)}
            />
            <TextField
              id='inventory'
              error={errors.inventory !== undefined}
              label='Inventory'
              {...register('inventory')}
              helperText={errors.inventory && (<p>{errors.inventory.message}</p>)}
            /> 
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
