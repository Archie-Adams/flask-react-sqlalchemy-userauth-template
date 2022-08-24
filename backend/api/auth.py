from base import api, db
from db.User import User
from flask import request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies


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
  password = request.json.get("password", None)

  user = get_user_by_email(email)
  if not user or not password == user.password:
    return {"msg": "Wrong email or password"}, 401

  return create_access_token_response(identity=email)

@api.route('/api/auth/signup', methods=["POST"])
def sign_up():
  email = request.json.get("email", None)
  password = request.json.get("password", None)

  if get_user_by_email(email):
    return {"msg": "Email already registered."}, 400

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
