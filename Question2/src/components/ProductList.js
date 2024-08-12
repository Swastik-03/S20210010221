import React, { useState, useEffect } from 'react';
import { Grid, Pagination } from '@mui/material';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';

const ProductList = ({ category, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts(category, filters, sort, page);
            console.log(data)
            setProducts(data);
            // setTotalPages(data.totalPages);
        };
        getProducts();
    }, [category, filters, sort, page]);

    return (
        <>
            <Grid container spacing={2}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard category={category} product={product} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ProductList;
