from datetime import timedelta

from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    jwt_required,

)
from werkzeug.security import (
    generate_password_hash,
    check_password_hash,
)
from app import db
from models import User
from schemas import UserSchema, MinimalUserSchema

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.authorization
    username = data.username
    password = data.password

    usuario = User.query.filter_by(username=username).first()

    if usuario and check_password_hash(
        pwhash=usuario.password_hash, password=password
    ):
        access_token = create_access_token(
            identity=username,
            expires_delta=timedelta(minutes=10),
            additional_claims=dict(
                administador=usuario.is_admin
            )
        )
        return jsonify({"Token": access_token})

    return jsonify({"Mensaje":"NO MATCH"})
    

@auth_bp.route('/users', methods=['POST', 'GET'])
@jwt_required()
def user():
    additional_data = get_jwt()
    print(additional_data)
    administrador = additional_data.get('administador')
    if request.method == 'POST': 
        if administrador is True:
            data = request.get_json()
            username = data.get('nombre_usuario')
            password = data.get('password')

            password_hasheada = generate_password_hash(
                password=password,
                method='pbkdf2',
                salt_length=8,
            )
            try:
                nuevo_usuario = User(
                    username=username,
                    password_hash=password_hasheada
                )
                db.session.add(nuevo_usuario)
                db.session.commit()

                return jsonify({"Usuario Creado": username}), 201
            except:
                return jsonify({"Error": "Algo salio mal"})
        return jsonify(Mensaje="Ud no esta habilitado para crear un usuario")
    usuarios = User.query.all()
    print(administrador is True)
    if administrador is True:
        return UserSchema().dump(obj=usuarios, many=True)
    else:
        return MinimalUserSchema().dump(obj=usuarios, many=True)

# Ruta para editar un usuario existente
@auth_bp.route('/users/<int:user_id>/editar', methods=['PUT'])
def edit_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if user:
        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        db.session.commit()
        return jsonify({'message': 'User updated successfully', 'user': user.to_dict()})
    else:
        return jsonify({'message': 'User not found'}), 404

# Ruta para eliminar un usuario existente
@auth_bp.route('/users/<int:user_id>/eliminar', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'message': 'User not found'}), 404


