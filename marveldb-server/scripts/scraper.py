# Collects data from the API and converts into usable data structure

#!/usr/bin/env python

import requests

base_endpoint = 'https://gateway.marvel.com:443/v1/public'
ts = 1
api_key = 'e2eb967207552957b687e3cbcb0fe59c'
md5_hash = 'dd9c74d4de8ba81cff5e7a2fd80838f2'

def scrape_characters(limit, offset):
	get_chars_endpoint = base_endpoint + '/characters'
	params = {
		'ts': ts,
		'apikey': api_key,
		'hash': md5_hash,
		'limit': limit,
		'offset': offset
	}
	char_response = requests.get(get_chars_endpoint, params)
	return character_pipe(char_response.json())

# converts dict into schema
def character_pipe(chars_json):
	chars_list = chars_json['data']['results']

	table = []
	assoc_table = []
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

		### insert into association table
		for comic in char['comics']['items']:
			assoc_row = {
				'char_id': None,
				'comic_id': None
			}

			assoc_row['char_id'] = char['id']
			assoc_row['comic_id'] = strip_id(comic['resourceURI'])
			assoc_table.append(assoc_row)

	return table, assoc_table

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
		for url in comic['urls']:
			url_type = url['type']
			url_str = url['url']
			if url_type == 'detail':
				row['details'] = url_str
		row['series_id'] = strip_id(comic['series']['resourceURI'])
		row['numCharacters'] = comic['characters']['available']
		row['numCreators'] = comic['creators']['available']
		table.append(row)

		### insert image url into image table
		for image in comic['images']:
			image_row = {
				'path': None,
				'extension': None,
				'comic_id': None
			}

			image_row['path'] = image['path']
			image_row['extension'] = image['extension']
			image_row['comic_id'] = comic['id']
			image_table.append(image_row)

	return table, image_table

def strip_id(uri):
	id = uri.rsplit('/')[-1]
	if id == '':
		return 0
	return id

if __name__ == '__main__':
	print(scrape_characters(20, 0))
