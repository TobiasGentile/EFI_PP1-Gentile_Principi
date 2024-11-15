import { useState } from "react";

const DeleteUser = ({ userId }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const token = JSON.parse(localStorage.getItem('token'));

    const deleteUser = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }

            setIsDeleted(true);
            console.log('Usuario eliminado');
        } catch (error) {
            console.error("Error al eliminar el usuario:", error.message);
        }
    };

    return (
        <div>
            {isDeleted ? (
                <p>Usuario eliminado exitosamente</p>
            ) : (
                <button onClick={deleteUser}>Eliminar Usuario</button>
            )}
        </div>
    );
};

export default DeleteUser;
