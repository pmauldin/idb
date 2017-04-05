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
def character_pipe(char_json):
	char_list = char_json['data']['results']

	table = []
	for char in char_list:
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

if __name__ == '__main__':
	print(scrape_characters(20, 0))
