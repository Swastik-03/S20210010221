import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './pages/AllProducts';
import SingleProduct from './pages/SingleProduct';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AllProducts />} />
                <Route path="/product/:category/:productId" element={<SingleProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
