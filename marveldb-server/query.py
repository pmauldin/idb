#!/usr/bin/env python
import sqlalchemy
from sqlalchemy.sql import text

def connect(user, password, db, host='104.155.158.51', port=5432):
    # postgresql://user:pass@localhost:5432/marveldb
    url = 'postgresql://{}:{}@{}:{}/{}'
    url = url.format(user, password, host, port, db)

    # The return value of create_engine() is connection object
    con = sqlalchemy.create_engine(url, client_encoding='utf8')

    # Bind the connection to MetaData()
    meta = sqlalchemy.MetaData(bind=con, reflect=True)

    return con, meta

con, meta = connect('charlesgong', 'Charles', 'marveldb')

def query_all_chars(order_by_args = ('id', 'ASC'), limit_args = ('10', 0)):	
	response_data = []

	att, seq = order_by_args
	lim, off = limit_args

	SQL = 'SELECT * \
			FROM characters c \
			ORDER BY "{}" {} \
			LIMIT {} OFFSET {}'
	SQL = SQL.format(att, seq, lim, off * lim)
	query = text(SQL)
	char_results = con.execute(query).fetchall()

	for row in char_results:
		SQL = 'SELECT comic_id \
			FROM comics_characters cc \
			WHERE cc.character_id = {} \
			ORDER BY comic_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		comic_id_results = con.execute(query).fetchall()
		comic_ids = []
		for id_tuple in comic_id_results:
			comic_ids.append(id_tuple[0])

		SQL = 'SELECT series_id \
			FROM series_characters cs \
			WHERE cs.character_id = {} \
			ORDER BY series_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		series_id_results = con.execute(query).fetchall()
		series_ids = []
		for id_tuple in series_id_results:
			series_ids.append(id_tuple[0])

		char_data = {
			'id': row['id'],
			'name': row['name'],
			'description': row['description'],
			'thumbnail': row['thumbnail'],
			'details': row['details'],
			'comicsUrl': row['comicsUrl'],
			'comics': comic_ids,
			'numComics': row['numComics'],
			'series': series_ids,
			'numSeries': row['numSeries']
		}

		response_data.append(char_data)

	return response_data

def query_chars(where_args, order_by_args, limit_args):	
	response_data = []

	att, seq = order_by_args
	lim, off = limit_args

	SQL = 'SELECT *, COUNT(*) OVER () totalRows \
			FROM characters c \
			WHERE ' + build_where_clause(where_args) + \
			' ORDER BY "{}" {} \
			LIMIT {} OFFSET {}'	
	SQL = SQL.format(att, seq, lim, off * lim)
	query = text(SQL)
	char_results = con.execute(query).fetchall()

	count = 0
	for row in char_results:
		count = row['totalrows']

		SQL = 'SELECT comic_id \
			FROM comics_characters cc \
			WHERE cc.character_id = {} \
			ORDER BY comic_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		comic_id_results = con.execute(query).fetchall()
		comic_ids = []
		for id_tuple in comic_id_results:
			comic_ids.append(id_tuple[0])

		SQL = 'SELECT series_id \
			FROM series_characters cs \
			WHERE cs.character_id = {} \
			ORDER BY series_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		series_id_results = con.execute(query).fetchall()
		series_ids = []
		for id_tuple in series_id_results:
			series_ids.append(id_tuple[0])

		char_data = {
			'id': row['id'],
			'name': row['name'],
			'description': row['description'],
			'thumbnail': row['thumbnail'],
			'details': row['details'],
			'comicsUrl': row['comicsUrl'],
			'comics': comic_ids,
			'numComics': row['numComics'],
			'series': series_ids,
			'numSeries': row['numSeries']
		}

		response_data.append(char_data)

	response_json = {
		'count': count,
		'data': response_data 
	}

	return response_json

def query_all_comics(order_by_args = ('id', 'ASC'), limit_args = ('10', 0)):	
	response_data = []

	att, seq = order_by_args
	lim, off = limit_args

	SQL = 'SELECT * \
			FROM comics c \
			ORDER BY "{}" {} \
			LIMIT {} OFFSET {}'
	SQL = SQL.format(att, seq, lim, off * lim)
	query = text(SQL)
	comics_results = con.execute(query).fetchall()

	for row in comics_results:
		SQL = 'SELECT character_id \
			FROM comics_characters cc \
			WHERE cc.comic_id = {} \
			ORDER BY character_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		char_id_results = con.execute(query).fetchall()
		char_ids = []
		for id_tuple in char_id_results:
			char_ids.append(id_tuple[0])

		SQL = 'SELECT creator_id \
			FROM creators_comics cc \
			WHERE cc.comic_id = {} \
			ORDER BY creator_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		creator_id_results = con.execute(query).fetchall()
		creator_ids = []
		for id_tuple in creator_id_results:
			creator_ids.append(id_tuple[0])

		comic_data = {
			'id': row['id'],
			'title': row['title'],
			'issueNumber': row['issueNumber'],
			'description': row['description'],
			'format': row['format'],
			'pageCount': row['pageCount'],
			'printPrice': row['printPrice'],
			'digitalPrice': row['digitalPrice'],
			'dateReleased': row['dateReleased'],
			'thumbnail': row['thumbnail'],
			'images': row['images'],
			'details': row['details'],
			'series': row['series_id'],
			'characters': char_ids,
			'numCharacters': row['numCharacters'],
			'creators': creator_ids,
			'numCreators': row['numCreators']
		}

		response_data.append(comic_data)

	return response_data

def query_comics(where_args, order_by_args, limit_args):	
	response_data = []

	att, seq = order_by_args
	lim, off = limit_args

	SQL = 'SELECT *, COUNT(*) OVER () totalRows \
			FROM comics c \
			WHERE ' + build_where_clause(where_args) + \
			' ORDER BY "{}" {} \
			LIMIT {} OFFSET {}'			
	SQL = SQL.format(att, seq, lim, off * lim)
	query = text(SQL)
	comics_results = con.execute(query).fetchall()

	count = 0
	for row in comics_results:
		count = row['totalrows']

		SQL = 'SELECT character_id \
			FROM comics_characters cc \
			WHERE cc.comic_id = {} \
			ORDER BY character_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		char_id_results = con.execute(query).fetchall()
		char_ids = []
		for id_tuple in char_id_results:
			char_ids.append(id_tuple[0])

		SQL = 'SELECT creator_id \
			FROM creators_comics cc \
			WHERE cc.comic_id = {} \
			ORDER BY creator_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		creator_id_results = con.execute(query).fetchall()
		creator_ids = []
		for id_tuple in creator_id_results:
			creator_ids.append(id_tuple[0])

		comic_data = {
			'id': row['id'],
			'title': row['title'],
			'issueNumber': row['issueNumber'],
			'description': row['description'],
			'format': row['format'],
			'pageCount': row['pageCount'],
			'printPrice': row['printPrice'],
			'digitalPrice': row['digitalPrice'],
			'dateReleased': row['dateReleased'],
			'thumbnail': row['thumbnail'],
			'images': row['images'],
			'details': row['details'],
			'series': row['series_id'],
			'characters': char_ids,
			'numCharacters': row['numCharacters'],
			'creators': creator_ids,
			'numCreators': row['numCreators']
		}

		response_data.append(comic_data)

	response_json = {
		'count': count,
		'data': response_data 
	}

	return response_json

def query_all_creators(order_by_args = ('id', 'ASC'), limit_args = ('10', 0)):	
	response_data = []

	att, seq = order_by_args
	lim, off = limit_args

	SQL = 'SELECT * \
			FROM creators c \
			ORDER BY "{}" {} \
			LIMIT {} OFFSET {}'
	SQL = SQL.format(att, seq, lim, off * lim)
	query = text(SQL)
	creator_results = con.execute(query).fetchall()

	for row in creator_results:
		SQL = 'SELECT comic_id \
			FROM creators_comics cc \
			WHERE cc.creator_id = {} \
			ORDER BY comic_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		comic_id_results = con.execute(query).fetchall()
		comic_ids = []
		for id_tuple in comic_id_results:
			comic_ids.append(id_tuple[0])

		SQL = 'SELECT series_id \
			FROM creators_series cs \
			WHERE cs.creator_id = {} \
			ORDER BY series_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		series_id_results = con.execute(query).fetchall()
		series_ids = []
		for id_tuple in series_id_results:
			series_ids.append(id_tuple[0])

		creator_data = {
			'id': row['id'],
			'fullName': row['fullName'],
			'thumbnail': row['thumbnail'],
			'details': row['details'],
			'comics': comic_ids,
			'numComics': row['numComics'],
			'series': series_ids,
			'numSeries': row['numSeries']
		}

		response_data.append(creator_data)

	return response_data

def query_creators(where_args, order_by_args, limit_args):	
	response_data = []

	att, seq = order_by_args
	lim, off = limit_args

	SQL = 'SELECT *, COUNT(*) OVER () totalRows \
			FROM creators c \
			WHERE ' + build_where_clause(where_args) + \
			' ORDER BY "{}" {} \
			LIMIT {} OFFSET {}'			
	SQL = SQL.format(att, seq, lim, off * lim)
	query = text(SQL)
	creator_results = con.execute(query).fetchall()

	count = 0
	for row in creator_results:
		count = row['totalrows']

		SQL = 'SELECT comic_id \
			FROM creators_comics cc \
			WHERE cc.creator_id = {} \
			ORDER BY comic_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		comic_id_results = con.execute(query).fetchall()
		comic_ids = []
		for id_tuple in comic_id_results:
			comic_ids.append(id_tuple[0])

		SQL = 'SELECT series_id \
			FROM creators_series cs \
			WHERE cs.creator_id = {} \
			ORDER BY series_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		series_id_results = con.execute(query).fetchall()
		series_ids = []
		for id_tuple in series_id_results:
			series_ids.append(id_tuple[0])

		creator_data = {
			'id': row['id'],
			'fullName': row['fullName'],
			'thumbnail': row['thumbnail'],
			'details': row['details'],
			'comics': comic_ids,
			'numComics': row['numComics'],
			'series': series_ids,
			'numSeries': row['numSeries']
		}

		response_data.append(creator_data)

	response_json = {
		'count': count,
		'data': response_data 
	}

	return response_json

def query_all_series(order_by_args = ('id', 'ASC'), limit_args = ('10', 0)):	
	response_data = []

	att, seq = order_by_args
	lim, off = limit_args

	SQL = 'SELECT * \
			FROM series s \
			ORDER BY "{}" {} \
			LIMIT {} OFFSET {}'
	SQL = SQL.format(att, seq, lim, off * lim)
	query = text(SQL)
	series_results = con.execute(query).fetchall()

	for row in series_results:
		SQL = 'SELECT comic_id \
			FROM series_comics cs \
			WHERE cs.series_id = {} \
			ORDER BY comic_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		comic_id_results = con.execute(query).fetchall()
		comic_ids = []
		for id_tuple in comic_id_results:
			comic_ids.append(id_tuple[0])

		SQL = 'SELECT character_id \
			FROM series_characters cs \
			WHERE cs.series_id = {} \
			ORDER BY character_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		char_id_results = con.execute(query).fetchall()
		char_ids = []
		for id_tuple in char_id_results:
			char_ids.append(id_tuple[0])

		SQL = 'SELECT creator_id \
			FROM creators_series cs \
			WHERE cs.series_id = {} \
			ORDER BY creator_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		creator_id_results = con.execute(query).fetchall()
		creator_ids = []
		for id_tuple in creator_id_results:
			creator_ids.append(id_tuple[0])

		series_data = {
			'id': row['id'],
			'title': row['title'],
			'description': row['description'],
			'startYear': row['startYear'],
			'endYear': row['endYear'],
			'rating': row['rating'],
 			'thumbnail': row['thumbnail'],
			'details': row['details'],
			'predecessor': row['predecessor'],
			'successor': row['successor'],
			'comics': comic_ids,
			'numComics': row['numComics'],
			'characters': char_ids,
			'numCharacters': row['numCharacters'],
			'creators': creator_ids,
			'numCreators': row['numCreators']
		}

		response_data.append(series_data)

	return response_data

def query_series(where_args, order_by_args, limit_args):	
	response_data = []

	att, seq = order_by_args
	lim, off = limit_args

	SQL = 'SELECT *, COUNT(*) OVER () totalRows \
			FROM series s \
			WHERE ' + build_where_clause(where_args) + \
			' ORDER BY "{}" {} \
			LIMIT {} OFFSET {}'			
	SQL = SQL.format(att, seq, lim, off * lim)
	query = text(SQL)
	series_results = con.execute(query).fetchall()

	count = 0
	for row in series_results:
		count = row['totalrows']

		SQL = 'SELECT comic_id \
			FROM series_comics cs \
			WHERE cs.series_id = {} \
			ORDER BY comic_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		comic_id_results = con.execute(query).fetchall()
		comic_ids = []
		for id_tuple in comic_id_results:
			comic_ids.append(id_tuple[0])

		SQL = 'SELECT character_id \
			FROM series_characters cs \
			WHERE cs.series_id = {} \
			ORDER BY character_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		char_id_results = con.execute(query).fetchall()
		char_ids = []
		for id_tuple in char_id_results:
			char_ids.append(id_tuple[0])

		SQL = 'SELECT creator_id \
			FROM creators_series cs \
			WHERE cs.series_id = {} \
			ORDER BY creator_id'
		SQL = SQL.format(row['id'])
		query = text(SQL)
		creator_id_results = con.execute(query).fetchall()
		creator_ids = []
		for id_tuple in creator_id_results:
			creator_ids.append(id_tuple[0])

		series_data = {
			'id': row['id'],
			'title': row['title'],
			'description': row['description'],
			'startYear': row['startYear'],
			'endYear': row['endYear'],
			'rating': row['rating'],
 			'thumbnail': row['thumbnail'],
			'details': row['details'],
			'predecessor': row['predecessor'],
			'successor': row['successor'],
			'comics': comic_ids,
			'numComics': row['numComics'],
			'characters': char_ids,
			'numCharacters': row['numCharacters'],
			'creators': creator_ids,
			'numCreators': row['numCreators']
		}

		response_data.append(series_data)

	response_json = {
		'count': count,
		'data': response_data 
	}

	return response_json

def count_chars():
	SQL = 'SELECT COUNT(*) FROM characters'
	query = text(SQL)
	results = con.execute(query).fetchall()
	return results[0][0]

def count_comics():
	SQL = 'SELECT COUNT(*) FROM comics'
	query = text(SQL)
	results = con.execute(query).fetchall()
	return results[0][0]

def count_creators():
	SQL = 'SELECT COUNT(*) FROM creators'
	query = text(SQL)
	results = con.execute(query).fetchall()
	return results[0][0]

def count_series():
	SQL = 'SELECT COUNT(*) FROM series'
	query = text(SQL)
	results = con.execute(query).fetchall()
	return results[0][0]

def search_terms(terms):
	SQL = 'SELECT * FROM characters' \
			'WHERE'

def build_where_clause(filters):
	clause = ''

	if len(filters) > 0:
		f = filters[0]
		col = f['field']
		comp = f['comparator']
		val = f['val']
		conjunction = '"{}" {} {}'
		conjunction = conjunction.format(col, comp, val)
		clause += conjunction

	for f in filters[1:]:
		col = f['field']
		comp = f['comparator']
		val = f['val']
		conjunction = ' AND "{}" {} {}'
		conjunction = conjunction.format(col, comp, val)
		clause += conjunction

	return clause

if __name__ == '__main__':
	pass
	# result = query_chars(('c.id', '1009262'), ('c.id', 'DESC'), ('10', '0'))
	# count_chars()
	# b = 'SELECT a FROM s WHERE '
	# filters = [{'field': 'c1', 'comparator': '=', 'val': 'tree', 'type': 's'},
	# 			{'field': 'c2', 'comparator': '<=', 'val': 'foo', 'type': 's'},
	# 			{'field': 'c3', 'comparator': '>', 'val': '5', 'type': 'n'}]
	# print(build_where_clause(b, filters))
