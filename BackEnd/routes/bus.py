from flask import Blueprint, request, jsonify
from models import db, Enrolled_Driver, Bus, User, Enrolled_User

buss = Blueprint('bus', __name__)

@buss.route('/driver', methods=['GET'])
def get_drivers():
    drivers = Enrolled_Driver.query.all()
    driver_list = []
    for d in drivers:
        driver_list.append({
            'email': d.email,
            'name': d.Full_Name,
            'phone': d.phone_num,
            'preferred_route': d.preferred_route
        })
    return jsonify(driver_list), 200


@buss.route('/add_bus', methods=['POST'])
def add_bus():
    data = request.get_json()
    bus_name = data.get('busName')
    bus_number = data.get('busNumber')
    driver_email = data.get('driverEmail')
    driver_contact = data.get('driverContact')
    bus_route = data.get('busRoute')

    if not all([bus_name, bus_number, driver_email, driver_contact, bus_route]):
        return jsonify({'error': 'Missing fields'}), 400

    driver = Enrolled_Driver.query.filter_by(email=driver_email).first()
    if not driver:
        return jsonify({'error': 'Driver not found'}), 404

    existing_bus = Bus.query.filter((Bus.Bus_Name == bus_name) | (Bus.Bus_Number == bus_number)).first()
    if existing_bus:
        return jsonify({'error': 'Bus name or number already exists'}), 400

    new_bus = Bus(
        Bus_Name=bus_name,
        Bus_Number=bus_number,
        Driver_Email=driver_email,
        Driver_Phone=driver_contact,
        Route=bus_route
    )
    db.session.add(new_bus)
    db.session.commit()

    assigned_count = 0
    route_stops = [r.strip().lower() for r in bus_route.split(',')]

    for enrolled in Enrolled_User.query.all():
        if enrolled.pick_at.strip().lower() in route_stops:
            existing_user = User.query.filter_by(email=enrolled.email).first()
            if not existing_user:
                new_user = User(
                    Full_Name=enrolled.Full_Name,
                    email=enrolled.email,
                    password='',
                    phone_num=enrolled.phone_num,
                    pick_at=enrolled.pick_at,
                    Role=enrolled.Role,
                    school=enrolled.school,
                    Bus_id=new_bus.id
                )
                db.session.add(new_user)
                assigned_count += 1
            else:
                if existing_user.Bus_id != new_bus.id:
                    existing_user.Bus_id = new_bus.id
                    assigned_count += 1

    db.session.commit()

    return jsonify({
        'message': f'Bus "{bus_name}" added successfully.',
        'users_assigned': assigned_count
    }), 201


@buss.route('/delete_bus/<int:bus_id>', methods=['DELETE'])
def delete_bus(bus_id):
    bus = Bus.query.get(bus_id)
    if not bus:
        return jsonify({'error': 'Bus not found'}), 404

    users = User.query.filter_by(Bus_id=bus_id).all() 
    for user in users:
        db.session.delete(user)

    db.session.delete(bus)
    db.session.commit()

    return jsonify({'message': f'Bus with id {bus_id} and assigned users deleted.'}), 200


@buss.route('/send', methods=['GET'])
def send():
    buses = Bus.query.all()
    result = []
    for b in buses:
        result.append({
            "id": b.id,
            "Bus_Name": b.Bus_Name,
            "Bus_Number": b.Bus_Number,
            "Driver_Email": b.Driver_Email,
            "Driver_Phone": b.Driver_Phone,
            "Route": b.Route
        })
    return jsonify(result), 200


@buss.route('/users_by_bus/<int:bus_id>')
def users_by_bus(bus_id):
    users = User.query.filter_by(Bus_id=bus_id).all()  # Capital B here
    user_list = [{
        'id': u.id,
        'Full_Name': u.Full_Name,
        'email': u.email,
        'phone_num': u.phone_num,
        'pick_at': u.pick_at,
        'Role': u.Role,
        'school': u.school
    } for u in users]

    return jsonify({'users': user_list})
