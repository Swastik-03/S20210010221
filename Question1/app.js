const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

let accessToken = '';
let tokenExpiresIn = 0;

let allProductsCache = []; // Cache to store products with their IDs

app.use(async (req, res, next) => {
    await ensureToken(); // Ensure token is valid for each request
    next();
});

async function getNewToken() {
    try {
        const response = await axios.post('http://20.244.56.144/test/auth', {
            "companyName": "goMart",
            "clientID": "9c313fcd-72dc-4822-b9fb-97fa7dcaa8d9",
            "clientSecret": "bhoZZunUhKsubtax",
            "ownerName": "Swastik",
            "ownerEmail": "swastik.m21@iiits.in",
            "rollNo": "S20210010221"
        });
        accessToken = response.data.access_token;
        tokenExpiresIn = response.data.expires_in;
        console.log("Token Refreshed successfully");
    } catch (error) {
        console.error("Error refreshing token: ", error);
    }
}

function isTokenExpired() {
    const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
    return currentTime >= tokenExpiresIn;
}

async function ensureToken(req, res, next) {
    if (isTokenExpired()) {
        await getNewToken();
    }
}

async function fetchProducts(categoryname, n) {
    const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
    let allProducts = [];
    const minp = 1;
    const maxp = 1000000;

    for (const company of companies) {
        try {
            await ensureToken();
            const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products?top=${n}&minPrice=${minp}&maxPrice=${maxp}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            allProducts.push(...response.data);
        } catch (error) {
            console.log(`Failed to fetch products from ${company}:`, error);
        }
    }
    return allProducts;
}

app.get('/test', async (req, res) => {
    const categoryname = "Phone";
    const n = 8;
    const product = await fetchProducts(categoryname, n);
    res.json(product);
});

function quickSort(arr, compareFn) {
    if (arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(item => compareFn(item, pivot) < 0);
    const middle = arr.filter(item => compareFn(item, pivot) === 0);
    const right = arr.filter(item => compareFn(item, pivot) > 0);

    return [...quickSort(left, compareFn), ...middle, ...quickSort(right, compareFn)];
}

function compareByField(field, order) {
    return (a, b) => {
        if (order === 'asc') {
            return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
        } else {
            return a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0;
        }
    };
}

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const n = parseInt(req.query.n);
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sort_by || 'rating';
    const order = req.query.order === 'asc' ? 'asc' : 'desc';

    if (n > 10 && !req.query.page) {
        return res.status(400).json({ error: "Pagination required for n>10" });
    }

    try {
        allProductsCache = await fetchProducts(categoryname, n); // Cache the products
        const compareFn = compareByField(sortBy, order);

        allProductsCache = quickSort(allProductsCache, compareFn);

        const start = (page - 1) * n;
        const paginatedProducts = allProductsCache.slice(start, start + n);
        paginatedProducts.forEach((product, index) => {
            product.id = `${categoryname}-${page}-${index + 1}`;
        });
        res.json(paginatedProducts);
    } catch (error) {
        return res.json({ error: "Error fetching products" });
    }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const { categoryname, productid } = req.params;

    // Find the product by ID in the cached products
    const product = allProductsCache.find(p => p.id === productid);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
