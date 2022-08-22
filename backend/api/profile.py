from base import api
from flask_jwt_extended import jwt_required

@api.route('/api/profile')
@jwt_required()
def my_profile():
  response_body = {
    "name": "Nagato",
    "about" :"Hello! I'm a full stack developer that loves python and javascript"
  }

  return response_body
