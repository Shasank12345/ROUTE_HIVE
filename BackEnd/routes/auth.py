from flask import Blueprint, request, jsonify, session
from datetime import datetime, timezone
from models import User, db, OTPStore
from utility import generate_otp, send_email

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        return jsonify({"message": "Login Successful"}), 200
    else:
        return jsonify({'message': "Invalid Credentials"}), 401

@auth.route('/forgot_password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get('email')
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'Email Not Found'}), 404
    else:
        otp = generate_otp()
        if send_email(email, otp):
            existing = OTPStore.query.filter_by(email=email).first()
            if existing:
                db.session.delete(existing)
                db.session.commit()
            otp_entry = OTPStore(email=email, otp=otp)
            db.session.add(otp_entry)
            db.session.commit()
            session['reset_email'] = email  # store email in session for next steps
            return jsonify({'message': 'OTP sent to email'}), 200
        else:
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
        print("error ")
    otpexp=otp_entry.expires_at

    otpnow=datetime.now(timezone.utc)
    if not otp_entry:
        return jsonify({'message': 'No OTP found for this email'}), 404
    if otp_entry.otp != otp:
        return jsonify({'message': 'Invalid OTP'}), 401
    # elif otpnow > otpexp:
        #  return jsonify({'message': 'OTP has expired'}), 410
    else:
        return jsonify({'message': 'OTP verified. You can now reset your password'}), 200

@auth.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.json
    email = session.get('reset_email')
    if not email:
        return jsonify({'message': 'Session expired or invalid, retry forgot password process'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    new_password = data.get('new_password')
    if not new_password:
        return jsonify({'message': 'New password is required'}), 400

    user.password = new_password
    db.session.commit()

    OTPStore.query.filter_by(email=email).delete()
    db.session.commit()

    session.pop('reset_email', None)
    return jsonify({'message': 'Password reset successful'}), 200
