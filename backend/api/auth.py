from base import api
from flask import request, jsonify
from flask_jwt_extended import create_access_token, unset_jwt_cookies

@api.route('/api/auth/token', methods=["POST"])
def create_token():
  email = request.json.get("email", None)
  password = request.json.get("password", None)
  if email != "test" or password != "test":
    return {"msg": "Wrong email or password"}, 401

  access_token = create_access_token(identity=email)
  response = {"access_token":access_token}
  return response

@api.route("/api/auth/logout", methods=["POST"])
def logout():
  response = jsonify({"msg": "logout successful"})
  unset_jwt_cookies(response)
  return response