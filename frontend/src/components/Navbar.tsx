import { Button, Grid } from '@cads-ui/core';
import { Search, ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/path';
import useAuth from '~/hooks/useAuth';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { login } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#424242' }} elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
        <Button
          variant="text"
          onClick={() => {
            navigate(PATH.HOME);
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Print Solution
          </Typography>
        </Button>
        <Grid sx={{ mt: 1.5 }} container spacing={2}>
          {/* Could replace the search component here */}
          <Grid item>
            <InputBase
              placeholder="Tìm sản phẩm in…"
              sx={{ fontSize: 16, width: '550px', backgroundColor: '#fff', paddingLeft: 3, borderRadius: '5px' }}
            />
          </Grid>
          <Grid item>
            <IconButton sx={{ color: '#fff' }}>
              <Search />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton sx={{ color: '#fff', ml: 2 }}>
              <StyledBadge badgeContent={4} color="secondary">
                <ShoppingCart />
              </StyledBadge>
            </IconButton>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                login();
              }}
              sx={{ borderColor: '#fff', color: '#fff', ml: 5 }}
              variant="outlined"
            >
              Đăng nhập
            </Button>
          </Grid>
        </Grid>
        {/* Below is the icon of user after login */}
        {/* <IconButton
            onClick={handleMenu}
            color="inherit"
            aria-label="account menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            sx={{ ml: 2 }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
