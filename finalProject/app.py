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

# define cluster with password entered - DO NOT DEPLOY THIS WAY!!! Password will be visible
# also, replace "MyFirstDatabase" with your database name (here, "PyMongo_Test")
cluster = "mongodb+srv://JapanCodeMan:6yGkgNvnhwU8WlDp@cluster0.b1d3f.mongodb.net/PyMongo_Test?retryWrites=true&w=majority"
client = MongoClient(cluster)

# prints list of all databases on this client - PyMongo_Test, test, admin, local
print(client.list_database_names())

# sets the database to be "PyMongo_Test" on the client
db = client.PyMongo_Test


print(db.list_collection_names())


Instructors = db.Instructors

# Assign new instructor to 
# New_Instructor = {
#         "user_id" : 2,
#         "role" : "Instructor",
#         "email" : "instructor@bottega.com",
#         "course" : "Math"
#     }

# result = Instructors.insert_one(New_Instructor)

# TODO - create a database with the following collections: instructors, students, cards, admin
# TODO - define a series of functions to CRUD these various collections using PyMongo syntax
# TODO - wrap flask around this entire app to give it api functionality
# TODO - how to do all of this in pipenv?? 