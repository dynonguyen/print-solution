import Card from '@mui/material/Card';
import React, { useState } from 'react';
import CardProductHover from './CardProductHover';
import ProductResult from './ProductResult';

interface ProductInfo {
    id: string;
    imageURL: string;
    name: string;
}

const CardProduct = (props: ProductInfo) => {

    const [hover, setHover] = useState(false)

    const handleEnterProduct = (event: React.SyntheticEvent) => {
        if (event.type == "mouseenter") {
            setHover(true)
        }
        return (
            <CardProductHover />
        )
    }

    const handleLeaveProduct = (event: React.SyntheticEvent) => {
        if (event.type == "mouseleave") {
            setHover(false)
        }
    }

    return (
        <Card
            sx={{
                width: 400,
                height: 400,
                alignItem: "center",
                justifyContent: "center",
                m: 1,
                boxShadow: "none",
                border: "none"
            }}
            onMouseEnter={handleEnterProduct}
            onMouseLeave={handleLeaveProduct}
        >
            {
                hover && (<CardProductHover id={props.id} />)
            }
            <ProductResult imageURL={props.imageURL} name={props.name} />
        </Card>
    );
};

export default CardProduct;
