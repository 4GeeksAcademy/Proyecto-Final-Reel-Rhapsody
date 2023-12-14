"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
from flask_jwt_extended import create_access_token, get_jwt_identity,jwt_required,JWTManager
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()
# Allow CORS requests to this API
CORS(api)
@api.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data or 'email' not in data or 'password' not in data:
            return jsonify({"error": "Se requieren tanto el correo electrónico como la contraseña."}), 400
        
        email = data['email']
        password = data['password']

        if not email or not password:
            return jsonify({"error": "Faltó algún dato en el cuerpo de la solicitud."}), 400

        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "Usuario no encontrado."}), 404

        password_db = user.password

        if password_db != password:
            return jsonify({"error": "Contraseña incorrecta."}), 401

        access_token = create_access_token(identity=user.id)

        return jsonify({"access_token": access_token, "fullname": user.full_name, "id": user.id}), 200

    except Exception as e:
        # Imprimir detalles específicos del error en los registros del servidor
        print(f"Error en la ruta /login: {str(e)}")

        # Devolver un mensaje detallado al cliente
        return jsonify({"error": f"Ocurrió un error al procesar la solicitud: {str(e)}"}), 500


@api.route('/sign_up', methods=['POST'])
def create_one_user():
    try:
        if request.method == 'GET':
            # Manejar el registro con GET aquí
            return jsonify({"msg": "Registro con GET exitoso"}), 200
        
        body = request.get_json()

        required_fields = ["full_name", "email", "password"]
        for field in required_fields:
            if field not in body or not body[field]:
                return jsonify({"error": f"El campo '{field}' es requerido y no puede estar vacío"}), 400


        raw_password = body.get('password')
        password_hash = bcrypt.generate_password_hash(raw_password).decode('utf-8')

        new_user = User (
        full_name = body["full_name"],
        email= body["email"],
        password = password_hash,
        )

        db.session.add(new_user)
        db.session.commit()


        return jsonify ({"msg": "Usuario creado exitosamente"}), 200

    except Exception as e:
        # Registrar detalles del error en los registros del servidor
        current_app.logger.error(f"Error al crear usuario: {str(e)}")

        # Devolver un mensaje genérico al cliente
        return jsonify({"error": "Ocurrió un error al procesar la solicitud"}), 500

@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": f"user with id {user_id} not found"}), 404
    serialized_user = user.serialize()
    return serialized_user, 200