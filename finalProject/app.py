# from flask import Flask
# app = Flask(__name__)
# @app.route('/')
# def flask_mongodb_atlas():
#     return "flask mongodb atlas!"

# if __name__ == '__main__':
#     app.run(port=8000)

# from db import *
# #test to insert data to the data base

# @app.route("/test")
# def test():
#     db.db.Instructors.insert_one({
#         "user_id" : 2,
#         "role" : "Instructor",
#         "email" : "instructor@bottega.com",
#         "course" : "Math"
#     })
#     return "Connected to the data base!"


# import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId

# define cluster with password entered - DO NOT DEPLOY THIS WAY!!! Password will be visible
# also, replace "MyFirstDatabase" with your database name (here, "PyMongo_Test")
cluster = "mongodb+srv://JapanCodeMan:6yGkgNvnhwU8WlDp@cluster0.b1d3f.mongodb.net/PyMongo_Test?retryWrites=true&w=majority"
client = MongoClient(cluster)

# prints list of all databases on this client - PyMongo_Test, test, admin, local
# print(client.list_database_names())

# sets the database to be "PyMongo_Test" on the client
db = client.letsgovocab
instructors = db.instructors
students = db.students
cards = db.cards
admin = db.admin


print(db.list_collection_names())


# Add one user to a collection - need to work on this; making "role" optional... *args?
def insert_new_user_to_collection(collection, user_id, *role, email, course):
    if collection == instructors:
        new_user = {
            "user_id" : user_id,
            "role" : "Instructor",
            "email" : email,
            "course" : course
        }
        create = collection.insert_one(new_user)    
    elif collection == students:
        new_user = {
            "user_id" : user_id,
            "role" : "Student",
            "email" : email,
            "course" : course
        }
        create = collection.insert_one(new_user)
    elif collection == admin:
        new_user = {
            "user_id" : user_id,
            "role" : role,
            "email" : email,
            "course" : course
        }
        create = collection.insert_one(new_user)
    else:
        return("Inserting improper data into cards collection")

# insert_new_user_to_collection(instructors, 1, "Instructor", "jordanhughes@uni.com", "Analytics")
# insert_new_user_to_collection(instructors, 2, "Instructor", "maywest@uni.com", "Analytics")
# insert_new_user_to_collection(instructors, 3, "Instructor", "cathybates@uni.com", "Communication")
# insert_new_user_to_collection(students, 1, "Student", "williamtell@students.uni.com", "Analytics")
# insert_new_user_to_collection(students, 2, "Student", "giffordlee@students.uni.com", "Communication")

# Find one document in a given collection
def find_one_document(collection, tag, term):
    if tag == "_id":
        result = collection.find_one({tag : ObjectId(term)})
    else:
        result = collection.find_one({tag : term})
    print(result)

# find_one_document(instructors, "_id", "61fa47ab9e9f9433312524d8")

# Find all documents that match search terms - for loop prevents cursor object
def find_all_documents(collection, tag, term):
    results = collection.find({tag : term})
    for result in results:
        print(result)
find_all_documents(instructors, "course", "Analytics")

# Count documents in a collection
def count_documents(collection, tag, term):
    result = collection.count_documents({tag : term})
    print(result)

# Delete a document in a collection
def delete_document(collection, tag, term):
    if tag == "_id":
        result = collection.delete_one({tag : ObjectId(term)})
    else:
        result = collection.delete_one({tag : term})

# Delete an entire collection - warning
def delete_collection(collection):
    confirm = input(f'YOU ARE ABOUT TO DELETE ALL RECORDS IN {str(collection)}! PROCEED? Y/N')
    if confirm.lower() == "y":
        result = collection.delete_many({})
    else:
        print(f'Delete {collection} aborted')
        
# Update a record -- PICK UP HERE TOMORROW
def update_document(collection, oldinfo, newinfo):
    result = collection.update_one(oldinfo, "$set:" + newinfo)

update_document(students, {"email":"giffordlee@students.uni.com"}, {"email":"leegifford@students.uni.com"})

# TODO - create a database with the following collections: instructors, students, cards, admin
# TODO - define a series of functions to CRUD these various collections using PyMongo syntax
# TODO - wrap flask around this entire app to give it api functionality
# TODO - how to do all of this in pipenv?? 