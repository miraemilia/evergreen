import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControl, Link, TextField, Typography } from "@mui/material"
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createUser } from "../reducers/usersReducer";
import { NewUser } from "../types/NewUser";
import { NewUserForm } from "../types/NewUserForm";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userError = useAppSelector(state => state.usersReducer.error)

    const [submitted, setSubmitted] = useState<boolean>(false)
  
    const registerSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password1: yup.string().required().min(6),
        password2: yup.string().required().oneOf([yup.ref('password1')], 'Your passwords do not match.')
    }).required()
  
    const { register, handleSubmit, formState: { errors }, reset } = useForm<NewUserForm>({
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
          avatar: "https://picsum.photos/id/237/200/300"
        }
        dispatch(createUser(createParams))
        if (!userError) {
          setSubmitted(true)
        }
    }

    if (submitted) {
      return (<Typography>Thank you for registering! <Link onClick={() => navigate('/login')}>Log in</Link></Typography>)
    }
  
    return (
      <main>
        {userError && <Typography>{userError}</Typography>}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <FormControl>
          <TextField
              id="name"
              error={errors.email !== undefined}
              placeholder="Your name"
              {...register("name")}
              helperText={errors.name && (<p>{errors.name.message}</p>)}
            /> 
            <TextField
              id="email"
              error={errors.email !== undefined}
              placeholder="Your email"
              {...register("email")}
              helperText={errors.email && (<p>{errors.email.message}</p>)}
            /> 
            <TextField
              id="password1"
              error={errors.password1 !== undefined}
              placeholder="Password"
              {...register("password1")}
              helperText={errors.password1 && (<p>{errors.password1.message}</p>)}
            />
            <TextField
              id="password2"
              error={errors.password2 !== undefined}
              placeholder="Type password again"
              {...register("password2")}
              helperText={errors.password2 && (<p>{errors.password2.message}</p>)}
            />
            <Button type="submit">Register</Button>
          </FormControl>
        </form>
      </main>
    )
  }
