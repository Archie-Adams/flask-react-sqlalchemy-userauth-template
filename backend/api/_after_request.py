from base import api
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import (
  create_access_token,
  get_jwt,
  get_jwt_identity
)
import json

@api.after_request
def refresh_expiring_jwts(response):
  try:
    exp_timestamp = get_jwt()["exp"]
    print(get_jwt())
    now = datetime.now(timezone.utc)
    target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
    if target_timestamp > exp_timestamp:
      access_token = create_access_token(identity=get_jwt_identity())
      data = response.get_json()
      if type(data) is dict:
        data["access_token"] = access_token
        response.data = json.dumps(data)
    return response
  except (RuntimeError, KeyError):
    # Case where there is not a valid JWT. Just return the original response.
    return response