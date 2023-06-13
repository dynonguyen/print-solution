import { Box, Typography } from '@mui/material';
import React from 'react';
import UploadFiles from './UploadFiles';

// -----------------------------
interface UploaderProps { }

// -----------------------------
const Uploader: React.FC<UploaderProps> = (props) => {
  return (
    <Box>
      <UploadFiles />
      <Typography>Tai len tai lieu</Typography>
    </Box>
  );
};

export default Uploader;
