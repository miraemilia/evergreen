import { AppBar, Drawer, IconButton, MenuItem, Toolbar, Typography, Link, Avatar, Box, Badge } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

import { useAppSelector } from "../../app/hooks";
import { AccountCircle } from "@mui/icons-material";

export const Header = () => {

  const profile = useAppSelector(state => state.credentialsReducer.profile)
  const cart = useAppSelector(state => state.cartReducer.cart)

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <IconButton size="large" aria-label="open drawer" onClick={toggleDrawer}><MenuIcon /></IconButton>
            <Typography variant="h1">Store</Typography>
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
              <MenuItem><Link component={RouterLink} to='/'>Home</Link></MenuItem>
              <MenuItem><Link component={RouterLink} to='/products'>Products</Link></MenuItem>
              { profile && <MenuItem><Link component={RouterLink} to='/profile'>Profile</Link></MenuItem>}
              { profile && <MenuItem><Link component={RouterLink} to='/cart'>Cart</Link></MenuItem>}
              { profile && profile.role === 'admin' && <MenuItem><Link component={RouterLink} to='/admin'>Admin</Link></MenuItem>}
              <MenuItem><Link component={RouterLink} to='/login'>{profile ? 'Log out' : 'Log in'}</Link></MenuItem>
              {!profile && <MenuItem><Link component={RouterLink} to='/register'>Register</Link></MenuItem>}
        </Drawer>
      </AppBar>
  )
}
