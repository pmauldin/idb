from flask import Flask, jsonify
from data_machine import characters_data, comics_data, creators_data, series_data
from flask_cors import CORS
from query import query

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/characters', methods = ['GET'])
def characters():
	if 'id' in request.args:
		id = request.args['id']
	if 'limit' in request.args:
		limit = request.args['limit']

	# Get characters data from database (tuple, form)
	# char_json = query("characters", id, limit)
	
	char_json = characters_data()
	return jsonify(char_json)

@app.route('/api/comics', methods = ['GET'])
def comics():
	if 'id' in request.args:
		id = request.args['id']
	if 'limit' in request.args:
		limit = request.args['limit']

	# Get comics data from database (tuple, form)
	# comics_json = query("comics", id, limit)

	comics_json = comics_data()
	return jsonify(comics_json)

@app.route('/api/creators', methods = ['GET'])
def creators():
	if 'id' in request.args:
		id = request.args['id']
	if 'limit' in request.args:
		limit = request.args['limit']

	# Get creators data from database (tuple, form)
	# creators_json = query("creators", id, limit)

	creators_json = creators_data()
	return jsonify(creators_json)

@app.route('/api/series', methods = ['GET'])
def series():
	if 'id' in request.args:
		id = request.args['id']
	if 'limit' in request.args:
		limit = request.args['limit']

	# Get series data from database (tuple, form)
	# series_json = query("series", id, limit)

	series_json = series_data()
	return jsonify(series_json)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
