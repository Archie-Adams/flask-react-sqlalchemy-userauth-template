from base import api
from flask import request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies

@api.route('/api/auth/signin', methods=["POST"])
def sign_in():
  email = request.json.get("email", None)
  password = request.json.get("password", None)
  if email != "test" or password != "test":
    return {"msg": "Wrong email or password"}, 401

  access_token = create_access_token(identity=email)
  response = {"access_token":access_token}
  return response

@api.route('/api/auth/signup', methods=["POST"])
def sign_up():
  # TODO: Implement.
  return {}

@api.route("/api/auth/signout", methods=["POST"])
def sign_out():
  response = jsonify({"msg": "logout successful"})
  unset_jwt_cookies(response)
  return response
