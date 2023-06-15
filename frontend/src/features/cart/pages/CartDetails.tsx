import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartItem, addFileDesign, removeCartItem, removeFileDesign } from '~/libs/redux/cartSlice';
import { withMinio } from '~/utils/withStatic';
import StyledBreadcrumb from '../components/CardBreadcrumbs';
import { toast } from 'react-toastify';
import { PATH } from '~/constants/path';
import { RootState } from '~/libs/redux/store';
import UploadFile from '~/components/UploadFile';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const CartDetails: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [open, setOpen] = React.useState<CartItem | null>();
  const [requestingQuote, setRequestingQuote] = useState(false)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleEdit = (index: number) => {
    navigate(`/product/${cartItems[index].uuid}`);
  };

  const handleRequestQuote = () => {
    setRequestingQuote(true)
    if (cartItems.length <= 0) return toast("Vui lòng chọn ít nhất 1 sản phẩm!", { type: 'error' })
    navigate(PATH.ORDER.CUS_CONTACT);
  };

  const MAX_FILE = 5;
  const MAX_SIZE = 500;

  useEffect(() => {
    if (!requestingQuote) { // Add a condition to check if requesting quote is false
      dispatch(removeFileDesign());
    }
  }, [dispatch, requestingQuote])



  return (
    <Box minHeight="calc(100vh - 196px)" display="flex" flexDirection="column">
      <StyledBreadcrumb />

      <Box flex={1} component={Paper} mt={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ảnh</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Chọn file thiết kế</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <img src={withMinio(item.photo)} alt={item.name} style={{ width: '90px', height: 'auto' }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">Giá: {item.price}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: 20, fontWeight: 600 }}>{item.amount}</TableCell>
                  <TableCell>
                    <UploadFile sx={{
                      px: 2,
                      py: 2,
                    }} maxFiles={MAX_FILE} maxSizePerFile={MAX_SIZE} onFileChange={(files) => dispatch(addFileDesign({ files, productId: item._id }))} />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => setOpen(item)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack direction={'row'} spacing={2} width={'100%'}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          href={"/"}
          style={{ marginTop: '30px', marginBottom: '30px' }}
        >
          Chọn thêm sản phẩm
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="warning"
          onClick={handleRequestQuote}
          style={{ marginTop: '30px', marginBottom: '30px' }}
        >
          Yêu cầu báo giá
        </Button>

      </Stack>
      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Stack direction='row-reverse' spacing={4} marginTop={2}>
            <Button variant='contained' color='error' onClick={() => { dispatch(removeCartItem(open?._id)); setOpen(null) }}>Remove</Button>
            <Button variant='contained' color='inherit' onClick={() => setOpen(null)}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default CartDetails;
