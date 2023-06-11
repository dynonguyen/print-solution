import { makeStyles } from '@cads-ui/core';
import { Container, Typography, Box, Link, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { withStatic } from '~/utils/withStatic';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 6,
    justifyItems: 'center',
    justifyContent: 'center',
    padding: 12,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${withStatic('img/detail_bg-light.png')})`,
    color: '#000',
    bgColor: '#c4d2fb',
    alignItems: 'center',
    width: 488,
    fontWeight: 400,
    borderRadius: 4,
    fontFamily: 'Montserrat, sans-serif',
    boxShadow: '0px 0px 2px 2px black'
  },
}));

const OrderSuccess = () => {
  const classes = useStyles();
  const location = useLocation();
  const [displayId, setDisplayId] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const displayId = searchParams.get('display_id');
    setDisplayId(displayId || '');
  }, [location.search]);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 196px)', py: 5, px: 0, mx: 0, display: 'flex', alignItems: "center", justifyContent: 'center' }} >
      <Box className={classes.root} sx={{ boxShadow: 3 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 600 }}>Đặt hàng thành công</Typography>
        <Typography variant="body2" sx={{ fontSize: 16 }} >Mã đơn hàng của bạn</Typography>
        <Box sx={{ py: 1, px: 3, borderRadius: 24, fontWeight: 600, fontSize: '24px', color: 'black', bgcolor: '#e8e8e8' }}>{displayId}</Box>
        <Typography variant="body2" sx={{ fontSize: 16, textAlign: 'center', color: '##cbcbcb' }} >
          Bạn có thể bấm vào&nbsp;
          {/* <Button href={`/order/details?display_id=${displayId}`} sx={{ color: '#81b9fc' }} component={Link}>0357 099 </Button> */}
          <Link underline="hover" sx={{ color: '#983815' }} href={`/order/details?display_id=${displayId}`}>đây</Link>
          &nbsp;để kiểm tra trạng thái đơn hàng bằng mã phía trên</Typography>

        <Typography variant="body2" sx={{ fontSize: 16, fontWeight: 600 }} >Chúng tôi ở đây hỗ trợ bạn: <Link underline="hover" href='tel:0357099285' sx={{ color: '#983815' }}>0357 099 285</Link></Typography>
      </Box>
    </Box>
  )
};

export default OrderSuccess;
