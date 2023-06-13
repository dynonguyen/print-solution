import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { PATH } from '~/constants/path';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    cursor: 'pointer',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06)
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12)
    }
  };
}) as typeof Chip;

export default function CardBreadcrumbs({ product }: any) {
  return (
    <Box sx={{ my: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link to="/">
          <StyledBreadcrumb component="div" label="HOME" icon={<HomeIcon fontSize="small" />} />
        </Link>
        <Link to={PATH.GUEST.CART}>
          <Typography color="black">Giỏ hàng</Typography>
        </Link>
      </Breadcrumbs>
    </Box>
  );
}