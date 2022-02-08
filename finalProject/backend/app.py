from flask import Flask, jsonify, make_response, Response, request
from bson.objectid import ObjectId
from bson.json_util import dumps
from bson import json_util
from flask_cors import CORS
from itsdangerous import json
import pymongo
from pymongo import ReturnDocument

CONNECTION_URL = "mongodb+srv://JapanCodeMan:6yGkgNvnhwU8WlDp@cluster0.b1d3f.mongodb.net/letsgovocab?retryWrites=true&w=majority"
app = Flask(__name__)

try:
  client = pymongo.MongoClient(CONNECTION_URL, serverSelectionTimeoutMS = 2000)

except:
  print("Error - cannot connect to database")

Database = client.get_database('letsgovocab')

instructors = Database.instructors
students = Database.students
cards = Database.cards
admin = Database.admin

# TODO - Password hashing - bcrypt or werzeug


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

  queryObject = {
    "first": first,
    "last": last,
    "role": "Instructor",
    "email": email,
    "course": course,
    "password": password 
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

# TODO - add ability to search by <id>?
# Find all instructors that match criteria - TODO only returns first result
@app.route('/instructors/<tag>/<value>/', methods=['GET'])
def find_one_instructor(tag, value):
  queryObject = {tag : value}
  results = instructors.find(queryObject)
  for result in results:
    result.pop('_id')
  return jsonify(result)

# Update one instructor - WORKING!!!
@app.route('/update-instructor/<id>', methods=['PATCH'])
def update_one_instructor(id):
  id = ObjectId(id)
  id_call = {"_id" : id}
  request_params = request.get_json()
  updateObject = request_params

  result = instructors.find_one_and_update(id_call, {"$set":updateObject}, return_document=ReturnDocument.AFTER)
  return f'Instructor information updated {updateObject}'

# Delete one instructor - WORKING!!!
@app.route('/delete-instructor/<id>', methods=['DELETE'])
def delete_one_instructor(id):
  id = ObjectId(id)
  id_call = {"_id" : id}
  id = instructors.delete_one(id_call)
  return 'Instructor deleted'

# Delete entire instructor document 
@app.route('/delete-all-instructors/', methods=['DELETE'])
def delete_all_instructors():
  result = instructors.delete_many({})
  return 'Instructor table dropped'

# TODO - students CRUD
# Register a new student - WORKING!!!
@app.route('/register-student', methods=['POST'])
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

# Dunno why, but this works - TODO - figure it out
# Returns only in a list... not "pretty"
@app.route('/student/<id>', methods=['GET'])
def get_student(id):
  student = students.find_one({'_id':ObjectId(id)})
  return Response(json_util.dumps({"students":student}))
 
# List all students - Working!!!
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
  return f'Student information updated {updateObject}'

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
# Create one new card with associated course 
@app.route('/create-card', methods=['POST'])
def create_card(course, lang1, lang2, box_number=0, guessed_correctly=False):
  course = request.json.get('course')
  lang1 = request.json.get('lang1')
  lang2 = request.json.get('lang2')
  queryObject = {
    'course': course,
    'front': lang1,
    'back': lang2,
    'box_number': box_number,
    'guessed_correctly': guessed_correctly
  }
  result = cards.insert_one(queryObject)
  return f'{lang1}/{lang2} card created for course: {course}'

# Create many cards - WORKING!!!
@app.route('/create-cards', methods=['PUT'])
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
# TODO - admin CRUD
# Register a new administrator - WORKING!!!
@app.route('/register-admin', methods=['POST'])
def register_one_admin():
  first = request.json.get("first")
  last = request.json.get("last")
  email = request.json.get("email")
  course = request.json.get("course")
  password = request.json.get("password")

  queryObject = {
    "first" : first,
    "last" : last,
    "email" : email,
    "role" : "Administrator",
    "password" : password
  }
  query = admin.insert_one(queryObject)
  return f'{first} {last} registered with administrator privileges.'

if __name__ == '__main__':
  app.run(debug=True)