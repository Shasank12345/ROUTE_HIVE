from flask import Blueprint, request, jsonify, session
from models import User, Bus, BusLocation
from utility import send_mail
import random
import math
import threading

map = Blueprint('mapp', __name__)

def offset_position(lat, lon, distance_m):
    R = 6371000  

    lat1 = math.radians(lat)
    lon1 = math.radians(lon)

    bearing = random.uniform(0, 2 * math.pi)

    d_by_r = distance_m / R

    lat2 = math.asin(math.sin(lat1) * math.cos(d_by_r) +
                     math.cos(lat1) * math.sin(d_by_r) * math.cos(bearing))

    lon2 = lon1 + math.atan2(math.sin(bearing) * math.sin(d_by_r) * math.cos(lat1),
                             math.cos(d_by_r) - math.sin(lat1) * math.sin(lat2))

    return math.degrees(lat2), math.degrees(lon2)


@map.route('/get_user_info', methods=['POST'])
def get_user_info():
    email = session.get('email')
    if not email:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    bus = Bus.query.get(user.Bus_id) if user.Bus_id else None
    driver_email = bus.Driver_Email if bus else None

    return jsonify({
        'role': 'user',
        'Bus_id': user.Bus_id,
        'email': user.email,
        'name': user.Full_Name,
        'driver_email': driver_email,
    })


@map.route('/simulate_bus', methods=['POST'])
def simulate_bus():
    email = session.get('email')
    if not email:
        return jsonify({'error': 'Unauthorized'}), 401

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json() or {}

    user_lat = data.get('latitude')
    user_lon = data.get('longitude')

    if user_lat is None or user_lon is None:
        user_lat = getattr(user, 'pickup_lat', None)
        user_lon = getattr(user, 'pickup_lng', None)

    if user_lat is None or user_lon is None:
        return jsonify({'error': 'User location required'}), 400

    user_lat = float(user_lat)
    user_lon = float(user_lon)

    dist = random.uniform(500, 1000)
    bus_lat, bus_lon = offset_position(user_lat, user_lon, dist)

    return jsonify({
        'user_location': {'lat': user_lat, 'lng': user_lon},
        'bus_start': {'lat': bus_lat, 'lng': bus_lon},
        'distance': dist
    }), 200


def async_send_mail(to_email, subject, body):
    send_mail(to_email, subject, body)


@map.route('/notify_user/near', methods=['POST'])
def notify_user_near():
    email = session.get('email')
    if not email:
        return jsonify({'error': 'Unauthorized'}), 401

    subject = "Bus is Nearing Your Location"
    body = "Dear user, your bus is getting close. Please prepare to board."

    threading.Thread(target=async_send_mail, args=(email, subject, body), daemon=True).start()

    return jsonify({'status': 'Near notification sent'}), 200


@map.route('/notify_user/arrived', methods=['POST'])
def notify_user_arrived():
    email = session.get('email')
    if not email:
        return jsonify({'error': 'Unauthorized'}), 401

    subject = "Bus Has Arrived"
    body = "Dear user, your bus has arrived at your pickup point. Please board now."

    threading.Thread(target=async_send_mail, args=(email, subject, body), daemon=True).start()

    return jsonify({'status': 'Arrived notification sent'}), 200


@map.route('/bus_location/<int:bus_id>', methods=['GET'])
def bus_location(bus_id):
    latest_loc = (
        BusLocation.query.filter_by(bus_id=bus_id)
        .order_by(BusLocation.timestamp.desc())
        .first()
    )
    if not latest_loc:
        return jsonify({'error': 'No location data found'}), 404

    return jsonify({
        'latitude': latest_loc.latitude,
        'longitude': latest_loc.longitude,
        'timestamp': latest_loc.timestamp.isoformat()
    })
