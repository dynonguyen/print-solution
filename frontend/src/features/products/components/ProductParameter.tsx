import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { Key } from 'react';

const ProductParameter = ({ infos }: any) => {
  return (
    <>
      <Typography variant="h6" color={indigo[500]} sx={{ mt: 4 }}>
        Thông số cơ bản
      </Typography>
      <List>
        {infos.map((info: { label: Key | null | undefined; value: any }) => {
          return (
            <ListItem key={info.label}>
              <ListItemText primary={`${info.label}: ${info.value}`} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default ProductParameter;
