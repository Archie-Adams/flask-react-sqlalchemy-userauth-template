from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

api = Flask(__name__)
api.config.from_object('config')

db = SQLAlchemy(api)
migrate = Migrate(api, db, directory="./db/migrations")

jwt = JWTManager(api)

# Models
from db import user

# Token updater
from api import _after_request

# Endpoints
from api import auth
from api import profile
from api import test