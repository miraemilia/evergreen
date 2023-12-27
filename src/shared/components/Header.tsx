import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Drawer, IconButton, MenuItem, Toolbar, Typography, Link, Avatar, Box, Badge } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { AccountCircle } from "@mui/icons-material";

import { useAppSelector } from "../../app/hooks";

export const Header = () => {

  const profile = useAppSelector(state => state.credentialsReducer.profile)
  const cart = useAppSelector(state => state.cartReducer.cart)

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
      <AppBar position='static' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <IconButton size='large' aria-label='open drawer' onClick={toggleDrawer}><MenuIcon /></IconButton>
            <Typography variant='h1' component={RouterLink} to='/'>Evergreen Botanics</Typography>
            <Box display='flex' sx={{marginLeft: 'auto', gap: '1em'}}>
            { profile &&
              <Badge badgeContent={cart.cartItems.reduce((a, ci) => ci.quantity + a, 0)} color='secondary'>
                <Link component={RouterLink} to='/cart'><LocalGroceryStoreIcon color='secondary' fontSize='large'/></Link>
              </Badge>
            }
            {!profile && <Link component={RouterLink} to='/login'><AccountCircle color='secondary' fontSize='large'/></Link>}
            {profile && <Link component={RouterLink} to='/profile'><Avatar src={profile.avatar} alt={profile.name}/></Link>}
            </Box>
        </Toolbar>
        <Drawer open={drawerOpen} onClick={toggleDrawer}>
              <MenuItem component={RouterLink} to='/'>Home</MenuItem>
              <MenuItem component={RouterLink} to='/products'>Products</MenuItem>
              { profile && <MenuItem component={RouterLink} to='/profile'>Profile</MenuItem>}
              { profile && profile.role === 'Customer' && <MenuItem component={RouterLink} to='/cart'>Cart</MenuItem>}
              { profile && profile.role === 'Admin' && <MenuItem component={RouterLink} to='/admin'>Admin</MenuItem>}
              <MenuItem component={RouterLink} to='/login'>{profile ? 'Log out' : 'Log in'}</MenuItem>
              {!profile && <MenuItem component={RouterLink} to='/register'>Register</MenuItem>}
        </Drawer>
      </AppBar>
  )
}
