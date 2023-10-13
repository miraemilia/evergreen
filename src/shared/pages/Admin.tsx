import { Link as RouterLink } from "react-router-dom"
import { Box, Button, Typography } from "@mui/material"

import { useAppSelector } from "../../app/hooks"
import { NotAuthorized } from "./NotAuthorized"

export const Admin = () => {

    const profile = useAppSelector(state => state.credentialsReducer.profile)

    if (!profile || (profile && profile.role !== 'admin')) {
            return (
                <NotAuthorized />
            )
    }

  return (
    <main>
        <Typography variant='h2' textAlign={'center'}>Admin Dashboard</Typography>
        <Box display='flex' flexDirection='column' gap='2em' alignItems='center'>
            <Button component={RouterLink} to='/admin/newproduct'>Add products</Button>
            <Button component={RouterLink} to='/admin/products'>Manage products</Button>
            <Button component={RouterLink} to='/admin/categories'>Manage categories</Button>
            <Button component={RouterLink} to='/admin/users' disabled>Manage users</Button>
        </Box>
    </main>
  )
}
