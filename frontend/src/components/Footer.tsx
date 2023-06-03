import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#434343', color: '#fff', py: 3, bottom: 0, width: '100%' }}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Print Solution
      </Typography>
      <Typography variant="body2" align="center" sx={{ mb: 1 }}>
        © 2023 Print Solution. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
