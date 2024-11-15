import { useEffect, useState } from "react";

const ReadUsers = () => {
    const [users, setUsers] = useState([]);
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        // Obtener los usuarios desde la API
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los usuarios');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error.message);
            }
        };

        fetchUsers();
    }, [token]);

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReadUsers;
