import { Flex } from '@cads-ui/core';
import { Box } from '@mui/material';
import { withMinio } from '~/utils/withStatic';

const ProductImage = (props: any) => {
  return (
    <Flex>
      <Box
        component="img"
        sx={{
          height: 1,
          width: 1,
          border: '12px solid #ccc',
          borderRadius: 2,
          alignItems: 'center'
        }}
        alt={props.imgAlt}
        src={withMinio(props.imgScr)}
      />
    </Flex>
  );
};

export default ProductImage;
