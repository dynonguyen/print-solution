import { Box } from '@mui/material';
import { withMinio } from '~/utils/withStatic';

const ProductImage = (props: any) => {
  return (
    <Box
      component="img"
      sx={{
        height: 1,
        width: 1,
        minWidth: '200px',
        minHeight: '200px',
        maxHeight: '30rem',
        border: '12px solid #ccc',
        backgroundColor: '#ccc',
        borderRadius: 2,
        alignItems: 'center',
        objectFit: 'contain'
      }}
      alt={props.imgAlt}
      src={withMinio(props.imgScr)}
    />
  );
};

export default ProductImage;
