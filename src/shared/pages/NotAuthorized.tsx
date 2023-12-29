import { Link as RouterLink } from "react-router-dom"
import { Button, Typography } from "@mui/material"

export const NotAuthorized = () => {
  return (
    <main>
        <Typography>Access denied.</Typography>
        <Typography>Please log in with different user role.</Typography>
        <Button component={RouterLink} to='/login'>Log in</Button>
    </main>
  )
}
