import { AppBar, Box, Drawer, IconButton, MenuItem, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const navigate = useNavigate()

  return (
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <IconButton size="large" aria-label="open drawer" onClick={toggleDrawer}><MenuIcon /></IconButton>
            <Typography>Store</Typography>
        </Toolbar>
        <Drawer open={drawerOpen} onClick={toggleDrawer}>
              <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
              <MenuItem onClick={() => navigate('products')}>Products</MenuItem>
              <MenuItem onClick={() => navigate('profile')}>Profile</MenuItem>
              <MenuItem onClick={() => navigate('login')}>Login</MenuItem>
        </Drawer>
      </AppBar>
  )
}
