from base import db

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(500))
  password = db.Column(db.String(500))