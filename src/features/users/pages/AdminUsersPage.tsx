import { Button, Typography } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"
import { Link as RouterLink } from "react-router-dom"

export const AdminUsersPage = () => {

  const profile = useAppSelector(state => state.credentialsReducer.profile)


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
        Users
    </main>
  )
}
