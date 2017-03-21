from flask import Flask, jsonify
from data_machine import characters_data, comics_data, creators_data, series_data

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/characters', methods = ['GET'])
def characters():
	char_json = characters_data()
	return jsonify(char_json)

@app.route('/comics', methods = ['GET'])
def comics():
	comics_json = comics_data()
	return jsonify(comics_json)

@app.route('/creators', methods = ['GET'])
def creators():
	creators_json = creators_data()
	return jsonify(creators_json)

@app.route('/series', methods = ['GET'])
def series():
	series_json = series_data()
	return jsonify(series_json)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
