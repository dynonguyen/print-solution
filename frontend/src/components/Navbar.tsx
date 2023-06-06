import { Button } from '@cads-ui/core';
import { Search, ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, IconButton, InputBase, Stack, Toolbar, Typography } from '@mui/material';
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
  const [searchKey,setSearchKey]=useState("")
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { login } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchProducts=(e:any)=>{
    e.preventDefault()
    setSearchKey(e.target.value.trim())
    e.target.value("")
  }

  const handleSearchClick=()=>{
    navigate(`/product/search?name=${searchKey}`)
  }

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
          <IconButton 
          color="inherit"
          onClick={handleSearchClick
          }
          >
            <Search />
          </IconButton>
        </Stack>
        <Stack spacing={2} direction="row">
          <IconButton sx={{ color: '#fff', ml: 2 }}>
            <StyledBadge badgeContent={4} color="secondary">
              <ShoppingCart />
            </StyledBadge>
          </IconButton>
          <Button
            onClick={() => {
              login();
            }}
            sx={{ borderColor: '#fff', color: '#fff', ml: 5 }}
            variant="outlined"
          >
            Đăng nhập
          </Button>
        </Stack>
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
