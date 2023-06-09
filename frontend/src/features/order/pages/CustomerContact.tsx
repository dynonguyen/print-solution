import { Box, Flex } from '@cads-ui/core';
import CusContactForm from '../components/CusContactForm';

function CustomerContact() {
  return (
    <Flex sx={{ justifyContent: 'center' }}>
      <Box
        sx={{
          m: '10px 0',
          w: '600px',
          h: '600px',
          boxShadow: '0px 0px 5px #aaaaaa'
        }}
      >
        <CusContactForm />
      </Box>
    </Flex>
  );
}

export default CustomerContact;
