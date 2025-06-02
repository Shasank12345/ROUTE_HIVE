from flask import Blueprint , request,jsonify
from models import User
auth = Blueprint('auth',__name__)

@auth.route('/login',methods=['POST'])
def login():
    data=request.json
    email=data.get('email')
    password=data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.password == password :
        return jsonify({"message":"Login Sucessful"}),200
    else :
        return jsonify({'message':"Invalid Credentials"}),401