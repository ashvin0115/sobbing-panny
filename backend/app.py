from flask import Flask, request, jsonify
from sqlalchemy import create_engine
from flask_cors import CORS, cross_origin
from utils import app, db, encode_auth_token, decode_auth_token
from purchases import get_purchases
from messages import send_sms
CORS(app)

port = 4293
@app.route('/')
@cross_origin()
def index():
    return "Hello world!"

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,x-requested-with')

@app.route('/purchased_cars')
@cross_origin()
def get_purchased_cars():
     user_id = decode_auth_token(request.json['jwt'])
     return jsonify(get_purchases(user_id))

@app.route('/messages', methods=['POST'])
def send_sms_to_user():
    notifications = request.json['notifications']
    body = ""
    for notif in notifications:
        body += "[" + notif + "] " 
    return jsonify(send_sms('number', body))

@app.route('/login', methods=['POST'])
def login():
     print(request.json)
     user = request.json['user']
     return encode_auth_token(user)



if __name__ == '__main__':
     app.run(port=port)
