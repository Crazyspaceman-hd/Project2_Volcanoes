from flask import Flask, render_template
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
import pymongo
from bson.json_util import dumps
# from flask_cors import CORS
from pymongo import MongoClient
import urllib

import json


username = 'vulcan'
password = '4fhXGrbneWwY1fTX'

client = pymongo.MongoClient("mongodb+srv://" + username + ":" + password + "@cluster0.ilrpi.mongodb.net/Volcanoes?retryWrites=true&w=majority")
# client = pymongo.MongoClient("mongodb+srv://" + username + ":" + password + "@cluster0.ilrpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


# db = client.volcanoes


# print(db)
# collection = db.volcanoes
# print(collection)



# volcanoes = db.volcanoes.find()
# for volcano in volcanoes:
#     print(volcano)

# @app.route("/jsonified")
# def jsonified():
#     return jsonify(volcanoes)
#     # return jsonify(volcano)




app = Flask(__name__)



@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')



# db = pymongo.database.Database(client, 'Volcanoes')
# col = pymongo.collection.Collection(db, 'Volcanoes')
# col_results = json.loads(dumps(col.find().limit(5).sort("time", -1)))



@app.route('/', methods=['GET'])
def get_volcanoes():
    db = client.get_database('volcanoes') #connect to database
    volcano_data = db.volcanoes.find() #get volcanoes collection data

    response = [] #initialize list of data to jsonify
    for volcano in volcano_data:
        # volcano['_id'] = str(member['_id']) #convert mongodb ID to string to change object datatype
        response.append(volcano)
    
    return jsonify(response) #display API


# @app.route('/', methods=['GET'])
# def get_volcanoes():
#   volcano = mongo.db.volcanoes
#   output = []
#   for v in volcano.find():
#     output.append({'name' : v['volcano_name'], 'country' : v['country'], 'latitude' : v['latitude']})
#   return jsonify({'result' : output})



if __name__ == '__main__':
    app.run(debug=True)
