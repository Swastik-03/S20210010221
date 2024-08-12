import axios from 'axios';

const API_URL = 'http://localhost:9000';

export const fetchProducts = async (category, filters, sort, page) => {
    if(category?.trim().length!=0){
        const response = await axios.get(`${API_URL}/categories/${category}/products/?n=10`, {
            params: {
                ...filters,
                sort,
                page,
            },
        });
        return response.data;
    
    }
    else{
        const response = await axios.get(`${API_URL}/categories/Phone/products/?n=10`, {
            params: {
                ...filters,
                sort,
                page,
            },
        });
        return response.data;
    }
    };

export const fetchProductById = async (category, productId) => {
    const response = await axios.get(`${API_URL}/categories/${category}/products/${productId}`);
    return response.data;
};
