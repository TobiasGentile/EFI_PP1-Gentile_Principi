# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# EFI_PP1-Gentile_Principi


# Documentacion POST, GET, PUT Y DELETE

Ruta: /equipos
Métodos permitidos: GET, POST

GET

Descripción: Retorna la lista de todos los equipos registrados en la base de datos.
Respuesta Exitosa (200): Una lista con los datos de los equipos en formato JSON.

[
  {
    "id": 1,
    "nombre": "Equipo A",
    "modelo_id": 101,
    "categoria_id": 202,
    "costo": 500.0,
    "marca_id": 303,
    "activo": 1
  },
  ...
]

POST

Descripción: Crea un nuevo equipo en la base de datos.

Cuerpo de la solicitud:

{
  "nombre": "Equipo B",
  "modelo_id": 101,
  "categoria_id": 202,
  "costo": 600.0,
  "marca_id": 303,
  "activo": 1,
  "proveedor_id": 404
}

Requisitos:
proveedor_id es obligatorio y no puede ser nulo.
Los datos deben cumplir con la validación definida en EquipoSchema.
Respuesta Exitosa (201): Devuelve los datos del equipo creado.

{
  "id": 2,
  "nombre": "Equipo B",
  "modelo_id": 101,
  "categoria_id": 202,
  "costo": 600.0,
  "marca_id": 303,
  "activo": 1
}

Errores Comunes (400):
Faltan campos requeridos.

{"error": "El campo 'proveedor_id' es requerido y no puede ser nulo"}
Validación fallida en EquipoSchema.

Ruta: /equipos/<int:equipos_id>/actualizar

Método permitido: PUT

PUT

Descripción: Actualiza los datos de un equipo específico identificado por equipos_id.
Autenticación: Requiere token JWT válido. Solo usuarios con el atributo administrador: True en su token pueden realizar esta operación.

Cuerpo de la solicitud (opcional):


{
  "nombre": "Equipo Actualizado",
  "modelo_id": 102,
  "categoria_id": 203,
  "costo": 700.0,
  "marca_id": 304,
  "activo": 0
}

Solo se actualizan los campos incluidos en el cuerpo de la solicitud.

El valor de activo, si se incluye, debe ser 0 o 1.
Respuesta Exitosa (200): Devuelve los datos actualizados del equipo.

{
  "id": 1,
  "nombre": "Equipo Actualizado",
  "modelo_id": 102,
  "categoria_id": 203,
  "costo": 700.0,
  "marca_id": 304,
  "activo": 0
}

Errores Comunes:
403: Usuario no autorizado.

{"Mensaje": "No tiene permisos para actualizar un equipo."}
404: Equipo no encontrado.

400: Valor inválido para el campo activo.
{"Mensaje": "El valor de 'activo' debe ser 0 o 1."}


Ruta: /equipos/eliminar

Método permitido: DELETE

DELETE

Descripción: Marca un equipo como inactivo basándose en el identificador id proporcionado.
Autenticación: Requiere token JWT válido. Solo usuarios con el atributo administrador: True en su token pueden realizar esta operación.

Cuerpo de la solicitud:
{
  "id": 2
}

id es obligatorio para identificar el equipo a eliminar.
Respuesta Exitosa (200): Confirmación de que el equipo fue marcado como inactivo.

{"Mensaje": "Equipo marcado como inactivo correctamente."}
403: Usuario no autorizado.

{"Mensaje": "No tiene permisos para eliminar un equipo."}
400: Falta el parámetro id.

{"Mensaje": "Falta el parámetro 'id' en la solicitud."}
404: Equipo no encontrado.
