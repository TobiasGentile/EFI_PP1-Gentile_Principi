import { Formik } from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react";

const UpdateUser = ({ userId }) => {
    const [user, setUser] = useState(null);
    const token = JSON.parse(localStorage.getItem('token'));

    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Este campo es requerido')
            .min(5, 'El nombre de usuario debe tener mínimo 5 caracteres')
            .max(50, 'El nombre de usuario no debe ser mayor a 50 caracteres'),
    });

    useEffect(() => {
        // Obtener los datos del usuario para prellenar el formulario
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener el usuario');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error al obtener el usuario:", error.message);
            }
        };

        fetchUser();
    }, [userId, token]);

    const updateUser = async (values) => {
        const bodyUpdateUser = {
            username: values.username,
            password: values.password
        };

        try {
            const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(bodyUpdateUser),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }

            const data = await response.json();
            console.log('Usuario actualizado:', data);
        } catch (error) {
            console.error("Error en la actualización:", error.message);
        }
    };

    return user ? (
        <Formik
            initialValues={{ username: user.username, password: '' }}
            validationSchema={ValidationSchema}
            onSubmit={async (values) => {
                await updateUser(values);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid
            }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                        />
                        {errors.username && touched.username && <div>{errors.username}</div>}
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                    </div>
                    <button type="submit" disabled={!isValid || !values.username || !values.password}>
                        Actualizar Usuario
                    </button>
                </form>
            )}
        </Formik>
    ) : <p>Cargando...</p>;
};

export default UpdateUser;
