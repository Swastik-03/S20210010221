import React from 'react';
import { TextField, Checkbox, FormControlLabel, Slider, Button } from '@mui/material';

const Filter = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        e.preventDefault();
        console.log(document.getElementById("category").value)
        setFilters({
            ...filters,
            category: document.getElementById("category").value,
        });
    };
    

    return (
        <div>
            <form onSubmit={handleChange}>
                <h2>Enter category to search</h2>
                <TextField
                    label="Category"
                    name="category"
                    id="category"
                    // value={filters.category || ''}
                    
                />
                <Button type='submit'>Search</Button>
            </form>
        </div>
    );
};

export default Filter;
