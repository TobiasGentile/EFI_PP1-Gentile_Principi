import { Formik } from "formik"
import * as Yup from 'yup'

const LoginUser = () => {

    // Función asincrónica para manejar el login
    const onLoginUser = async (values) => {

        const bodyUserLogin = btoa(`${values.username}:${values.password}`);

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${bodyUserLogin}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error en la autenticación. Verifica tus credenciales.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.Token);
            console.log("Token guardado:", data.token);

            // Redirige al usuario a otra página después de iniciar sesión correctamente (opcional)
            // Por ejemplo: history.push('/dashboard');

        } catch (error) {
            console.error("Error de autenticación:", error.message);
            alert(error.message);
        }
    }

    // Esquema de validación
    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Este campo es requerido')
            .max(50, 'El nombre de usuario no debe ser mayor a 50 caracteres'),
        password: Yup.string()
            .required('Este campo es requerido')
            .max(50, 'La contraseña no debe ser mayor a 50 caracteres')
    });

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={ValidationSchema}
            onSubmit={async (values) => {
                // Llama a la función asincrónica dentro de onSubmit
                await onLoginUser(values);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
                isValid
            }) => (
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await onLoginUser(values);
                }}>
                    <div>
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            id="username"
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
                            id="password"
                        />
                        {errors.password && touched.password && <div>{errors.password}</div>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting || !isValid || !values.username || !values.password}
                    >
                        Iniciar Sesión
                    </button>
                </form>
            )}
        </Formik>
    );
}

export default LoginUser;
