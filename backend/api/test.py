from base import api

@api.route('/api/test')
def test():
  return {
    "msg": "Test data!"
  }
