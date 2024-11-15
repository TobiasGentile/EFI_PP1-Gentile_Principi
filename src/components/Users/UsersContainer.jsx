import { useState, useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import UsersView from './UsersView';

const UsersContainer = () => {
    const [dataUsers, setDataUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [error, setError] = useState(null); // corregido de conts a const

    const token = JSON.parse(localStorage.getItem('token'));

    const getDataUsers = async () => {
        setLoadingUsers(true);
        setError(null);

        if (!token) {
            setError("No se encontró el token de autenticación.");
            setLoadingUsers(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/users", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Hubo un error en la petición al servidor.");
            }

            const results = await response.json();
            setDataUsers(results);
        } catch (error) {
            setError(error.message);
            console.error("Hubo un error en la API:", error);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        getDataUsers();
    }, []);

    return (
        <>
            {loadingUsers ? (
                <ProgressSpinner />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <UsersView dataUsers={dataUsers} loadingUsers={loadingUsers} />
            )}
        </>
    );
};

export default UsersContainer;
