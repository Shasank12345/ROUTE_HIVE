from flask import Flask
from flask_cors import CORS
from config import Config
from models import db, User
from routes import register_routes


app=Flask(__name__)
app.config.from_object(Config)
CORS(app) 
db.init_app(app)
register_routes(app)


with app.app_context():
    print("creating .......")

    db.create_all()
    print("data base created ")
    if not  User.query.filter_by(email='shasanksingh000@gmail.com').first():
        dummy_user=User(email='shasanksingh000@gmail.com',password='1234')
        db.session.add(dummy_user)
        db.session.commit()
if __name__=='__main__':
    app.run(debug=True)