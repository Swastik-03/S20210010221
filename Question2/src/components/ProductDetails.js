import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { fetchProductById } from '../services/api';

const ProductDetails = () => {
    const { category, productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            const data = await fetchProductById(category, productId);
            setProduct(data);
        };
        getProduct();
    }, [category, productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <Card>
            <CardMedia
                component="img"
                height="300"
                image={product.image || "https://via.placeholder.com/300"}
                alt={product.productName}
            />
            <CardContent>
                <Typography variant="h4">{product.productName}</Typography>
                <Typography variant="body1">Price: ${product.price}</Typography>
                <Typography variant="body1">Rating: {product.rating}</Typography>
                <Typography variant="body1">Discount: {product.discount}%</Typography>
                <Typography variant="body1">Availability: {product.availability ? "In Stock" : "Out of Stock"}</Typography>
            </CardContent>
        </Card>
    );
};

export default ProductDetails;
