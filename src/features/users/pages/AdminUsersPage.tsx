import { Button, Typography } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"
import { Link as RouterLink } from "react-router-dom"

import { NotAuthorized } from "../../../shared/pages/NotAuthorized"

export const AdminUsersPage = () => {

  const profile = useAppSelector(state => state.credentialsReducer.profile)


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
        <Typography variant='h2'>Manage users</Typography>
        Users
    </main>
  )
}
