import { Container, Grid, TextField, Typography } from '@mui/material';
import CategoryInput from './CategoryInput';
import Uploader from './Uploader';

type Props = {};

const OrderForm = (props: Props) => {
  return (
    <Container>
      <Typography variant="body2" color="text.secondary" align="center">
        Dat hang
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Uploader />
        </Grid>
        <Grid item xs={12}>
          <CategoryInput />
        </Grid>
        <Grid item xs={4}>
          <TextField id="outlined-basic" label="So dien thoai lien he" variant="outlined" />
          <TextField id="outlined-basic" label="So zalo nhan bao gia" variant="outlined" />
          <TextField id="outlined-basic" label="Ten cua ban" variant="outlined" />
          <TextField id="outlined-basic" label="Email cua ban" variant="outlined" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderForm;
