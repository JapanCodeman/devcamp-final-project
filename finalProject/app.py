from flask import Flask, jsonify, request
from flask_cors import CORS
import pymongo

CONNECTION_URL = "mongodb+srv://JapanCodeMan:6yGkgNvnhwU8WlDp@cluster0.b1d3f.mongodb.net/letsgovocab?retryWrites=true&w=majority"
app = Flask(__name__)
client = pymongo.MongoClient(CONNECTION_URL)

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
@app.route('/register-instructor/<first>/<last>/<email>/<course>/', methods=['GET'])
def register_one_instructor(first, last, email, course):
  queryObject = {
    'first': first,
    'last': last,
    'role': 'Instructor',
    'email': email,
    'course': course
  }
  query = instructors.insert_one(queryObject)
  return f'{first} {last} and associated data registered to Instructor database'

# List all instructors - WORKING!!! - don't really understand for loop reason
@app.route('/instructors/', methods=['GET'])
def find_all_instructors():
  results = instructors.find()
  output = {}
  i = 0
  for result in results:
    output[i] = result
    output[i].pop('_id')
    i += 1
  return jsonify(output)

# Find one instructor - WORKING!!!
@app.route('/instructor/<tag>/<value>/')
def find_one_instructor(tag, value):
  queryObject = {tag : value}
  result = instructors.find_one(queryObject)
  result.pop('_id')
  return jsonify(result)

# Update one instructor - NOT WORKING!!! - how to put in the $set to the code?
@app.route('/instructor/<tag>/<value>/<newtag>/<newvalue>')
def update_one_instructor(tag, value, newtag, newvalue):
  queryObject = {tag : value}
  updateObject = {newtag : newvalue}
  result = instructors.update_one({queryObject}, {"$set":{updateObject}})
  return 'Instructor information updated'

# Delete one instructor - WORKING!!!
@app.route('/delete-instructor/<tag>/<value>/')
def delete_one_instructor(tag, value):
  queryObject = {tag : value}
  result = instructors.delete_one(queryObject)
  return 'Instructor deleted'

# Delete entire instructor document
@app.route('/delete-all-instructors/')
def delete_all_instructors():
  queryObject = {}
  result = instructors.delete_many({})
  return 'Instructor table dropped'

# TODO - students CRUD
# Register a new student - WORKING!!!
@app.route('/register-student/<first>/<last>/<email>/<course>/', methods=['GET'])
def register_one_student(first, last, email, course):
  queryObject = {
    'first': first,
    'last': last,
    'role': 'Student',
    'email': email,
    'course': course
  }
  query = students.insert_one(queryObject)
  return f'{first} {last} and associated data registered to Student database'

# List all students - WORKING!!!
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

# Find one student - WORKING!!!
@app.route('/student/<tag>/<value>/')
def find_one_student(tag, value):
  queryObject = {tag : value}
  result = students.find_one(queryObject)
  result.pop('_id')
  return jsonify(result)

# Update one student - NOT WORKING
@app.route('/student/<tag>/<value>/<newtag>/<newvalue>')
def update_one_student(tag, value, newtag, newvalue):
  queryObject = {tag : value}
  updateObject = {newtag : newvalue}
  result = students.update_one({queryObject}, {"$set":{updateObject}})
  return 'Student information updated'

# Delete one student - WORKING!!!
@app.route('/delete-student/<tag>/<value>/')
def delete_one_student(tag, value):
  queryObject = {tag : value}
  result = students.delete_one(queryObject)
  return 'Student deleted'

# Delete entire student document - WORKING!!!
@app.route('/delete-all-students/')
def delete_all_students():
  queryObject = {}
  result = students.delete_many({})
  return 'Student table dropped'

# TODO - cards CRUD

# Create one new card with associated course
@app.route('/create-card/<course>/<lang1>/<lang2>/')
def create_card(course, lang1, lang2):
  queryObject = {
    'course': course,
    'front': lang1,
    'back': lang2
  }
  result = cards.insert_one(queryObject)
  return f'{lang1}/{lang2} card created for course: {course}'

# Create many cards - TODO test with Postman
@app.route('/create-cards/<course>/<cards>/')
def create_cards(course, cards):
  cards = [{}]
  queryObject = {
    'course': course,
    'cards': cards
  }
  result = cards.insert_many(queryObject)
  return 'Multiple cards uploaded'

# TODO - admin CRUD

if __name__ == '__main__':
  app.run(debug=True)