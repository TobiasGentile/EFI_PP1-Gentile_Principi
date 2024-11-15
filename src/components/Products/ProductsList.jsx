import React, { useState, useEffect } from 'react';
import './ProductsList.css'; // Asegúrate de tener un archivo de estilos para la lista

// Aquí puedes simular productos estáticos o conectarlo a tu API
const mockProducts = [
{ id: 1, name: "Smartphone XYZ", description: "Un smartphone de gama alta", price: 799, stock: 50 },
{ id: 2, name: "Laptop ABC", description: "Laptop ultradelgada", price: 1299, stock: 30 },
{ id: 3, name: "Tablet PQR", description: "Tablet con pantalla de 10 pulgadas", price: 499, stock: 100 },
];

function ProductsList() {
const [products, setProducts] = useState([]);

useEffect(() => {
    // Aquí podrías hacer una solicitud a una API, por ejemplo:
    // fetch('/api/products')
    //   .then((response) => response.json())
    //   .then((data) => setProducts(data));

    // Simulamos un retraso en la carga de datos
    setTimeout(() => {
    setProducts(mockProducts);
    }, 500);
}, []);

return (
    <div className="products-list">
    <h2>Lista de Productos</h2>
    {products.length === 0 ? (
        <p>Cargando productos...</p>
    ) : (
        <table>
        <thead>
            <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
            </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
);
}

export default ProductsList;
