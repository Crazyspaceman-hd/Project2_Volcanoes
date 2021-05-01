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
    vol_sample = {"volcano_1": "large"}
    return render_template('index.html', vol_sample=vol_sample)




@app.route('/api/volcanoes', methods=['GET'])
def get_volcanoes():

    volcano_data = db.Volcanoes.find({},{'_id':0}) 
    
    return jsonify(list(volcano_data)) 


@app.route('/api/vei', methods=['GET'])
def get_vei():

    vei_data = db.volcanoes_vei.find({},{'_id':0}) 
    
    return jsonify(list(vei_data))

@app.route('/api/years', methods=['GET'])
def get_years():

    years = db.years.find({},{'_id':0}) 
    
    return jsonify(list(years))


if __name__ == '__main__':
    app.run(debug=True)
