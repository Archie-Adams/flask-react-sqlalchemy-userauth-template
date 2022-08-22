import os
from datetime import timedelta

# Cross-site request forgery protection.
WTF_CSRF_ENABLED = True
SECRET_KEY = 'a-very-secret-secret'

# Database config
basedir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'db','app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = True

# JWT config
JWT_SECRET_KEY = "please-remember-to-change-me"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=35)