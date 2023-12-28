import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getProfile, logout } from "../reducers/credentialsReducer"
import { LoginPrompt } from "../../../shared/pages/LoginPrompt"
import { updateUser } from "../../users/reducers/usersReducer";
import { UserUpdate, UserUpdateParams } from "../../users/types/UserUpdate";
import { UpdateUserForm } from "../../users/types/UpdateUserForm";
import { OrderTable } from "../../order/components/OrderTable";

export const Profile = () => {

  const dispatch = useAppDispatch()

  const {profile, token} = useAppSelector(state => state.credentialsReducer)

  const [edit, setEdit] = useState<boolean>(false)

  useEffect(() => {
    dispatch(getProfile(token))
  }, [])

  const onLogout = () => {
    dispatch(logout())
  }

  const registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    avatar: yup.string().url().required()
  }).required()

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateUserForm>({
    defaultValues: {
        name: profile && profile.name,
        email: profile && profile.email,
        avatar: profile && profile.avatar
    },
    resolver: yupResolver(registerSchema)
  })

  const onFormSubmit: SubmitHandler<UpdateUserForm> = (data) => {
    if (profile) {
      const userUpdate : UserUpdate = {
        name: data.name,
        email: data.email,
        avatar: data.avatar
      }
      const update : UserUpdateParams = {
        id: Number(profile.id),
        update: userUpdate
      }
      dispatch(updateUser(update))
      dispatch(getProfile(token))
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
      <Box padding={2}>
        <Grid container alignItems='center'>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <OrderTable orders={profile.orders}></OrderTable>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Box>
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
          <Button onClick={() => setEdit(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </main>
  )
}
