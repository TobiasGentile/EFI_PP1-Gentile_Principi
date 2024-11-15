// src/components/Products/CreateProduct.jsx

import React, { useState } from 'react';

function CreateProduct() {
const [productName, setProductName] = useState('');
const [productPrice, setProductPrice] = useState('');
const [productDescription, setProductDescription] = useState('');
const [productBrand, setProductBrand] = useState('');
const [productCategory, setProductCategory] = useState('');
const [productStock, setProductStock] = useState('');
const [message, setMessage] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto producto con la información del formulario
    const newProduct = {
    name: productName,
    price: parseFloat(productPrice),
    description: productDescription,
    brand: productBrand,
    category: productCategory,
    stock: parseInt(productStock),
    };

    try {
      // Realizar la solicitud POST a la API
    const response = await fetch('http://localhost:5174/productos', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    });

    if (response.ok) {
        setMessage('Producto creado con éxito');
        // Limpiar el formulario después de crear el producto
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductBrand('');
        setProductCategory('');
        setProductStock('');
    } else {
        setMessage('Error al crear el producto');
    }
    } catch (error) {
    console.error("Error:", error);
    setMessage('Error de conexión al crear el producto');
    }
};

return (
    <div>
    <h2>Crear Producto</h2>
    {message && <p>{message}</p>}
    <form onSubmit={handleSubmit}>
        <div>
        <label>Nombre del Producto:</label>
        <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
        />
        </div>
        <div>
        <label>Precio del Producto:</label>
        <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
        />
        </div>
        <div>
        <label>Descripción del Producto:</label>
        <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
        />
        </div>
        <div>
        <label>Marca del Producto:</label>
        <input
            type="text"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            required
        />
        </div>
        <div>
        <label>Categoría del Producto:</label>
        <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
        />
        </div>
        <div>
        <label>Stock:</label>
        <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            required
        />
        </div>
        <button type="submit">Crear Producto</button>
    </form>
    </div>
);
}

export default CreateProduct;
