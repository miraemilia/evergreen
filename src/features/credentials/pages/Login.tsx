import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link as RouterLink} from "react-router-dom";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material"

import { LoginParams } from "../types/LoginParams";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { login, logout } from "../reducers/credentialsReducer";

export const Login = () => {

  const dispatch = useAppDispatch()

  const {profile, error} = useAppSelector(state => state.credentialsReducer)

  const loginSchema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().required()
  }).required()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginParams>({
      defaultValues: {
          email: '',
          password: ''
      },
      resolver: yupResolver(loginSchema)
  })

  const onFormSubmit: SubmitHandler<LoginParams> = (data) => {
      dispatch(login(data))
      reset()
  }

  const onLogout = () => {
    dispatch(logout())
  }

  if (profile) {
    return (
      <main>
        <Box display='flex' flexDirection='column' alignItems='center' gap='2em'>
          <Typography textAlign='center'>You are logged in as <Link component={RouterLink} to='/profile'>{profile.name}</Link></Typography>
          <Button onClick={onLogout}>Log out</Button>
        </Box>
      </main>
    )
  }

  return (
    <main>
      <Typography variant="h2" textAlign={'center'}>Log in</Typography>
      {error && <Alert severity="error">{error}</Alert>}
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
            id="email"
            error={errors.email !== undefined}
            placeholder="Your email"
            {...register("email")}
            helperText={errors.email && (<p>{errors.email.message}</p>)}
          /> 
          <TextField
            id="password"
            type="password"
            error={errors.password !== undefined}
            placeholder="Password"
            {...register("password")}
            helperText={errors.password && (<p>{errors.password.message}</p>)}
          /> 
          <Button type="submit">Login</Button>
          <Link component={RouterLink} to='/register'>Register</Link>
      </Box>
    </main>
  )
}
