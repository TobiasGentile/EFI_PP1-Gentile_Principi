from app import ma
from models import User, Modelo, Categoria, Equipo, Proveedor, Caracteristica, Stock, Accesorio, AccesorioEquipo, Celular, Fabricante, Fabrica, Marca
from marshmallow import validates, ValidationError  
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# Esquema minimalista para el modelo User
class MinimalUserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True


class BaseSchema(ma.SQLAlchemySchema):
    class Meta:
        load_instance = True

class UserSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = User

    id = ma.auto_field()
    username = ma.auto_field()
    password_hash = ma.auto_field()
    is_admin = ma.auto_field()

class ProveedorSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Proveedor

    id = ma.auto_field()
    nombre = ma.auto_field()
    contacto = ma.auto_field()
    direccion = ma.auto_field()

class CategoriaSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Categoria

    id = ma.auto_field()
    nombre = ma.auto_field()

class ModeloSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Modelo

    id = ma.auto_field()
    nombre = ma.auto_field()
    # Aquí solo agregamos los IDs de las relaciones para evitar la recursión
    fabricante_id = ma.auto_field()  # Solo el ID de Fabricante
    marca_id = ma.auto_field()  # Solo el ID de Marca

class EquipoSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Equipo

    id = ma.auto_field()
    nombre = ma.auto_field()
    costo = ma.auto_field()
    modelo_id = ma.auto_field()  # Solo el ID de Modelo
    categoria_id = ma.auto_field()  # Solo el ID de Categoria
    proveedor_id = ma.auto_field()  # Solo el ID de Proveedor
    stock_id = ma.auto_field()  # Solo el ID de Stock

class CaracteristicaSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Caracteristica

    id = ma.auto_field()
    tipo = ma.auto_field()
    descripcion = ma.auto_field()

class StockSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Stock

    id = ma.auto_field()
    cantidad = ma.auto_field()

    @validates('cantidad')
    def validate_cantidad(self, value):
        if value < 0:
            raise ValidationError('La cantidad no puede ser negativa')

class AccesorioSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Accesorio

    id = ma.auto_field()
    nombre = ma.auto_field()
    tipo = ma.auto_field()
    descripcion = ma.auto_field()

class AccesorioEquipoSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = AccesorioEquipo

    id = ma.auto_field()
    accesorio_id = ma.auto_field()  # Solo el ID de Accesorio
    equipo_id = ma.auto_field()  # Solo el ID de Equipo

class CelularSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Celular

    id = ma.auto_field()
    nombre = ma.auto_field()
    fabrica_id = ma.auto_field()  # Solo el ID de Fabrica
    modelo_id = ma.auto_field()  # Solo el ID de Modelo
    categoria_id = ma.auto_field()  # Solo el ID de Categoria
    equipo_id = ma.auto_field()  # Solo el ID de Equipo
    proveedor_id = ma.auto_field()  # Solo el ID de Proveedor
    caracteristicas = ma.Nested(CaracteristicaSchema, many=True)
    accesorios = ma.Nested(AccesorioSchema, many=True)

# Nuevos esquemas para los modelos adicionales

class FabricanteSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Fabricante

    id = ma.auto_field()
    nombre = ma.auto_field()
    pais_origen = ma.auto_field()
    modelos = ma.Nested(ModeloSchema, many=True)  # Relación con Modelo (puedes dejarla si no causa recursión)

class FabricaSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Fabrica

    id = ma.auto_field()
    nombre = ma.auto_field()

class MarcaSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Marca

    id = ma.auto_field()
    nombre = ma.auto_field()
    modelos = ma.Nested(ModeloSchema, many=True)  # Relación con Modelo (puedes dejarla si no causa recursión)
