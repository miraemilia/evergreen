import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, TextField, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createUser } from "../reducers/usersReducer";
import { NewUser } from "../types/NewUser";
import { NewUserForm } from "../types/NewUserForm";

export const Register = () => {
    
    const dispatch = useAppDispatch()

    const userError = useAppSelector(state => state.usersReducer.error)

    const [submitted, setSubmitted] = useState<boolean>(false)
  
    const registerSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password1: yup.string().required().min(6),
        password2: yup.string().required().oneOf([yup.ref('password1')], 'Your passwords do not match.')
    }).required()
  
    const { register, handleSubmit, formState: { errors } } = useForm<NewUserForm>({
        defaultValues: {
            name: '',
            email: '',
            password1: '',
            password2: ''

        },
        resolver: yupResolver(registerSchema)
    })
  
    const onFormSubmit: SubmitHandler<NewUserForm> = (data) => {
        const createParams : NewUser = {
          name: data.name,
          email: data.email,
          password: data.password1,
          avatar: `https://ui-avatars.com/api/?name=${data.name}&background=f9e3e2&color=444654&length=1`,
        }
        dispatch(createUser(createParams))
        if (!userError) {
          setSubmitted(true)
        }
    }

    if (submitted) {
      return (
        <main>
          <Box sx={{padding: '5em', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2em'}}>
            <Typography variant='h5'>Thank you for registering!</Typography>
            <Button component={RouterLink} to='/login'>Log in</Button>
          </Box>
        </main>
      )
    }
  
    return (
      <main>
        <Typography variant='h2' textAlign={'center'}>Register</Typography>
        {userError && <Alert severity='error'>{userError}</Alert>}
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
              id='password1'
              error={errors.password1 !== undefined}
              placeholder='Password'
              {...register('password1')}
              helperText={errors.password1 && (<p>{errors.password1.message}</p>)}
            />
            <TextField
              id='password2'
              error={errors.password2 !== undefined}
              placeholder='Type password again'
              {...register('password2')}
              helperText={errors.password2 && (<p>{errors.password2.message}</p>)}
            />
            <Button type='submit'>Register</Button>
        </Box>
      </main>
    )
  }
