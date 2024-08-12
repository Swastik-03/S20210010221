import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import ProductList from '../components/ProductList';
import Filter from '../components/Filter';

const AllProducts = () => {
    const [filters, setFilters] = useState({});
    const [category, setCategory] = useState('');

    console.log(filters)

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Filter filters={filters} setFilters={setFilters} />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <ProductList category={filters.category} filters={filters} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AllProducts;
