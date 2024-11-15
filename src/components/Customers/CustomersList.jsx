import React, { useState } from 'react';

const CustomersList = () => {
    // Estado para manejar la lista de clientes
    const [customers, setCustomers] = useState([
        { id: 1, name: 'Bautista Girardi', email: 'bautistagirardi@gmail.com', role: 'Admin' },
        { id: 2, name: 'Eliana Grosso', email: 'eligrosso@gmail.com', role: 'User' },
    ]);

    // Estado para manejar el formulario de agregar cliente
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        role: 'User',
    });

    // Función para agregar un nuevo cliente
    const handleAddCustomer = () => {
        if (newCustomer.name && newCustomer.email) {
            const newId = customers.length + 1; // Asigna un ID incremental
            setCustomers([
                ...customers,
                { ...newCustomer, id: newId }
            ]);
            setNewCustomer({ name: '', email: '', role: 'User' }); // Resetea el formulario
        }
    };

    // Función para manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    // Función para eliminar un cliente
    const handleDeleteCustomer = async (id) => {
        try {
            // Enviamos solicitud DELETE al backend
            const response = await fetch('http://localhost:5000/api/customers/${id}', 
                {
                method: 'DELETE',
            });

            if (response.ok) {
                // Si la eliminación fue exitosa, actualizamos el estado local
                setCustomers(customers.filter(customer => customer.id !== id));
            } else {
                console.error('Error al eliminar el cliente');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Clientes</h2>

            {/* Formulario para agregar un nuevo cliente */}
            <div>
                <h3>Agregar Cliente</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={newCustomer.name}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    value={newCustomer.email}
                    onChange={handleInputChange}
                />
                <select
                    name="role"
                    value={newCustomer.role}
                    onChange={handleInputChange}
                >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <button onClick={handleAddCustomer}>Agregar Cliente</button>
            </div>

            {/* Mostrar la lista de clientes */}
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        {customer.name} - {customer.email} - {customer.role}
                        {/* Botón para eliminar cliente */}
                        <button onClick={() => handleDeleteCustomer(customer.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomersList;