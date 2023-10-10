import { Box, Button, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"

export const Admin = () => {

    const profile = useAppSelector(state => state.credentialsReducer.profile)

    if (!profile || (profile && profile.role !== 'admin')) {
            return (
                <Typography>Not authorized</Typography>
            )
    }

  return (
    <main>
        <Box display='flex' flexDirection='column' gap='2em' alignItems='center'>
            <Button component={RouterLink} to='/admin/products'>Manage products</Button>
            <Button component={RouterLink} to='/admin/newproduct'>Add products</Button>
            <Button component={RouterLink} to='/admin/users' disabled>Manage users</Button>
        </Box>
    </main>
  )
}
