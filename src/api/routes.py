"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import json
from flask_jwt_extended import create_access_token, get_jwt_identity,jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# @api.route("/login", methods=["POST"])
# def login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     user = User.query.filter_by(email = email).first()
#     if user is None:
#         return jsonify({"msg":"user not found"}), 404
#     valid_password = current_app.bcrypt.check_password_hash(user.password, password)
#     if valid_password is False:
#         return jsonify ({"msg": "invalidad password"}), 401
#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token), 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
# @api.route("/login", methods=["POST"])
# def login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     user=User.query.filter_by(email=email).first()
#     if user is None:
#         return jsonify({"msg": "user not found"}), 404

#     if email != user.email or password != user.password:
#         return jsonify({"msg": "Bad username or password"}), 401


#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "user not found"}), 404

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401
    
    serialized_user = user.serialize()
    return serialized_user, 200

    # access_token = create_access_token(identity=email)
    # return jsonify(access_token=access_token), 200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_one_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({"msg": f"user with id {user_id} not found"}), 404
    serialized_user = user.serialize()
    return serialized_user, 200