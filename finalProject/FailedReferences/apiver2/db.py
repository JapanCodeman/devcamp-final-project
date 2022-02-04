import pymongo

mongo = pymongo.MongoClient("mongodb+srv://JapanCodeMan:6yGkgNvnhwU8WlDp@cluster0.b1d3f.mongodb.net/letsgovocab?retryWrites=true&w=majority")

db = pymongo.database.Database(mongo, 'letsgovocab')
admin = pymongo.collections.Collections(db, 'admin')
cards = pymongo.collections.Collections(db, 'cards')
instructors = pymongo.collection.Collection(db, 'instructors')
students = pymongo.collection.Collection(db, 'students')
