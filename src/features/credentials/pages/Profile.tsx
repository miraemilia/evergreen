import { Avatar, Box, Button, Grid, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { logout } from "../reducers/credentialsReducer"
import { LoginPrompt } from "../../../shared/pages/LoginPrompt"

export const Profile = () => {

  const dispatch = useAppDispatch()

  const profile = useAppSelector(state => state.credentialsReducer.profile)

  const onLogout = () => {
    dispatch(logout())
  }

  if (!profile) {
    return (
      <LoginPrompt />
    )
  }
  
  return (
    <main>
      <Box>
        <Typography variant='h2'>Profile</Typography>
        <Grid container alignItems='center'>
          <Grid item xs={4}>
            <Avatar src={profile.avatar} alt={profile.name} sx={{height: 'auto', width: 'auto'}}/>
          </Grid>
          <Grid item xs={8} sx={{padding: '3em'}}>
            <Typography>Name: {profile.name}</Typography>
            <Typography>Email address: {profile.email}</Typography>
            <Typography>Role: {profile.role}</Typography>
            <Button onClick={onLogout}>Log out</Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  )
}
