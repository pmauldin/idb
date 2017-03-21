from flask import Flask, jsonify
from data_machine import characters_data, comics_data, creators_data, series_data
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}});

@app.route('/api/characters', methods = ['GET'])
def characters():
	char_json = characters_data()
	return jsonify(char_json)

@app.route('/api/comics', methods = ['GET'])
def comics():
	comics_json = comics_data()
	return jsonify(comics_json)

@app.route('/api/creators', methods = ['GET'])
def creators():
	creators_json = creators_data()
	return jsonify(creators_json)

@app.route('/api/series', methods = ['GET'])
def series():
	series_json = series_data()
	return jsonify(series_json)

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
