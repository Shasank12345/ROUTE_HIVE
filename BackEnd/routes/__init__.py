from .auth import auth
from .enroll import enrolll
from .profile import proff
from .bus import buss
from .map import map
def register_routes(app):

    app.register_blueprint(auth)
    app.register_blueprint(enrolll,url_prefix='/enroll')
    app.register_blueprint(proff)
    app.register_blueprint(buss)
    app.register_blueprint(map)
