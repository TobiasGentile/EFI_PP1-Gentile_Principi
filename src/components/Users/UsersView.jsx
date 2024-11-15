import { Fragment, useState } from "react";
import { PrgogressSpinner } from "primereact/progressspinner";
import { DataTable } from 'primeract/datatable';
import { Column } from "primeract/column";
import { Button } from "primeract/button";
import { Dialog } from "primeract/dialog";
import { ToggleButton } from "primeract/togglebutton";
import { Formik } from 'primeract/formik'
import * as Yup from 'yup';

const UserView = ({ loadingUsers, dataUsers }) => {
    const token = JSON.parse(localStorage.getItem('token'));

    const [openDialogEditUser, setOpenDialogEditUser] = useState(false);
    const [editUser, setEditUser] = useState({});

    const bodyIsAdmin = (rowData) => {
        return (
            rowData.is.admin ? <span>Si</span> : <span>No</span>
        );
    };

    const bodyAction = (rowData) => {
        return (
            <div>
                <Button icon='pi pi-pencil' label='Editar' onClick={() => (setEditUser(rowData), setOpenDialogEditUser(true))} />
                <Button icon='pi pi-trash' label='Borrar' onClick={() => onDeleteUser(rowData)} />
            </div>
        );
    };

    const ValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Este campo es obligatorio.')
            .max(50, 'El username no debe ser mayor a  caracteres.')
    });

    const onEditUser = async (values) => {
        const bodyEditUser = {
            username: values.username,
            is_admin: values.is_admin,
        };

        try {
            const response = await fetch(`http://127.0.0.1:5000/users/${editUser.id}`, {
                method: 'PUT', 
                body: JSON.stringify(bodyEditUser),
                headers: {
                    'Content-Type': 'aplication/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setOpenDialogEditUser(false);
                //aca podriamos recargar los usuarios para ver los cambios
            } else {
                console.error("Error al actualizar el usuario");
            }
        } catch (error) {
            console.error("Error en la API al actualizar el usuario", error);
        }
    };

    const onDeleteUser = async (user) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/users/${user.id}', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                //aca podemos eliminar el usuario de 'dataUsers'`o recargar los usuarios.
            } else {
                console.error("Error al eliminar el usuario");
            }
        } catch (error) {
            console.error("Error en la Api al eliminar el usuario", error);
        }
    };

    return (
        <Fragment>
            {loadingUsers ? (
                <ProgressSpinner />
            ) : (
                <DataTable value={dataUsers} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="username" header="Nombre de usuario"></Column>
                    <Column field="is_admin" body={bodyIsAdmin} header="¿Es administrador?"></Column>
                    <Column body={bodyActions} header="Acciones"></Column>
                </DataTable>
            )}
            <Dialog
                visible={openDialogEditUser}
                onHide={() => setOpenDialogEditUser(false)}
                header='Editar usuario'
            >
                <Formik
                    enableReinitialize
                    initialValues={{ is_admin: editUser.is_admin || false, username: editUser.username || '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={onEditUser}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        isValid,
                    }) => (
                        <form onSubmit={handleSubmit} style={{ display: 'inline-grid' }}>
                            <label>Nombre de usuario</label>
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            {errors.username && touched.username && <div>{errors.username}</div>}

                            <label>¿Es administrador?</label>
                            <ToggleButton
                                name="is_admin"
                                checked={values.is_admin}
                                onChange={(e) => setFieldValue("is_admin", e.value)}
                                onLabel="Si"
                                offLabel="No"
                            />
                            
                            <button type="submit" disabled={!isValid}>Modificar usuario</button>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </Fragment>
    );
};

export default UserView;