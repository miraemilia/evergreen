import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getProfile, logout } from "../reducers/credentialsReducer"
import { LoginPrompt } from "../../../shared/pages/LoginPrompt"
import { updateUser } from "../../users/reducers/usersReducer";
import { UserUpdate, UserUpdateParams } from "../../users/types/UserUpdate";
import { UpdateUserForm } from "../../users/types/UpdateUserForm";
import { OrderTable } from "../../order/components/OrderTable";
import { resetCart } from "../../cart/reducers/cartReducer";

export const Profile = () => {

  const dispatch = useAppDispatch()

  const {profile, token} = useAppSelector(state => state.credentialsReducer)
  const {error} = useAppSelector(state => state.usersReducer)

  const [edit, setEdit] = useState<boolean>(false)
  const [dialogMessage, setDialogMessage] = useState<string>('')

  useEffect(() => {
    dispatch(getProfile(token))
  }, [edit])

  const onLogout = () => {
    dispatch(logout())
    dispatch(resetCart())
  }

  const handleClose = () => {
    setEdit(false)
    setDialogMessage('')
  }

  const registerSchema = yup.object({
    name: yup.string().optional(),
    email: yup.string().email().optional(),
    avatar: yup.string().url().optional()
  }).required()

  const { reset, register, handleSubmit, formState: { errors } } = useForm<UpdateUserForm>({
    defaultValues: {
        name: undefined,
        email: undefined,
        avatar: undefined
    },
    resolver: yupResolver(registerSchema)
  })

  const onFormSubmit: SubmitHandler<UpdateUserForm> = (data) => {
    if (profile) {
      const userUpdate : UserUpdate = {
      }
      if (data.name || data.name !== ''){
        userUpdate.name = data.name
      }
      if (data.email || data.email !== ''){
        userUpdate.email = data.email
      }
      if (data.avatar || data.avatar !== ''){
        userUpdate.avatar = data.avatar
      }
      const update : UserUpdateParams = {
        id: profile.id,
        update: userUpdate
      }
      dispatch(updateUser(update))
      reset()
      if (!error){
        setDialogMessage('Profile updated successfully')
      }
    }

  }

  if (!profile) {
    return (
      <LoginPrompt />
    )
  }

  return (
    <main>
      <Box padding={2}>
        <Typography variant='h2'>Profile</Typography>
        <Grid container alignItems='center'>
          <Grid item xs={6}>
            <Avatar src={profile.avatar} alt={profile.name} sx={{height: 'auto', width: 'auto', backgroundSize: 'cover'}}></Avatar>
          </Grid>
          <Grid item xs={6} sx={{padding: '3em'}}>
            <Typography>Name: {profile.name}</Typography>
            <Typography>Email address: {profile.email}</Typography>
            <Typography>Role: {profile.role}</Typography>
            <Button onClick={onLogout}>Log out</Button>
            <Button variant='outlined' onClick={() => setEdit(true)}><EditIcon/></Button>
          </Grid>
        </Grid>
      </Box>
      {profile.role === 'Customer' && <Box padding={2}>
        <Grid container alignItems='center'>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <OrderTable orders={profile.orders}></OrderTable>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>}
      <Dialog open={edit}>
        <DialogTitle>Update profile</DialogTitle>
        <DialogContent>
          <Box 
            component='form' 
            display='flex' 
            flexDirection='column'
            alignItems='center'
            gap='0.5em'
            onSubmit={handleSubmit(onFormSubmit)} 
            sx={{width: '25em', mx: 'auto'}}
          >
            {dialogMessage && dialogMessage}
            {error && error}
            <TextField
                id='name'
                error={errors.email !== undefined}
                placeholder='Your name'
                {...register('name')}
                helperText={errors.name && (<p>{errors.name.message}</p>)}
              /> 
              <TextField
                id='email'
                error={errors.email !== undefined}
                placeholder='Your email'
                {...register('email')}
                helperText={errors.email && (<p>{errors.email.message}</p>)}
              />
              <TextField
                id='avatar'
                error={errors.avatar !== undefined}
                placeholder='Avatar'
                {...register('avatar')}
                helperText={errors.avatar && (<p>{errors.avatar.message}</p>)}
              />
            <Button type='submit'>Submit</Button>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Close</Button>
        </DialogActions>
      </Dialog>
    </main>
  )
}