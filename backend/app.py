import datetime
from distutils.log import error
import json

import os
import pymongo
from bson.objectid import ObjectId
from bson import json_util
from dotenv import load_dotenv, find_dotenv
from flask_jwt_extended import create_access_token
from flask_jwt_extended import decode_token
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required
from flask import Flask, jsonify, make_response, Response, request
from flask_cors import CORS, cross_origin
from pymongo import ReturnDocument
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv(find_dotenv())

CONNECTION_URL = os.getenv('CONNECTION_STRING')

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')
jwt = JWTManager(app)


try:
  client = pymongo.MongoClient(CONNECTION_URL, serverSelectionTimeoutMS = 2000)

except:
  print("Error - cannot connect to database")

Database = client.get_database('letsgovocab')

instructors = Database.instructors
students = Database.students
users = Database.users
administrators = Database.admin

cards = Database.cards

# Calendar for 64 day schedule
overall_study_calendar = [[2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [5,1], [4,2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [6,1], [2,1], [3,1], [2,1], [5,1], [4,2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [5,1], [4,2,1], [3,1], [2,1], [1], [2,1], [3,1], [2,1], [4,1], [2,1], [3,1], [2,1], [7,1], [2,1], [3,1], [6,2,1], [5,1], [4,2,1], [3,1], [2,1], [1]]

# Test to see if flask is working
@app.route('/')
def test():
  return "connected to flask"

# TODO - make login route
@app.route("/login", methods=["POST"])
def create_token():
  email = request.json.get("email", None)
  password = request.json.get("password", None)

  if not email or not password:
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required"'})
  
  user = users.find_one({"email" : email})

  if not user:
    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

  if check_password_hash(user["password"], password):
    try:
      token = create_access_token(identity={"email" : email, "role" : user["role"], 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)})
      return jsonify(token=token)
    except:
      return "Token unable to be distributed", error

  return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required"'})

# Register a new instructor - WORKING!!!
@app.route('/register-instructor/', methods=['POST'])
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
    "role": 'Instructor',
    "email": email,
    "course": course,
    "password": _hashed_password,
    "logged_in": logged_status
  }
  query = users.insert_one(queryObject)
  return f'{first} {last} and associated data registered to user database as Instructor'

# List all instructors from user database - WORKING!!!
@app.route('/instructors', methods=['GET'])
def find_all_instructors():
  results = list(users.find({"role" : "Instructor"}))
  for instructor in results:
    instructor["_id"] = str(instructor["_id"])

  return Response(
    response=json.dumps(results),
    status=200,
    mimetype="application/json"
  )

# Find one user by id - WORKING!!!
@app.route('/user/<id>', methods=['GET'])
def find_one_user(id):
  user = users.find_one({"_id":ObjectId(id)})
  user["_id"] = str(user["_id"])
  
  return Response(
    response=json.dumps(user),
    status=200,
    mimetype="application/json"
  )

# Look user up by e-mail
@app.route('/user-email/<email>', methods=['GET'])
def get_user_by_email(email):
  user = users.find_one({"email":email})
  user["_id"] = str(user["_id"])
  
  return Response(
    response=json.dumps(user),
    status=200,
    mimetype="application/json"
  )

# Update one instructor - WORKING!!! - TODO how to update and keep password hashed?
@app.route('/update-user/<id>', methods=['PATCH', 'PUT'])
def update_one_user(id):
  id = ObjectId(id)

  updateObject = request.get_json()
  jsonify(updateObject)

  result = users.find_one_and_update({"_id" : id}, 
  { "$set" : updateObject },
  return_document = ReturnDocument.AFTER)

  return "User Updated"

# Delete one user - WORKING!!!
@app.route('/delete-user/<id>', methods=['DELETE'])
def delete_one_user(id):
  id = ObjectId(id)
  id_call = {"_id" : id}
  id = users.delete_one(id_call)
  return 'User deleted'

# Delete entire instructor document - WORKING!!!
@app.route('/delete-all-users/', methods=['DELETE'])
def delete_all_users():
  result = users.delete_many({})
  return 'User table dropped'

# Register a new student - WORKING!!!
@app.route('/register-student', methods=['POST'])
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
  current_box_index = 0
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
    "role" : "Student",
    "course" : course,
    "password" : _hashed_password,
    "logged_in": logged_status,
    "current_box_index": 0,
    "scheduled_study_set": scheduled_study_set,
    "vocabulary_box_one": vocabulary_box_one,
    "vocabulary_box_two": vocabulary_box_two,
    "vocabulary_box_three": vocabulary_box_three,
    "vocabulary_box_four": vocabulary_box_four,
    "vocabulary_box_five": vocabulary_box_five,
    "vocabulary_box_six": vocabulary_box_six,
    "vocabulary_box_seven": vocabulary_box_seven
  }
  query = users.insert_one(queryObject)
  return 'registered'

@app.route('/users-by-course/<course>', methods=['GET'])
def get_users_by_class(course):
  user_results = []
  for user in users.find({"course":course}):
    user["_id"] = str(user["_id"])
    user_results.append(user)

  return Response(
  response=json_util.dumps(user_results),
  status=200,
  mimetype="application/json"
  )

@app.route('/student-email/<email>', methods=['GET'])
# @jwt_required()
def get_student_by_email(email):
  student = users.find_one({"email":email})
  student["_id"] = str(student["_id"])
  
  return Response(
    response=json.dumps(student),
    status=200,
    mimetype="application/json"
  )

@app.route('/students/', methods=['GET'])
def find_all_students():
  results = list(users.find({"role" : "Student"}))
  for student in results:
    student["_id"] = str(student["_id"])

  return Response(
    response=json.dumps(results),
    status=200,
    mimetype="application/json"
  )

# Update one user by email - WORKING!!!
@app.route('/update-user-by-email/<email>', methods=['PATCH', 'PUT', 'GET'])
def update_one_user_email(email):
  updateObject = request.get_json()
  jsonify(updateObject)

  result = users.find_one_and_update({"email" : email}, 
  { "$set" : updateObject }, 
  return_document=ReturnDocument.AFTER)
  return "User updated by email"

# Delete entire student document - WORKING!!!
@app.route('/delete-all-students', methods=['DELETE'])
def delete_all_students():
  result = users.delete_many({"role" : "Student" })
  return 'All students deleted'

# Create many cards - WORKING!!!
@app.route('/create-cards', methods=['POST'])
def create_cards():
  cards_list = request.get_json()
  result = cards.insert_many(cards_list)
  return 'Multiple cards uploaded'

# View all cards - WORKING!!!
@app.route('/cards', methods=['GET'])
def get_all_cards():
  results = list(cards.find())
  for card in results:
    card["_id"] = str(card["_id"])

  return Response(
    response=json.dumps(results),
    status=200,
    mimetype="application/json"
  )

# Get cards by course
@app.route('/cards-course/<course>', methods=['GET'])
def get_cards_by_course(course):
  results = list(cards.find({'course' : course}))
  for card in results:
    card["_id"] = str(card["_id"])

  return Response(
    response=json.dumps(results),
    status=200,
    mimetype="application/json"
  )


# Get card sets by instructor
@app.route('/sets-by-instructor/<user>', methods=['GET', 'POST'])
def get_sets_by_instructor(user):
  
  card_sets = cards.find({
    "created_by" : user
  })

  card_sets_cur = list(card_sets)

  unique_sets = []

  for card in card_sets_cur:
    card["_id"] = str(card["_id"])
    if card["set_name"] not in unique_sets:
      unique_sets.append(card["set_name"])
    else:
      continue

  return Response(
    response=json.dumps(unique_sets),
    status=200,
    mimetype="application/json"
  )

# Get cards by set name
@app.route('/cards-by-setname/<setname>', methods=['GET'])
def cards_by_setname(setname):
  set = cards.find({
    "set_name" : setname
  })

  card_sets = list(set)

  for card in card_sets:
    card["_id"] = str(card["_id"])

  return Response(
  response=json.dumps(card_sets),
  status=200,
  mimetype="application/json"
)

# Get all new cards so they can be assigned to box 1
@app.route('/get-todays-cards/<id>')
def get_todays_cards(id):
  id = ObjectId()

  student = users.find({
    "_id" : id,
  })
  student["_id"] = str(student["_id"])

  # todays_boxes = overall_study_calendar[student["current_box_index"]]

  return Response(
  response=json.dumps(student),
  status=200,
  mimetype="application/json"
)

# Get all unboxed cards
@app.route('/get-unboxed-cards/<course>', methods=['GET'])
def get_unboxed_cards(course):
# Make a JSON request for cards with box_number == 0 and student's class
# Creating cards with an original state of box_number = 0 isn't going to work because they will "reset" every time they are called
  new_cards = cards.find({
    "course" : course
  })

  new_card_ids = []

  for card in new_cards:
    new_card_ids.append(str(card["_id"]))

  return Response(
    response=json.dumps(new_card_ids),
    status=200,
    mimetype="application/json"
  )  

@app.route('/get-cards-by-id', methods=['GET'])
def get_cards_by_id():
  ids = request.get_json()
  called_cards = []

  # for id in ids:
  #   # ids["_id"] = ObjectId(ids["_id"])
  #   card = cards.find({
  #     "_id" : ObjectId(id["_id"])
  #   })
  #   called_cards.append(card)

  return Response(
  response=json.dumps(ids),
  status=200,
  mimetype="application/json"
)  

# Update a card - WORKING!!!
@app.route('/update-card/<id>', methods=['PATCH'])
def update_a_card(id):
  id = ObjectId(id)
  id_call = {"_id" : id}
  request_params = request.get_json()
  updateObject = request_params

  result = cards.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'Card information updated {updateObject}'

# TODO - How to do update_many? Submit via form? Necessary?
# TODO - also, delete_many? Add "deck" key or perhaps timestamp to each card?
@app.route('/delete-card/<id>', methods=['DELETE'])
def delete_a_card(id):
  id = ObjectId(id)
  id_call = {"_id" : id}

  result = cards.find_one_and_delete(id_call)
  return "Card deleted"

# Delete all cards - WORKING!!!
@app.route('/delete-all-cards', methods=['DELETE'])
def delete_all_cards():
  result = cards.delete_many({})
  return 'Cards table dropped'

# TODO - admin CRUD
# Register a new administrator - WORKING!!!
@app.route('/register-admin', methods=['POST'])
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
  query = users.insert_one(queryObject)
  return f'{first} {last} registered with administrator privileges.'

# Find User by email
@app.route('/user-by-email/<email>', methods=['GET'])
def find_admin_by_email(email):
  user = users.find_one({"email":email})
  user["_id"] = str(user["_id"])

  return Response(
    response=json.dumps(user),
    status=200,
    mimetype="application/json"
  )

# Find all administrators
@app.route('/administrators', methods=['GET'])
def find_all_admins():
  results = list(users.find({"role" : "Administrator"}))
  for admin in results:
    admin["_id"] = str(admin["_id"])

  return Response(
    response=json.dumps(results),
    status=200,
    mimetype="application/json"
  )

# Update one administrator - WORKING!!!
@app.route('/update-administrator/<id>', methods=['PATCH'])
def update_one_administrator(id):
  request_params = request.get_json()
  updateObject = request_params
  id = ObjectId(id)
  id_call = {"_id" : id}

  result = administrators.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'{result["first"]} {result["last"]}\'s information updated {updateObject}'


# Update one administrator by email - WORKING!!!
@app.route('/update-administrator-by-email/<email>', methods=['PATCH'])
def update_one_administrator_email(email):
  request_params = request.get_json()
  updateObject = request_params
  email = {"email" : email}

  result = administrators.find_one_and_update(email, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'{result["first"]} {result["last"]}\'s information updated {updateObject}'

# Delete one administrator 
@app.route('/delete-administrator/<id>', methods=['DELETE'])
def delete_one_administrator(id):
  id_call = {"_id":ObjectId(id)}


  result = administrators.find_one_and_delete(id_call)
  return f'Administrator removed from database.'

if __name__ == '__main__':
  app.run(debug=True)