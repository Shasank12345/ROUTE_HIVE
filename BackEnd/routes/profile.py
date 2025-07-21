from flask import Blueprint, session, jsonify
from models import User, Bus, Enrolled_Driver

proff = Blueprint('prof', __name__)

@proff.route('/get_profile', methods=['GET'])
def get_profile():
    email = session.get('email')
    role = session.get('role')

    if not email or not role:
        return jsonify({"error": "Unauthorized access"}), 401

    if role == 'user':
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        bus = Bus.query.get(user.Bus_id) if getattr(user, 'Bus_id', None) else None

        return jsonify({
            "fullname": user.Full_Name,
            "email": user.email,
            "phonenumber": getattr(user, 'phone_num', '') or '',
            "role": user.Role,
            "pickuplocation": getattr(user, 'pick_at', '') or '',
            "school": getattr(user, 'school', '') or '',
            "Bus_Name": bus.Bus_Name if bus else "Not Assigned"
        })

    elif role == 'driver':
        driver = Enrolled_Driver.query.filter_by(email=email).first()
        if not driver:
            return jsonify({"error": "Driver not found"}), 404

        bus = Bus.query.filter_by(Driver_Email=driver.email).first()

        return jsonify({
            "fullname": driver.Full_Name,
            "email": driver.email,
            "phonenumber": driver.phone_num,
            "role": role,
            "pickuplocation": driver.preferred_route,
            "Bus_Name": bus.Bus_Name if bus else "Not Assigned"
        })

    return jsonify({"error": "Invalid session role"}), 400
