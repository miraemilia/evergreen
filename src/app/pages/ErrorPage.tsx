import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const ErrorPage = () => {

  const navigate = useNavigate()

  return (
    <main>
      <Typography>Something unexpexted happened</Typography>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </main>
  )
}
