from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta, timezone


db = SQLAlchemy()

def default_expiry_time():
    return datetime.now(timezone.utc) + timedelta(minutes=2)

def utc_now():
    return datetime.now(timezone.utc)

class OTPStore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    otp = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=utc_now)
    expires_at = db.Column(db.DateTime(timezone=True), default=default_expiry_time)

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)

class Form_Data(db.Model):
    id=db.Column(db.Integer, primary_key=True )
    Full_Name=db.Column(db.String(100),nullable=False,unique=True)
    email=db.Column(db.String(100),nullable=False,unique=True)
    phone_num=db.Column(db.String(10),nullable=False,unique=True)
    pick_at=db.Column(db.String(100), nullable=False)
    Role=db.Column(db.String(100),nullable=False)
    school=db.Column(db.String(100),nullable=False)

class Enrolled_User(db.Model):
    id=db.Column(db.Integer, primary_key=True )
    Full_Name=db.Column(db.String(100),nullable=False,unique=True)
    email=db.Column(db.String(100),nullable=False,unique=True)
    password=db.Column(db.String(100),nullable=False)
    phone_num=db.Column(db.String(10),nullable=False,unique=True)
    pick_at=db.Column(db.String(100), nullable=False)
    Role=db.Column(db.String(100),nullable=False)
    school=db.Column(db.String(100),nullable=False)

class DriverForm_Data(db.Model):
    id=db.Column(db.Integer, primary_key=True )
    Full_Name=db.Column(db.String(100),nullable=False,unique=True)
    email=db.Column(db.String(100),nullable=False,unique=True)
    phone_num=db.Column(db.String(10),nullable=False,unique=True)
    preffered_route=db.Column(db.String(100), nullable=False)
   

class Enrolled_Driver(db.Model):
    id=db.Column(db.Integer, primary_key=True )
    Full_Name=db.Column(db.String(100),nullable=False,unique=True)
    email=db.Column(db.String(100),nullable=False,unique=True)
    password=db.Column(db.String(100),nullable=False)
    phone_num=db.Column(db.String(10),nullable=False,unique=True)
    preffered_route=db.Column(db.String(100), nullable=False)
    
    