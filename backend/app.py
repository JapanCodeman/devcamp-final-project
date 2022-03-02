import datetime
from distutils.log import error
import json
from typing import Any

import pymongo
# import jwt
from bson.objectid import ObjectId
from flask_jwt_extended import create_access_token
from flask_jwt_extended import decode_token
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask import Flask, jsonify, make_response, Response, request
from flask_cors import CORS, cross_origin
from pymongo import ReturnDocument
from werkzeug.security import generate_password_hash, check_password_hash

CONNECTION_URL = "mongodb+srv://JapanCodeMan:6yGkgNvnhwU8WlDp@cluster0.b1d3f.mongodb.net/letsgovocab?retryWrites=true&w=majority"

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

app.config['JWT_SECRET_KEY'] = "f3cfe9ed8fae309f02079dbf"
jwt = JWTManager(app)


try:
  client = pymongo.MongoClient(CONNECTION_URL, serverSelectionTimeoutMS = 10000)

except:
  print("Error - cannot connect to database")

Database = client.get_database('letsgovocab')

instructors = Database.instructors
students = Database.students
cards = Database.cards
administrators = Database.admin

# Calendar for 64 day schedule
overall_study_calendar = [[2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [5,1], [4,2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [6,1], [2,1], [3,1], [2,1], [5,1], [4,2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [5,1], [4,2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [7,1], [2,1], [3,1], [6,2,1], [5,1], [4,2,1], [3,1], [2,1], [1]]

# Test to see if flask is working
@app.route('/')
def test():
  return "connected to flask"

# TODO - make login route
@app.route("/login", methods=["POST"])
@cross_origin()
def create_token():
  email = request.json.get("email", None)
  password = request.json.get("password", None)
  role = request.json.get("role", None)

  if not email or not password:
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required"'})
  user = instructors.find_one({"email" : email})

  if not user:
    user = students.find_one({"email" : email})

  if not user:
    user = administrators.find_one({"email" : email})

  if not user:
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

  if check_password_hash(user["password"], password):
    try:
      token = create_access_token(identity={"email" : email, "role" : role, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)})
      return jsonify(token=token)
    except:
      return "Token unable to be distributed", error

  return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required"'})

# Register a new instructor - WORKING!!!
@app.route('/register-instructor/', methods=['POST'])
@cross_origin()
def register_one_instructor():
  first = request.json.get("first")
  last = request.json.get("last")
  email = request.json.get("email")
  course = request.json.get("course")
  password = request.json.get("password")
  logged_status = "False"

  _hashed_password = generate_password_hash(password, method='sha256')

  queryObject = {
    "first": first,
    "last": last,
    "role": '',
    "email": email,
    "course": course,
    "password": _hashed_password,
    "logged_in": logged_status
  }
  query = instructors.insert_one(queryObject)
  return f'{first} {last} and associated data registered to Instructor database'

# List all instructors - WORKING!!!
@app.route('/instructors/', methods=['GET'])
@cross_origin()
def find_all_instructors():
  results = list(instructors.find())
  for instructor in results:
    instructor["_id"] = str(instructor["_id"])

  return Response(
    response=json.dumps(results),
    status=200,
    mimetype="application/json"
  )

# Find one instructor by id - WORKING!!!
@app.route('/instructor/<id>', methods=['GET'])
@cross_origin()
def find_one_instructor(id):
  instructor = instructors.find_one({"_id":ObjectId(id)})
  instructor["_id"] = str(instructor["_id"])
  
  return Response(
    response=json.dumps(instructor),
    status=200,
    mimetype="application/json"
  )

# Update one instructor - WORKING!!! - TODO how to update and keep password hashed?
@app.route('/update-instructor/<id>', methods=['PATCH'])
@cross_origin()
def update_one_instructor(id):
  id = ObjectId(id)
  id_call = {"_id" : id}

  request_params = request.get_json()
  updateObject = request_params

  result = instructors.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'{result["first"]} {result["last"]}\'s information updated {updateObject}'

# Delete one instructor - WORKING!!!
@app.route('/delete-instructor/<id>', methods=['DELETE'])
@cross_origin()
def delete_one_instructor(id):
  id = ObjectId(id)
  id_call = {"_id" : id}
  id = instructors.delete_one(id_call)
  return 'Instructor deleted'

# Delete entire instructor document - WORKING!!!
@app.route('/delete-all-instructors/', methods=['DELETE'])
@cross_origin()
def delete_all_instructors():
  result = instructors.delete_many({})
  return 'Instructor table dropped'

# TODO - students CRUD
# Register a new student - WORKING!!!
@app.route('/register-student', methods=['POST'])
@cross_origin()
# @cross_origin(origins='*')
def register_one_student():
  first = request.json.get("first")
  last = request.json.get("last")
  email = request.json.get("email")
  course = request.json.get("course")
  password = request.json.get("password")
  logged_status = "False"
  # This will use an index call on overall_study_calendar to pull today's study sets
  scheduled_study_set = 0
  # Boxes will hold IDs of cards to be studied (maybe something else to avoid dealing with ObjectID)
  vocabulary_box_one = []
  vocabulary_box_two = []
  vocabulary_box_three = []
  vocabulary_box_four = []
  vocabulary_box_five = []
  vocabulary_box_six = []
  vocabulary_box_seven = []

  _hashed_password = generate_password_hash(password, method='sha256')

  queryObject = {
    "first" : first,
    "last" : last,
    "email" : email,
    "role" : '',
    "course" : course,
    "password" : _hashed_password,
    "logged_in": logged_status,
    "scheduled_study_set": scheduled_study_set,
    "vocabulary_box_one": vocabulary_box_one,
    "vocabulary_box_two": vocabulary_box_two,
    "vocabulary_box_three": vocabulary_box_three,
    "vocabulary_box_four": vocabulary_box_four,
    "vocabulary_box_five": vocabulary_box_five,
    "vocabulary_box_six": vocabulary_box_six,
    "vocabulary_box_seven": vocabulary_box_seven,
  }
  query = students.insert_one(queryObject)
  return 'registered'

# Find one student - WORKING!!!
@app.route('/student/<id>', methods=['GET'])
@cross_origin()
def get_student(id):
  student = students.find_one({'_id':ObjectId(id)})
  student["_id"] = str(student["_id"])
  
  return Response(
    response=json.dumps(student),
    status=200,
    mimetype="application/json"
  )

# Look student up by e-mail for after login - TODO change to user instead of student
@app.route('/student-email/<email>', methods=['GET'])
@cross_origin()
@jwt_required()
def get_student_by_email(email):
  student = students.find_one({"email":email})
  student["_id"] = str(student["_id"])
  
  return Response(
    response=json.dumps(student),
    status=200,
    mimetype="application/json"
  )
 
# List all students - WORKING!!!
@app.route('/students/', methods=['GET'])
@cross_origin()
def find_all_students():
  results = list(students.find())
  for student in results:
    student["_id"] = str(student["_id"])

  return Response(
    response=json.dumps(results),
    status=200,
    mimetype="application/json"
  )

# Update one student - WORKING!!!
@app.route('/update-student/<id>', methods=['PATCH'])
@cross_origin()
def update_one_student(id):
  request_params = request.get_json()
  updateObject = request_params
  id = ObjectId(id)
  id_call = {"_id" : id}

  result = students.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'{result["first"]} {result["last"]}\'s information updated {updateObject}'

# Update one student by email - WORKING!!!
@app.route('/update-student-by-email/<email>', methods=['PATCH'])
@cross_origin()
def update_one_student_email(email):
  request_params = request.get_json()
  updateObject = request_params
  email = {"email" : email}

  result = students.find_one_and_update(email, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'{result["first"]} {result["last"]}\'s information updated {updateObject}'

# Delete one student - WORKING!!!
@app.route('/delete-student/<id>', methods=['DELETE'])
@cross_origin()
def delete_one_student(id):
  id = ObjectId(id)
  id_call = {"_id" : id}
  result = students.delete_one(id_call)
  return 'Student deleted'

# Delete entire student document - WORKING!!!
@app.route('/delete-all-students', methods=['DELETE'])
@cross_origin()
def delete_all_students():
  # queryObject = {}
  result = students.delete_many({})
  return 'Student table dropped'

# TODO - cards CRUD
# Create one new card with associated course - WORKING!!!
@app.route('/create-card', methods=['POST'])
@cross_origin()
def create_card(box_number=0, guessed_correctly_count=0):
  course = request.json.get('course')
  lang1 = request.json.get('lang1')
  lang2 = request.json.get('lang2')
  queryObject = {
    'course': course,
    'front': lang1,
    'back': lang2,
    'box_number': box_number,
    'guessed_correctly_count': guessed_correctly_count
  }
  
  result = cards.insert_one(queryObject)
  return f'{lang1}/{lang2} card created for course: {course}'

# Create many cards - WORKING!!!
@app.route('/create-cards', methods=['PUT'])
@cross_origin()
def create_cards(box_number=0, guessed_correctly_count=0):
  cards_list = request.get_json()
  for card in cards_list:
    card["box_number"] = box_number
    card["guessed_correctly_count"] = guessed_correctly_count
  result = cards.insert_many(cards_list)
  return 'Multiple cards uploaded'

# View all cards - WORKING!!!
@app.route('/cards', methods=['GET'])
@cross_origin()
def get_all_cards():
  results = list(cards.find())
  for card in results:
    card["_id"] = str(card["_id"])

  return Response(
    response=json.dumps(results),
    status=200,
    mimetype="application/json"
  )

# Update a card - WORKING!!!
@app.route('/update-card/<id>', methods=['PATCH'])
@cross_origin()
def update_a_card(id, box_number=0, guessed_correctly_count=0):
  id = ObjectId(id)
  id_call = {"_id" : id}
  request_params = request.get_json()
  updateObject = request_params
  updateObject["box_number"] = box_number
  updateObject["guessed_correctly_count"] = guessed_correctly_count

  result = cards.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'Card information updated {updateObject}'

# TODO - How to do update_many? Submit via form? Necessary?
# TODO - also, delete_many? Add "deck" key or perhaps timestamp to each card?
@app.route('/delete-card/<id>', methods=['DELETE'])
@cross_origin()
def delete_a_card(id):
  id = ObjectId(id)
  id_call = {"_id" : id}

  result = cards.find_one_and_delete(id_call)
  return "Card deleted"

# Delete all cards - WORKING!!!
@app.route('/delete-all-cards', methods=['DELETE'])
@cross_origin()
def delete_all_cards():
  result = cards.delete_many({})
  return 'Cards table dropped'

# TODO - Get today's cards based on vocab study calendar

# TODO - admin CRUD
# Register a new administrator - WORKING!!!
@app.route('/register-admin', methods=['POST'])
@cross_origin()
def register_one_admin():
  first = request.json.get("first")
  last = request.json.get("last")
  email = request.json.get("email")
  password = request.json.get("password")
  logged_status = "False"

  _hashed_password = generate_password_hash(password, method='sha256')

  queryObject = {
    "first" : first,
    "last" : last,
    "email" : email,
    "role" : 'Administrator',
    "password" : _hashed_password,
    "logged_in": logged_status
  }
  query = administrators.insert_one(queryObject)
  return f'{first} {last} registered with administrator privileges.'

# Find one administrator by id
@app.route('/administrator/<id>', methods=['GET'])
@cross_origin()
def find_one_administrator(id):
  id_call = {"_id" : ObjectId(id)}
  administrator = administrators.find_one(id_call)
  administrator["_id"] = str(administrator["_id"])
  
  return administrator

# Find one administrator by email
@app.route('/administrator-by-email/<email>', methods=['GET'])
@cross_origin()
def find_admin_by_email(email):
  administrator = administrators.find_one({"email":email})
  administrator["_id"] = str(administrator["_id"])

  return Response(
    response=json.dumps(administrator),
    status=200,
    mimetype="application/json"
  )


# Find all administrators
@app.route('/administrators/', methods=['GET'])
@cross_origin()
def find_all_admins():
  results = list(administrators.find())
  for admin in results:
    admin["_id"] = str(admin["_id"])

  return Response(
    response=json.dumps(results),
    status=200,
    mimetype="application/json"
  )

# Update one administrator - WORKING!!!
@app.route('/update-administrator/<id>', methods=['PATCH'])
@cross_origin()
def update_one_administrator(id):
  request_params = request.get_json()
  updateObject = request_params
  id = ObjectId(id)
  id_call = {"_id" : id}

  result = administrators.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'{result["first"]} {result["last"]}\'s information updated {updateObject}'

# Delete one administrator 
@app.route('/delete-administrator/<id>', methods=['DELETE'])
@cross_origin()
def delete_one_administrator(id):
  id_call = {"_id":ObjectId(id)}


  result = administrators.find_one_and_delete(id_call)
  return f'Administrator removed from database.'

if __name__ == '__main__':
  app.run(debug=True)