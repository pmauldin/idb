from flask import Flask, jsonify
from data_machine import characters_data, comics_data, creators_data, series_data
from flask_cors import CORS
from query import *

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/characters', methods = ['GET'])
def characters():
	# char_json = query_chars(('id', '1009262'), ('id', 'DESC'), ('10', '0'))
	char_json = query_all_chars()
	# char_json = characters_data()
	return jsonify(char_json)

@app.route('/api/characters/count', methods = ['GET'])
def characters_count():

@app.route('/api/comics', methods = ['GET'])
def comics():
	comics_json = query_all_comics()
	# comics_json = comics_data()
	return jsonify(comics_json)

@app.route('/api/comics/count', methods = ['GET'])
def comics_count():

@app.route('/api/creators', methods = ['GET'])
def creators():
	creators_json = query_creators(('id', '30'), ('id', 'DESC'), ('10', '0'))
	# creators_json = query_all_creators()
	# creators_json = creators_data()
	return jsonify(creators_json)

@app.route('/api/creators/count', methods = ['GET'])
def creators_count():

@app.route('/api/series', methods = ['GET'])
def series():
	series_json = query_series(('id', '20443'), ('id', 'DESC'), ('10', '0'))
	# series_json = series_data()
	return jsonify(series_json)

@app.route('/api/series/count', methods = ['GET'])
def series_count():

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
