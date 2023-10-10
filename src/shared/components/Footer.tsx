import { Paper, Typography } from "@mui/material"

export const Footer = () => {
  return (
  <footer>
    <Paper sx={{ position: 'sticky', bottom: 0, width: '100%', padding: '2em'}}>
      <Typography>Contact us: store@mail.com</Typography>
    </Paper>
  </footer>
  )
}