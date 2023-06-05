import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { withMinio } from '~/utils/withStatic';

interface Product {
    imageURL: string;
    name: string;
}

const ProductSearch = (props: Product) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 345 }}
                image={withMinio(props.imageURL)}
            />
            <CardContent sx={{ alignItem: "center", justifyContent: "center" }}>
                <Typography gutterBottom component="div" textAlign="center">
                    {props.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductSearch;
