# Collects data from the API and converts into usable data structure

#!/usr/bin/env python

import requests

base_endpoint = 'https://gateway.marvel.com:443/v1/public'
ts = 1
api_key = 'e2eb967207552957b687e3cbcb0fe59c'
md5_hash = 'dd9c74d4de8ba81cff5e7a2fd80838f2'

### scrape tables

def scrape_characters(pipe, limit, offset):
	get_chars_endpoint = base_endpoint + '/characters'
	params = {
		'ts': ts,
		'apikey': api_key,
		'hash': md5_hash,
		'limit': limit,
		'offset': offset
	}
	char_response = requests.get(get_chars_endpoint, params)
	if pipe == 0:
		data = character_pipe(char_response.json())
	elif pipe == 1:
		data = chars_comics_pipe(char_response.json())
	elif pipe == 2:
		data = chars_series_pipe(char_response.json())

	return data

# converts dict into schema
def character_pipe(chars_json):
	chars_list = chars_json['data']['results']

	table = []
	for char in chars_list:
		row = {
			'id': None,
			'name': None,
			'description': None,
			'thumbnail': None,
			'details': None,
			'wiki': None,
			'comicsUrl': None,
			'numComics': None,
			'numSeries': None
		}

		row['id'] = char['id']
		row['name'] = char['name']
		row['description'] = char['description']
		row['thumbnail'] = char['thumbnail']['path'] + "." + char['thumbnail']['extension']
		for url in char['urls']:
			url_type = url['type']
			url_str = url['url']

			if url_type == 'detail':
				row['details'] = url_str
			elif url_type == 'wiki':
				row['wiki'] = url_str
			elif url_type == 'comiclink':
				row['comicsUrl'] = url_str
		row['numComics'] = char['comics']['available']
		row['numSeries'] = char['series']['available']
		table.append(row)

	return table

def scrape_comics(limit, offset):
	get_comics_endpoint = base_endpoint + '/comics'
	params = {
		'ts': ts,
		'apikey': api_key,
		'hash': md5_hash,
		'limit': limit,
		'offset': offset
	}
	comics_response = requests.get(get_comics_endpoint, params)
	return comics_pipe(comics_response.json())

# converts dict into schema
def comics_pipe(comics_json):
	comics_list = comics_json['data']['results']

	table = []
	image_table = []
	for comic in comics_list:
		row = {
			'id': None,
			'title': None,
			'issueNumber': None,
			'description': None,
			'format': None,
			'pageCount': None,
			'printPrice': None,
			'digitalPrice': None,
			'dateReleased': None,
			'thumbnail': None,
			'images': None,
			'details': None,
			'series_id': None,
			'numCharacters': None,
			'numCreators': None
		}

		row['id'] = comic['id']
		row['title'] = comic['title']
		row['issueNumber'] = comic['issueNumber']
		row['description'] = comic['description']
		row['format'] = comic['format']
		row['pageCount'] = comic['pageCount']
		for price in comic['prices']:
			price_type = price['type']
			price_value = price['price']
			if price_type == 'printPrice':
				row['printPrice'] = price_value
			elif price_type == 'digitalPurchasePrice':
				row['digitalPrice'] = price_value
		for date in comic['dates']:
			date_type = date['type']
			date_value = date['date']
			if date_type == 'onsaleDate':
				row['dateReleased'] = date_value
		row['thumbnail'] = comic['thumbnail']['path'] + "." + comic['thumbnail']['extension']
		images = ''
		for image in comic['images']:
			path = image['path']
			ext = image['extension']
			full = path + '.' + ext
			if image != comic['images'][-1]:
				full += ','
			images += full
		row['images'] = images
		for url in comic['urls']:
			url_type = url['type']
			url_str = url['url']
			if url_type == 'detail':
				row['details'] = url_str
		row['series_id'] = strip_id(comic['series']['resourceURI'])
		row['numCharacters'] = comic['characters']['available']
		row['numCreators'] = comic['creators']['available']
		table.append(row)

	return table

def scrape_series(limit, offset):
	get_series_endpoint = base_endpoint + '/series'
	params = {
		'ts': ts,
		'apikey': api_key,
		'hash': md5_hash,
		'limit': limit,
		'offset': offset
	}
	series_response = requests.get(get_series_endpoint, params)
	return series_pipe(series_response.json())

# converts dict into schema
def series_pipe(series_json):
	series_list = series_json['data']['results']

	table = []
	for series in series_list:
		row = {
			'id': None,
			'title': None,
			'description': None,
			'startYear': None,
			'endYear': None,
			'rating': None,
			'thumbnail': None,
			'details': None,
			'predecessor': None,
			'successor': None,
			'series_id': None,
			'numCharacters': None,
			'numCreators': None
		}

		row['id'] = series['id']
		row['title'] = series['title']
		row['description'] = series['description']
		row['startYear'] = series['startYear']
		row['endYear'] = series['endYear']
		row['rating'] = series['rating']
		if series['thumbnail'] != None:
			row['thumbnail'] = series['thumbnail']['path'] + "." + series['thumbnail']['extension']
		for url in series['urls']:
			url_type = url['type']
			url_str = url['url']
			if url_type == 'detail':
				row['details'] = url_str
		if series['previous'] != None:
			row['predecessor'] = strip_id(series['previous']['resourceURI'])
		if series['next'] != None:
			row['successor'] = strip_id(series['next']['resourceURI'])
		row['numCharacters'] = series['characters']['available']
		row['numCreators'] = series['creators']['available']
		table.append(row)

	return table

### scrape association tables

def chars_comics_pipe(chars_json):
	chars_list = chars_json['data']['results']

	### chars_comics table
	chars_comics_table = []
	for char in chars_list:
		for comic in char['comics']['items']:
			assoc_row = {
				'char_id': None,
				'comic_id': None
			}

			assoc_row['char_id'] = char['id']
			assoc_row['comic_id'] = strip_id(comic['resourceURI'])
			chars_comics_table.append(assoc_row)

	return chars_comics_table

def chars_series_pipe(chars_json):
	chars_list = chars_json['data']['results']

	### chars_series table
	chars_series_table = []
	for char in chars_list:
		for series in char['series']['items']:
			assoc_row = {
				'char_id': None,
				'series_id': None
			}

			assoc_row['char_id'] = char['id']
			assoc_row['series_id'] = strip_id(series['resourceURI'])
			chars_series_table.append(assoc_row)

	return chars_series_table

### helper functions

def strip_id(uri):
	id = uri.rsplit('/')[-1]
	if id == '':
		return 0
	return id

if __name__ == '__main__':
	print(scrape_characters(20, 0))
