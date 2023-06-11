import { Flex } from '@cads-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { toVND } from '~/utils/helper';
import { withMinio } from '~/utils/withStatic';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function ItemDetail(props: any) {
  const { item, handleClose, open } = props;

  return (
    <div>
      <BootstrapDialog maxWidth="md" open={open} onClose={handleClose}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {item.product.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Flex justifyContent="space-between">
            <Flex direction="column">
              <Typography gutterBottom>
                <Box
                  component="img"
                  sx={{
                    height: '10rem',
                    width: '10rem',
                    objectFit: 'contain',
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    alignItems: 'center',
                    mr: 2
                  }}
                  alt={item.product.name}
                  src={withMinio(item.product.photo)}
                />
              </Typography>
              {item.options.map((option: any) => (
                <Typography key={option.label} gutterBottom>
                  {option.label}: {option.values.toString()}.
                </Typography>
              ))}
            </Flex>
            <Flex direction="column" spacing={3}>
              <Typography variant="body2">Số lượng: {item.amount}</Typography>
              <Typography variant="body1" color={red[500]}>
                {toVND(item.price)}
              </Typography>
            </Flex>
          </Flex>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Link to={`/product/${item.product.uuid}`}>Xem trang sản phẩm</Link>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
