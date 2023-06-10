import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { withMinio } from '~/utils/withStatic';

// -----------------------------
interface ProductItemProps {
  image: string;
  label: string;
  description: string;
}

// -----------------------------
const ProductItem: React.FC<ProductItemProps> = (props) => {
  const { image, label, description } = props;

  return (
    <Card>
      <React.Fragment>
        <CardContent>
          <CardMedia
            sx={{ height: 150, maxWidth: 345 }}
            image={withMinio(image)}
          />
          <Typography color="text.secondary" gutterBottom>
            {label}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {description}
          </Typography>
        </CardContent>
      </React.Fragment>
    </Card>
  );
};

export default ProductItem;
