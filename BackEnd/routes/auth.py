from flask import Blueprint, request, jsonify, session
from datetime import datetime, timezone, timedelta
from models import Enrolled_User, db, OTPStore, Admin,Enrolled_Driver 
from utility import generate_otp, send_email
import bcrypt

auth = Blueprint('auth', __name__)
@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password').encode('utf-8')
    print(password)

    admin = Admin.query.filter_by(email=email).first()
    if admin:
        true_pass = admin.password
        stored_hash = true_pass.encode('utf-8')

        if bcrypt.checkpw(password, stored_hash):
            return jsonify({"message": "Login successful", "type": "admin"}), 200

    user = Enrolled_User.query.filter_by(email=email).first()
    if user:
        true_pass = user.password
        stored_hashh = true_pass.encode('utf-8')

        if bcrypt.checkpw(password, stored_hashh):
            return jsonify({"message": "Login successful", "type": "user"}), 200
        
    drivers = Enrolled_Driver
    if drivers:
        true_pass=drivers.password
        stored_hashed=true_pass.encode('utf-8')
        if bcrypt.checkpw(password, stored_hashed):

            return jsonify({"message": "Login successful", "type": "driver"}), 200

    return jsonify({'message': "Invalid Credentials"}), 401
@auth.route('/resend_otp',methods=['POST'])
def resend_otp():
    email = session.get('reset_email')
    if not email:
        return jsonify({'message': 'Session expired or invalid, retry forgot password process'}), 400

    otp = generate_otp()
    now = datetime.now(timezone.utc)
    expires = now + timedelta(minutes=2)

    if send_email(email, otp):
        existing = OTPStore.query.filter_by(email=email).first()
        if existing:
            existing.otp = otp
            existing.created_at = now
            existing.expires_at = expires
        else:
            otp_entry = OTPStore(
                email=email,
                otp=otp,
                created_at=now,
                expires_at=expires
            )
            db.session.add(otp_entry)

        db.session.commit()
        return jsonify({'message': 'OTP resent successfully'}), 200

    return jsonify({'message': 'Failed to resend OTP email'}), 500
@auth.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get('email')
    user = Enrolled_User.query.filter_by(email=email).first()
    drivers=Enrolled_Driver.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'Email Not Found'}), 404
    if not drivers:
        return jsonify({'message': 'Email Not Found'}), 404

    otp = generate_otp()
    now = datetime.now(timezone.utc)
    expires = now + timedelta(minutes=2)

    if send_email(email, otp):
        existing = OTPStore.query.filter_by(email=email).first()

        if existing:
            existing.otp = otp
            existing.created_at = now
            existing.expires_at = expires
        else:
            otp_entry = OTPStore(
                email=email,
                otp=otp,
                created_at=now,
                expires_at=expires
            )
            db.session.add(otp_entry)

        db.session.commit()
        session['reset_email'] = email
        return jsonify({'message': 'OTP sent to email'}), 200

    return jsonify({'message': 'Failed to send OTP email'}), 500

@auth.route('/verify_otp', methods=['POST'])
def verify_otp():
    data = request.json
    otp = data.get('otp')
    email = session.get('reset_email')

    if not email:
        return jsonify({'message': 'Session expired or invalid, retry forgot password process'}), 400

    otp_entry = OTPStore.query.filter_by(email=email).first()
    if not otp_entry:
        return jsonify({'message': 'No OTP found for this email'}), 404

    now = datetime.now(timezone.utc)
    expires_at = otp_entry.expires_at


    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    if now > expires_at:
        db.session.delete(otp_entry)
        db.session.commit()
        return jsonify({'message': 'OTP has expired'}), 410

    if otp_entry.otp != otp:
        return jsonify({'message': 'Invalid OTP'}), 401

    return jsonify({'message': 'OTP verified. You can now reset your password'}), 200
@auth.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.json
    email = session.get('reset_email')
    
    if not email:
        return jsonify({'message': 'Session expired or invalid, retry forgot password process'}), 400
    
    user = Enrolled_User.query.filter_by(email=email).first()  
    drivers = Enrolled_Driver.query.filter_by(email=email).first()

    if not user and not drivers:
        return jsonify({'message': 'User not found'}), 404
    
    new_password = data.get('new_password')
    if not new_password:
        return jsonify({'message': 'New password is required'}), 400

    hashed_pw = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    if user:
        user.password = hashed_pw
    else:
        drivers.password = hashed_pw

    db.session.commit()

    OTPStore.query.filter_by(email=email).delete()
    db.session.commit()
    session.pop('reset_email', None)

    return jsonify({'message': 'Password reset successful'}), 200
