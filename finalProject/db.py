from flask import Flask
from flask_pymongo import pymongo
from app import app
CONNECTION_STRING = "mongodb+srv://JapanCodeMan:ed6cgR-m/nsT49Q@cluster0.b1d3f.mongodb.net/PyMongo_Test?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('PyMongo_Test')
Instructors = pymongo.collections.Collections(db, 'Instructors')