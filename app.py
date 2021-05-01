from flask import Flask, render_template
from flask import jsonify
from flask import request
import pymongo



from pymongo import MongoClient
import json


username = 'vulcan'
password = '4fhXGrbneWwY1fTX'

client = pymongo.MongoClient(f"mongodb+srv://{username}:{password}@cluster0.ilrpi.mongodb.net/Volcanoes?retryWrites=true&w=majority")
db = client.Volcanoes



app = Flask(__name__)



@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')



@app.route('/api/volcanoes', methods=['GET'])
def get_volcanoes():

    volcano_data = db.Volcanoes.find({},{'_id':0}) 
    
    return jsonify(list(volcano_data)) 


if __name__ == '__main__':
    app.run(debug=True)
