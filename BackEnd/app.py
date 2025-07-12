from flask import Flask
from flask_cors import CORS
from config import Config
from models import db, Admin
from routes import register_routes
import bcrypt
import os

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, supports_credentials=True)

db.init_app(app)
register_routes(app)

with app.app_context():
    db.create_all()
    print("Database created")

    admin_email = Config.MAIL_USERNAME
    raw_password = Config.ADMIN_PASSWORD
    print(admin_email)
    print(raw_password)

    if admin_email and raw_password:
        existing_admin = Admin.query.filter_by(email=admin_email).first()

        if not existing_admin:
            hashed_pw = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            admin = Admin(email=admin_email, password=hashed_pw)
            db.session.add(admin)
            db.session.commit()
            print("Default admin created")
    else:
        print(" MAIL_USERNAME or MAIL_PASSWORD not set in .env")

if __name__=='__main__':
    app.run(debug=True)
