import { Paper, Typography } from "@mui/material"

export const Footer = () => {
  return (
  <footer>
    <Paper sx={{ position: 'sticky', bottom: 0, width: '100%', padding: '2em'}}>
      <Typography>Disclaimer: Product info is auto-generated and not accurate</Typography>
    </Paper>
  </footer>
  )
}