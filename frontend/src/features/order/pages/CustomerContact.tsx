import { Box, Divider, Flex, Typography } from '@cads-ui/core';
import { Button, TextField } from '@mui/material';

type Props = {};

function CustomerContact({}: Props) {
  return (
    <div>
      <Flex sx={{ justifyContent: 'center' }}>
        <Box
          sx={{
            w: '600px',
            h: '610px',
            boxShadow: '0px 0px 5px #aaaaaa'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: '20px 0px' }}>
            <Typography variant="h2">📚 Thông tin đặt hàng 📚</Typography>
          </Box>

          <Divider />

          <Box className="contact-items" sx={{ mt: 4, ml: '30px' }}>
            <Typography>Họ tên</Typography>
            <TextField sx={{ minWidth: '95%', m: '4px 0px' }} id="customer-name" className="customer-name" />
            <Typography sx={{ color: 'red' }}>Họ tên không được để trống</Typography>
          </Box>

          <Box className="contact-items" sx={{ mt: 4, ml: '30px' }}>
            <Typography>Số điện thoại</Typography>
            <TextField sx={{ minWidth: '95%', m: '4px 0px' }} id="customer-name" className="customer-name" />
            <Typography sx={{ color: 'red' }}>Số điện thoại không được để trống</Typography>
          </Box>

          <Box className="contact-items" sx={{ mt: 4, ml: '30px' }}>
            <Typography>Email</Typography>
            <TextField sx={{ width: '95%', m: '4px 0px' }} id="customer-name" className="customer-name" />
          </Box>

          <Button variant="contained" sx={{ color: 'white', mt: '40px', minWidth: '90%', ml: '30px', p: '8px 0px' }}>
            Hoàn thành
          </Button>
        </Box>
      </Flex>
    </div>
  );
}

export default CustomerContact;
