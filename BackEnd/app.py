from flask import Flask, got_request_exception
from flask_cors import CORS
from config import Config
from models import db, User, Admin
from routes import register_routes

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS with credentials support for session cookies
CORS(app, supports_credentials=True)

db.init_app(app)
register_routes(app)

# Log unhandled exceptions with full traceback
def log_exception(sender, exception, **extra):
    sender.logger.error(f'Unhandled Exception: {exception}', exc_info=exception)

got_request_exception.connect(log_exception, app)

with app.app_context():
    db.create_all()
    print("Database created")

    if not Admin.query.filter_by(email='shasanksingh000@gmail.com').first():
        admin = Admin(email='shasanksingh000@gmail.com', password='1234')
        db.session.add(admin)
        db.session.commit()

    if not User.query.filter_by(email='ghanashyamkhatri958@gmail.com').first():
        user = User(email='ghanashyamkhatri958@gmail.com', password='1234')
        db.session.add(user)
        db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)
