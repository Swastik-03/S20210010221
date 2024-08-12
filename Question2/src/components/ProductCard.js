import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, category }) => {
    return (
        <Link to={`/product/${category}/${product.id}`}>
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={product.image || "https://via.placeholder.com/150"}
                alt={product.productName}
            />
            <CardContent>
                <Typography variant="h6">{product.productName}</Typography>
                <Typography variant="body2">Price: ${product.price}</Typography>
                <Typography variant="body2">Rating: {product.rating}</Typography>
                <Typography variant="body2">Discount: {product.discount}%</Typography>
                <Typography variant="body2">Availability: {product.availability ? "In Stock" : "Out of Stock"}</Typography>
            </CardContent>
        </Card>
        </Link>
    );
};

export default ProductCard;
