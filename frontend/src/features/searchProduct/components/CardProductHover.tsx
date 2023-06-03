import { Button } from '@cads-ui/core';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import { PATH } from '~/constants/path';

const CardProductHover = ({ id }: any) => {
    return (
        <Card sx={{
            width: 345,
            height: 345,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: 'pink'

        }}>
            <Link to={`${PATH.PRODUCT.ROOT}/${id}`}>
                <Button variant="contained" color="success">Xem chi tiết</Button>
            </Link>
        </Card>
    );
};

export default CardProductHover;
