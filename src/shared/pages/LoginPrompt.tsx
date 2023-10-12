import { Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

export const LoginPrompt = () => {
  return (
    <main>
        <Button component={RouterLink} to='/login'>Please log in</Button>
    </main>
  )
}
