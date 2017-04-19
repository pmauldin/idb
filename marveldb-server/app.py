import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from query import *

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/characters', methods = ['GET'])
def characters():
	char_json = {}

	pagination = json.loads(request.args['pagination'])
	lim = pagination['pageSize']
	off = pagination['page']
	sort_options = json.loads(request.args['sortOptions'])
	att = sort_options['field']
	seq = sort_options['order']
	filter_options = json.loads(request.args['filterOptions'])

	if not filter_options:
		char_json = query_all_chars((att, seq), (lim, off))
	else:
		char_json = query_chars(filter_options, (att, seq), (lim, off))

	return jsonify(char_json)

@app.route('/api/characters/count', methods = ['GET'])
def characters_count():
	return jsonify(count_chars())

@app.route('/api/comics', methods = ['GET'])
def comics():
	comics_json = {}

	pagination = json.loads(request.args['pagination'])
	lim = pagination['pageSize']
	off = pagination['page']
	sort_options = json.loads(request.args['sortOptions'])
	att = sort_options['field']
	seq = sort_options['order']
	filter_options = json.loads(request.args['filterOptions'])

	if not filter_options:
		comics_json = query_all_comics((att, seq), (lim, off))
	else:
		comics_json = query_comics(filter_options, (att, seq), (lim, off))

	return jsonify(comics_json)

@app.route('/api/comics/count', methods = ['GET'])
def comics_count():
	return jsonify(count_comics())

@app.route('/api/creators', methods = ['GET'])
def creators():
	creators_json = {}

	pagination = json.loads(request.args['pagination'])
	lim = pagination['pageSize']
	off = pagination['page']
	sort_options = json.loads(request.args['sortOptions'])
	att = sort_options['field']
	seq = sort_options['order']
	filter_options = json.loads(request.args['filterOptions'])

	if not filter_options:
		creators_json = query_all_creators((att, seq), (lim, off))
	else:
		creators_json = query_creators(filter_options, (att, seq), (lim, off))

	return jsonify(creators_json)

@app.route('/api/creators/count', methods = ['GET'])
def creators_count():
	return jsonify(count_creators())

@app.route('/api/series', methods = ['GET'])
def series():
	series_json = {}

	pagination = json.loads(request.args['pagination'])
	lim = pagination['pageSize']
	off = pagination['page']
	sort_options = json.loads(request.args['sortOptions'])
	att = sort_options['field']
	seq = sort_options['order']
	filter_options = json.loads(request.args['filterOptions'])
	
	if not filter_options:
		series_json = query_all_series((att, seq), (lim, off))
	else:
		series_json = query_series(filter_options, (att, seq), (lim, off))

	return jsonify(series_json)

@app.route('/api/series/count', methods = ['GET'])
def series_count():
	return jsonify(count_series())

@app.route('/api/search', methods = ['GET'])
def search():
	search_terms = json.loads(request.args['searchTerms'])

	

@app.route('/api/tests', methods = ['GET'])
def run_tests():
	# from subprocess import PIPE, run

	# command = ['make', 'tests.tmp']
	# result = run(command, stdout=PIPE, stderr=PIPE, universal_newlines=True, cwd="/home/chlsgong/idb")
	# output = str(result.stdout)

	

	return jsonify(output)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
