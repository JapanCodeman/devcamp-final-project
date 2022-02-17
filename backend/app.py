from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import Flask, jsonify, make_response, Response, request
from flask_cors import CORS, cross_origin
import json
import pymongo
from pymongo import ReturnDocument
from werkzeug.security import generate_password_hash, check_password_hash

CONNECTION_URL = "mongodb+srv://JapanCodeMan:6yGkgNvnhwU8WlDp@cluster0.b1d3f.mongodb.net/letsgovocab?retryWrites=true&w=majority"
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

app.secret_key = "OnomichiCats1"

try:
  client = pymongo.MongoClient(CONNECTION_URL, serverSelectionTimeoutMS = 2000)

except:
  print("Error - cannot connect to database")

Database = client.get_database('letsgovocab')

instructors = Database.instructors
students = Database.students
cards = Database.cards
administrators = Database.admin

# Vocabulary program logic

# 'Boxes' to store vocabulary words for students
# filled with card objects or card ObjectId?
box0 = []
box1 = []
box2 = []
box3 = []
box4 = []
box5 = []
box6 = []
box7 = []

# TODO - werzeug


# Test to see if flask is working
@app.route('/')
def test():
  return "connected to flask"

# Register a new instructor - WORKING!!!
@app.route('/register-instructor/', methods=['POST'])
def register_one_instructor():
  first = request.json.get("first")
  last = request.json.get("last")
  email = request.json.get("email")
  course = request.json.get("course")
  password = request.json.get("password")

  _hashed_password = generate_password_hash(password)

  queryObject = {
    "first": first,
    "last": last,
    "role": "Instructor",
    "email": email,
    "course": course,
    "password": _hashed_password 
  }
  query = instructors.insert_one(queryObject)
  return f'{first} {last} and associated data registered to Instructor database'

# List all instructors - WORKING!!!
@app.route('/instructors/', methods=['GET'])
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
def update_one_instructor(id):
  id = ObjectId(id)
  id_call = {"_id" : id}

  request_params = request.get_json()
  updateObject = request_params

  result = instructors.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'{result["first"]} {result["last"]}\'s information updated {updateObject}'

# Delete one instructor - WORKING!!!
@app.route('/delete-instructor/<id>', methods=['DELETE'])
def delete_one_instructor(id):
  id = ObjectId(id)
  id_call = {"_id" : id}
  id = instructors.delete_one(id_call)
  return 'Instructor deleted'

# Delete entire instructor document - WORKING!!!
@app.route('/delete-all-instructors/', methods=['DELETE'])
def delete_all_instructors():
  result = instructors.delete_many({})
  return 'Instructor table dropped'

# TODO - students CRUD
# Register a new student - WORKING!!!
@app.route('/register-student', methods=['POST'])
# @cross_origin(origins='*')
def register_one_student():
  first = request.json.get("first")
  last = request.json.get("last")
  email = request.json.get("email")
  course = request.json.get("course")
  password = request.json.get("password")

  queryObject = {
    "first" : first,
    "last" : last,
    "email" : email,
    "course" : course,
    "password" : password
  }
  query = students.insert_one(queryObject)
  return f'{first} {last} registered to student database.'

# Find one student - WORKING!!!
@app.route('/student/<id>', methods=['GET'])
def get_student(id):
  student = students.find_one({'_id':ObjectId(id)})
  student["_id"] = str(student["_id"])
  
  return Response(
    response=json.dumps(student),
    status=200,
    mimetype="application/json"
  )
 
# List all students - WORKING!!!
@app.route('/students/', methods=['GET'])
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
def update_one_student(id):
  request_params = request.get_json()
  updateObject = request_params
  id = ObjectId(id)
  id_call = {"_id" : id}

  result = students.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'{result["first"]} {result["last"]}\'s information updated {updateObject}'

# Delete one student - WORKING!!!
@app.route('/delete-student/<id>', methods=['DELETE'])
def delete_one_student(id):
  id = ObjectId(id)
  id_call = {"_id" : id}
  result = students.delete_one(id_call)
  return 'Student deleted'

# Delete entire student document - WORKING!!!
@app.route('/delete-all-students', methods=['DELETE'])
def delete_all_students():
  # queryObject = {}
  result = students.delete_many({})
  return 'Student table dropped'

# TODO - cards CRUD
# Create one new card with associated course - WORKING!!!
@app.route('/create-card', methods=['POST'])
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
def create_cards(box_number=0, guessed_correctly_count=0):
  cards_list = request.get_json()
  for card in cards_list:
    card["box_number"] = box_number
    card["guessed_correctly_count"] = guessed_correctly_count
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

# Update a card - WORKING!!!
@app.route('/update-card/<id>', methods=['PATCH'])
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

# TODO - Get today's cards based on vocab study calendar

# TODO - admin CRUD
# Register a new administrator - WORKING!!!
@app.route('/register-admin', methods=['POST'])
def register_one_admin():
  first = request.json.get("first")
  last = request.json.get("last")
  email = request.json.get("email")
  password = request.json.get("password")

  queryObject = {
    "first" : first,
    "last" : last,
    "email" : email,
    "role" : "Administrator",
    "password" : password
  }
  query = administrators.insert_one(queryObject)
  return f'{first} {last} registered with administrator privileges.'

# Find one administrator by id
@app.route('/administrator/<id>', methods=['GET'])
def find_one_administrator(id):
  id_call = {"_id" : ObjectId(id)}
  administrator = administrators.find_one(id_call)
  administrator["_id"] = str(administrator["_id"])
  
  return administrator

# Find all administrators
@app.route('/administrators/', methods=['GET'])
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
def update_one_administrator(id):
  request_params = request.get_json()
  updateObject = request_params
  id = ObjectId(id)
  id_call = {"_id" : id}

  result = administrators.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'{result["first"]} {result["last"]}\'s information updated {updateObject}'

# Delete one administrator 
@app.route('/delete-administrator/<id>', methods=['DELETE'])
def delete_one_administrator(id):
  id_call = {"_id":ObjectId(id)}


  result = administrators.find_one_and_delete(id_call)
  return f'Administrator removed from database.'

if __name__ == '__main__':
  app.run(debug=True)