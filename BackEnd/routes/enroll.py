from flask import Blueprint,jsonify,request
from models import db,Form_Data,Enrolled_User
from utility import send_mail,generate_password
import bcrypt


enrolll=Blueprint('enroll',__name__)


@enrolll.route('/enroll',methods=['POST'])
def enroll():
    data=request.get_json()
    Full_Name=data.get('name')
    email=data.get('email')
    phone_num=data.get('phone')
    pick_at=data.get('address')
    Role=data.get('role')
    School=data.get('school')

    ent=Form_Data(Full_Name=Full_Name,email=email,phone_num=phone_num,pick_at=pick_at,Role=Role,school=School)
    db.session.add(ent)
    db.session.commit()
    return jsonify({'Full_Name':ent.Full_Name,
                    'email':ent.email,
                    'phone_num':ent.phone_num,
                    'pick_at' : ent.pick_at,
                    'Role':ent.Role,
                    'School':ent.school
                    }),201
@enrolll.route('/check',methods=['GET'])
def check():
    data=Form_Data.query.all()
    result=[]
    for d in data:
        result.append({
            'id':d.id,
            'Full_Name':d.Full_Name,
            'email':d.email,
            'phone_num':d.phone_num,
            'pick_at':d.pick_at,
            'Role':d.Role,
            'School':d.school
        


        })
        print(result)
    return jsonify(result)

@enrolll.route('/accept', methods=['POST'])
def accept():
    data = request.get_json()
    email = data.get('email')
    d = Form_Data.query.filter_by(email=email).first()

    if not d:
        return jsonify({'message': 'ENTRY NOT FOUND'}), 404

    password = generate_password()
    password_byte = password.encode('utf-8')
    hashed = bcrypt.hashpw(password_byte, bcrypt.gensalt())
    hashed_password_str = hashed.decode('utf-8')

    accept = Enrolled_User(
        Full_Name=d.Full_Name,
        email=email,
        password=hashed_password_str,
        phone_num=d.phone_num,
        pick_at=d.pick_at,
        Role=d.Role,
        school=d.school
    )
    db.session.add(accept)
    db.session.delete(d)
    db.session.commit()

    subject = 'ENROLLMENT APPROVED SUCESSFULLY'
    body = f"Hello {d.Full_Name},\n\nYour enrollment has been approved.\n\nYour login password is: {password}\n\nPlease login and change it as soon as possible.\n\nRegards,\nRouteHive Team"
    send_mail(email, subject, body)

    return jsonify({'message': 'User enrolled sucessfully and email is sent sucessfully'})

@enrolll.route('/reject',methods=['POST'])
def reject():
    data=request.get_json()
    email=data.get('email')
    a=Form_Data.query.filter_by(email=email).first()
    if not a :
        return jsonify({'message':'USER NOT FOUND'}),404
    
    subject='ENROLLMENT FORM REJECTED'
    body=f"Hello {a.Full_Name},\n\nWe regret to inform you that your transport enrollment has been rejected.\n\nPlease re-enroll with correct details if needed.\n\nRegards,\nRouteHive Team"
    send_mail(email,subject,body)
    db.session.delete(a)
    db.session.commit()

    return jsonify({'message':'User Rejected and Email sent Sucessfully'}),200