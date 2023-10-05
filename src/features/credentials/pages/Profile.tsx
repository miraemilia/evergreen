import { Link, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../app/hooks"

export const Profile = () => {

  const profile = useAppSelector(state => state.credentialsReducer.profile)

  const navigate = useNavigate();

  if (!profile) {
    return (
      <Link onClick={() => navigate('/login')}>Please log in</Link>
    )
  }
  
  return (
    <main>
      <Paper>
        <Typography>Profile</Typography>
        <Typography>{profile.name}</Typography>
      </Paper>
    </main>
  )
}
