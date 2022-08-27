from base import api, db
from db.User import User
from flask import request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies

# TODO: Needs secure password storage.

# ---------------------------------- Helpers --------------------------------- #

def get_user_by_email(email):
  return User.query.filter_by(username=email).first()

def create_access_token_response(identity):
  access_token = create_access_token(identity=identity)
  response = { "access_token": access_token }
  return response

# --------------------------------- Endpoints -------------------------------- #

@api.route('/api/auth/signin', methods=["POST"])
def sign_in():
  email = request.json.get("email", None)
  if not email:
    return {"msg": "Email must be present."}, 401

  password = request.json.get("password", None)
  if not password:
    return {"msg": "Password must be present."}, 401

  user = get_user_by_email(email)
  if not user or not password == user.password:
    return {"msg": "Wrong email or password."}, 401

  return create_access_token_response(identity=email)

@api.route('/api/auth/signup', methods=["POST"])
def sign_up():
  email = request.json.get("email", None)
  if not email:
    return {"msg": "Email must be present."}, 401

  password = request.json.get("password", None)
  if not password:
    return {"msg": "Password must be present."}, 401

  user = get_user_by_email(email)
  if user:
    return {"msg": "Email already registered."}, 401

  db.session.add(
    User(
      username = email,
      password = password,
    )
  )
  db.session.commit()

  return create_access_token_response(identity=email)

@api.route("/api/auth/signout", methods=["POST"])
def sign_out():
  response = jsonify({"msg": "Logout successful."})
  unset_jwt_cookies(response)
  return response
