import { Avatar, Flex, Typography } from '@cads-ui/core';
import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { toVND } from '~/utils/helper';
import { withMinio } from '~/utils/withStatic';
interface Product {
  _id: string;
  name: string;
  category: {
    name: string;
  };
  price: number;
  unit: string;
  photo: string;
}
const ProductItemGuest: React.FC<Product> = (props) => {
  return (
    <React.Fragment>
      <Flex direction="column" justifyContent="center" alignItems="center" sx={{ m: 1, p: 0.5, position: 'relative' }}>
        <Box bgcolor="#f5f5f5" sx={{ p: 2, borderRadius: 2 }}>
          {/* FIX ME: Cannot navigate to product detail  */}
          <Link to={`/product/${props._id}`}>
            <Avatar
              shape="rounded"
              src={withMinio(props.photo)}
              sx={{ bgColor: '#fff', color: 'primary.main' }}
              size={230}
            />
          </Link>
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ color: '#9e9e9e', mt: 3, mb: 2, wordBreak: 'break-all' }}
            maxLine={2}
          >
            {props.category.name}
          </Typography>
          <Typography align="center" sx={{ mt: 3, mb: 2, wordBreak: 'break-all' }} maxLine={2}>
            {props.name}
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ color: '#00e676', mt: 3, mb: 2, wordBreak: 'break-all' }}
            maxLine={2}
          >
            Chỉ từ {toVND(props.price)} / {props.unit}
          </Typography>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default ProductItemGuest;
