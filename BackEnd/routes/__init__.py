from .auth import auth
from .enroll import enrolll
def register_routes(app):

    app.register_blueprint(auth)
    app.register_blueprint(enrolll,url_prefix='/enroll')