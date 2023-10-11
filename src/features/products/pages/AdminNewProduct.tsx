import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, FormHelperText, MenuItem, Select, TextField, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { NewProduct } from "../types/NewProduct"
import { createProduct } from "../reducers/productsReducer"
import { NewProductForm } from "../types/NewProductForm"

export const AdminNewProduct = () => {

    const dispatch = useAppDispatch()

    const profile = useAppSelector(state => state.credentialsReducer.profile)
    const categories = useAppSelector(state => state.categoriesReducer.categories)

    const [dialogOpen, setDialogOpen] = useState<boolean>(false)

    const createProductSchema = yup.object({
        title: yup.string().required(),
        price: yup.number().required(),
        description: yup.string().required(),
        categoryId: yup.number().required()
    }).required()
  
    const { register, handleSubmit, reset, formState: { errors } } = useForm<NewProductForm>({
        defaultValues: {
            title: '',
            price: undefined,
            description: '',
            categoryId: undefined
        },
        resolver: yupResolver(createProductSchema)
    })

    const onFormSubmit: SubmitHandler<NewProductForm> = (data) => {
        const createParams : NewProduct = {
          title: data.title,
          price: data.price,
          description: data.description,
          categoryId: data.categoryId,
          images: ["https://picsum.photos/id/530/200/300"]
        }
        dispatch(createProduct(createParams))
        setDialogOpen(true)
        reset()
    }

    if (!profile || (profile && profile.role !== 'admin')) {
      return (
          <main>
              <Typography>Not authorized</Typography>
          </main>
      )
  }

  return (
    <main>
        <Button component={RouterLink} to='/admin'>Back to Admin Dashboard</Button>
        <Box 
          component="form" 
          display='flex' 
          flexDirection='column'
          gap='1.5em'
          onSubmit={handleSubmit(onFormSubmit)} 
          sx={{width: '25em', mx: 'auto'}}
        >
          <TextField
              id="title"
              error={errors.title !== undefined}
              label="Title"
              {...register("title")}
              helperText={errors.title && (<p>{errors.title.message}</p>)}
            /> 
            <TextField
              id="price"
              error={errors.price !== undefined}
              label="Price"
              {...register("price")}
              helperText={errors.price && (<p>{errors.price.message}</p>)}
            /> 
            <TextField
              id="description"
              error={errors.description !== undefined}
              label="Description"
              {...register("description")}
              helperText={errors.description && (<p>{errors.description.message}</p>)}
            />
            <Select
                id="categoryId"
                error={errors.categoryId !== undefined}
                label="Category ID"
                {...register("categoryId")}
            >
                {categories.map(c => <MenuItem value={c.id}>{c.name}</MenuItem>)}
            </Select>
            {errors.categoryId && <FormHelperText>{errors.categoryId.message}</FormHelperText>}
            <Button type="submit">Create product</Button>
        </Box>
        <Dialog open={dialogOpen}>
          <DialogContent>
              <DialogContentText>New product created</DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Ok</Button>
          </DialogActions>
        </Dialog>
    </main>
  )
}
