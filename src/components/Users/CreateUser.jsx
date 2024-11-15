import { Formik } from "formik";
import * as Yup from 'yup';

const CreateUser = () =>  {

    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required('ESte campo es requerido')
            .min(5, 'El nombre de usuario debe tener minimo 5 caracteres')
            .max(50, 'La contraseña no debe ser mayor a 50 caracteres')
    });

    const token = JSON.parse(localStorage.getItem('token'))

    const RegisterUser = async (values) => {
        const bodyRegisterUser = {
            username: values.username,
            password: values.password
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/users', {
                method: 'POST',
                body: JSON.stringify(bodyRegisterUser),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al registrar el usuario.');
            }

            const data = await response.json();
            console.log('Usuario registrado:', data);
        } catch (error) {
            console.error("Error en el registro:", error.message);
        }
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            ValidationSchema={ValidationSchema}
            onSubmit={async (values, { reserForm }) => {
                await RegisterUser(values);
                resetForm(); //Limpiar el formulario tras un registro exitoso
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
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            id="password"
                            ></input>
                            {errors.password && touched.password && <div>{errors.password}</div>}
                    </div>

                    <button type="submit" disabled={!isValid || !values.username || !values.password}>
                        Crear Usuario
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default CreateUser;