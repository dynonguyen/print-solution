import { Button } from '@cads-ui/core';
import { Search, ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, IconButton, InputBase, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/path';
import useAuth from '~/hooks/useAuth';
import { incrementByAmount } from '~/libs/redux/cardSlice';

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
  const [searchKey, setSearchKey] = useState('');
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { authenticated, login, logout } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchProducts = (e: any) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  };

  const handleSearchClick = () => {
    navigate(encodeURI(`/product/search?name=${searchKey}`));
  };

  const handleShoppingCartClick = () => {
    navigate(PATH.GUEST.CART);
  };

  const count = useSelector((state: any) => state?.card?.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const historyCardCount = JSON.parse(cartData);
      dispatch(incrementByAmount(historyCardCount.length));
    }
  }, [localStorage]);

  return (
    <AppBar position="static" sx={{ bgcolor: '#424242' }} elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
        <Button
          variant="text"
          onClick={() => {
            navigate(PATH.HOME);
          }}
        >
          <img
            src="https://res.cloudinary.com/dynonary/image/upload/v1678890436/print-solution/logo.png"
            width="30px"
            alt="Logo"
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
            Print Solution
          </Typography>
        </Button>
        <Stack sx={{ my: 2, flexGrow: 2, maxWidth: '550px' }} direction="row" spacing={1}>
          {/* Could replace the search component here */}
          <InputBase
            placeholder="Tìm sản phẩm in…"
            fullWidth
            sx={{ fontSize: 16, backgroundColor: '#fff', paddingLeft: 3, borderRadius: '5px' }}
            onChange={handleSearchProducts}
          />
          <IconButton color="inherit" onClick={handleSearchClick}>
            <Search />
          </IconButton>
        </Stack>
        <Stack spacing={2} direction="row">
          <IconButton onClick={handleShoppingCartClick} sx={{ color: '#fff', ml: 2 }}>
            <StyledBadge badgeContent={count} color="secondary">
              <ShoppingCart />
            </StyledBadge>
          </IconButton>
          {!authenticated ? (
            <Button
              onClick={() => (authenticated ? logout() : login())}
              sx={{ borderColor: '#fff', color: '#fff', ml: 5 }}
              variant="outlined"
            >
              Đăng nhập
            </Button>
          ) : (
            <>
              <IconButton
                onClick={handleMenu}
                color="inherit"
                aria-label="account menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                sx={{ ml: 2, position: 'relative' }}
              >
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2A6.969 6.969 0 0 1 12 19a6.969 6.969 0 0 1-5.106-2.228z"
                    fill="#fff"
                  />
                </svg>
              </IconButton>
            </>
          )}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
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
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={() => logout()}>Đăng xuất</MenuItem>
          </Menu>
        </Stack>
        {/* Below is the icon of user after login */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
