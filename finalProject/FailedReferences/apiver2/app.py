from flask import Flask, request, redirect
import requests
import pymongo

mongo = pymongo.MongoClient("mongodb+srv://JapanCodeMan:6yGkgNvnhwU8WlDp@cluster0.b1d3f.mongodb.net/letsgovocab?retryWrites=true&w=majority")

db = pymongo.database.Database(mongo, 'letsgovocab')
admin = mongo.collections.Collections(db, 'admin')
cards = mongo.collections.Collections(db, 'cards')
instructors = mongo.collection.Collection(db, 'instructors')
students = mongo.collection.Collection(db, 'students')

app = Flask(__name__)

@app.route('/', methods=['GET'])
def test():
    return mongo.db.list_collection_names()

if __name__ == '__main__':
    app.run(debug=True)
