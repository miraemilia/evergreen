import { AppBar, Drawer, IconButton, MenuItem, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export const Header = () => {

  const navigate = useNavigate()

  const profile = useAppSelector(state => state.credentialsReducer.profile)

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <IconButton size="large" aria-label="open drawer" onClick={toggleDrawer}><MenuIcon /></IconButton>
            <Typography>Store</Typography>
        </Toolbar>
        <Drawer open={drawerOpen} onClick={toggleDrawer}>
              <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
              <MenuItem onClick={() => navigate('products')}>Products</MenuItem>
              { profile && <MenuItem onClick={() => navigate('profile')}>Profile</MenuItem>}
              <MenuItem onClick={() => navigate('login')}>{profile ? 'Log out' : 'Log in'}</MenuItem>
              {!profile && <MenuItem onClick={() => navigate('register')}>Register</MenuItem>}
        </Drawer>
      </AppBar>
  )
}
