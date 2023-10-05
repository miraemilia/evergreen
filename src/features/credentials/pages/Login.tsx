import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControl, Paper, TextField, Typography } from "@mui/material"

import { LoginParams } from "../types/LoginParams";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { login, logout } from "../reducers/credentialsReducer";

export const Login = () => {

  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.credentialsReducer.profile)
  const credentialsError = useAppSelector(state => state.credentialsReducer.error)
  
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
    <Paper>
      <Typography>You are logged in as {profile.name}</Typography>
      <Button onClick={onLogout}>Log out</Button>
    </Paper>
    )
  }

  return (
    <main>
      {credentialsError && <Typography>{credentialsError}</Typography>}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormControl>
          <TextField
            id="email"
            error={errors.email !== undefined}
            placeholder="Your email"
            {...register("email")}
            helperText={errors.email && (<p>{errors.email.message}</p>)}
          /> 
          <TextField
            id="password"
            error={errors.password !== undefined}
            placeholder="Password"
            {...register("password")}
            helperText={errors.password && (<p>{errors.password.message}</p>)}
          /> 
          <Button type="submit">Login</Button>
        </FormControl>
      </form>
    </main>
  )
}
