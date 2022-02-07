from flask import Flask, jsonify, make_response, request
from bson.objectid import ObjectId
from bson.json_util import dumps
from bson import json_util
from flask_cors import CORS
from itsdangerous import json
from numpy import False_
import pymongo



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

# List all instructors - WORKING!!! - but would like to get _id value back as well
@app.route('/instructors/', methods=['GET'])
def find_all_instructors():
  results = instructors.find()
  output = {}
  i = 0
  # for result in results:
  #   output[i] = result
  #   if output.keys[i] == ('_id'):
  #     output[i] = ObjectId(output[i])
  #     i += 1
  #   else:
  #     i += 1
  # return jsonify(output)

  for result in results:
    output[i] = result
    output[i].pop('_id')
    i += 1
  return jsonify(output)

# TODO - add ability to search by <id>?
# Find one instructor - Working, but is this the correct way?
@app.route('/instructor/<tag>/<value>/', methods=['GET'])
def find_one_instructor(tag, value):
  queryObject = {tag : value}
  result = instructors.find_one(queryObject)
  result.pop('_id')
  return jsonify(result)

# Update one instructor 
@app.route('/instructor/<id>/<newtag>/<newvalue>/', methods=['PATCH'])
def update_one_instructor(id, newtag, newvalue):
  id = ObjectId(id)
  updateObject = {newtag : newvalue}
  result = instructors.find_one_and_update("_id": id, {"$set":updateObject})
  return 'Instructor information updated'

# Delete one instructor
@app.route('/delete-instructor/<id>', methods=['DELETE'])
def delete_one_instructor(id):
  id = instructors.delete_one({'_id':ObjectId(id)})
  return 'Instructor deleted'

# Delete entire instructor document 
@app.route('/delete-all-instructors/', methods=['DELETE'])
def delete_all_instructors():
  result = instructors.delete_many({})
  return 'Instructor table dropped'

# TODO - students CRUD
# Register a new student 
@app.route('/register-student/', methods=['POST'])
def register_one_student():
  first = request.json.get("first")
  last = request.json.get("last")
  email = request.json.get("email")
  course = request.json.get("course")
  password = request.json.get("password")

  queryObject = {
    "first": first,
    "last": last,
    "role": "Student",
    "email": email,
    "course": course,
    "password": password
  }
  query = students.insert_one(queryObject)
  return f'{first} {last} registered to student database.'

# Dunno why, but this works - TODO - figure it out
@app.route('/student/<id>', methods=['GET'])
def get_student(id):
  student = students.find_one({'_id':ObjectId(id)})
  return make_response(json_util.dumps({"students":student}))
 
# List all students 
@app.route('/students/', methods=['GET'])
def find_all_students():
  results = students.find()
  output = {}
  i = 0
  for result in results:
    output[i] = result
    output[i].pop('_id')
    i += 1
  return jsonify(output)

# Find one student 
@app.route('/student/', methods=['GET'])
def find_one_student(tag, value):
  queryObject = {tag : value}
  result = students.find_one(queryObject)
  result.pop('_id')
  return jsonify(result)

# Update one student 
@app.route('/update-student/<tag>/<value>/<newtag>/<newvalue>', methods=['PATCH'])
def update_one_student(tag, value, newtag, newvalue):
  queryObject = {tag : value}
  updateObject = {newtag : newvalue}
  result = students.update_one(queryObject, {"$set":updateObject})
  return 'Student information updated'

# Delete one student 
@app.route('/delete-student/', methods=['DELETE'])
def delete_one_student(id):
  id = request.json.get(ObjectId('_id'))
  result = students.delete_one(id)
  return 'Student deleted'

# Delete entire student document 
@app.route('/delete-all-students/', methods=['DELETE'])
def delete_all_students():
  queryObject = {}
  result = students.delete_many({})
  return 'Student table dropped'

# TODO - cards CRUD

# Create one new card with associated course 
@app.route('/create-card/', methods=['POST'])
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

# Create many cards - TODO test with Postman
@app.route('/create-cards/', methods=['PUT'])
def create_cards(course):
  cards_list = request.json.get('cards_list')
  result = cards.insert_many(cards_list)
  return 'Multiple cards uploaded'

# TODO - admin CRUD

# Register a new admin - WORKING!!!
@app.route('/register-admin/<first>/<last>/<email>/', methods=['GET'])
def register_one_admin(first, last, email):
  queryObject = {
    'first': first,
    'last': last,
    'role': 'Admin',
    'email': email,
  }
  query = admin.insert_one(queryObject)
  return f'{first} {last} and associated data registered to Administrator database'

if __name__ == '__main__':
  app.run(debug=True)