import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const ProductDesc = ({ desc }: any) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
            <Tab label="Giới thiệu ấn phẩm" {...a11yProps(0)} />
            <Tab label="Bảng giá" {...a11yProps(1)} />
            <Tab label="Khách hàng nhận xét" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              maxWidth: 1,
              objectFit: 'contain',
              overflowClipMargin: 'content-box',
              boxSizing: 'border-box'
            }}
            dangerouslySetInnerHTML={{ __html: `<style> img { max-width: 100% }</style> ${desc}` }}
          ></Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ height: '500px' }}> Bảng giá ....</Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box sx={{ height: '500px' }}> Đánh giá của khách hàng ....</Box>
        </TabPanel>
      </Box>
    </Paper>
  );
};

export default ProductDesc;
