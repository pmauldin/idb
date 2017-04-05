# Dumps data into database

#!/usr/bin/env python

import sqlalchemy
from sqlalchemy import Table, Column, Integer, Float, Date, String, ForeignKey
from scraper import scrape_characters, scrape_comics

def connect(user, password, db, host='localhost', port=5432):
    '''Returns a connection and a metadata object'''
    # We connect with the help of the PostgreSQL URL
    # postgresql://federer:grandestslam@localhost:5432/tennis
    url = 'postgresql://{}:{}@{}:{}/{}'
    url = url.format(user, password, host, port, db)

    # The return value of create_engine() is our connection object
    con = sqlalchemy.create_engine(url, client_encoding='utf8')

    # We then bind the connection to MetaData()
    meta = sqlalchemy.MetaData(bind=con, reflect=True)

    return con, meta

def create_tables(con, meta):
	
	characters = Table('characters', meta,
    	Column('id', Integer, primary_key = True),
    	Column('name', String),
    	Column('description', String),
    	Column('thumbnail', String),
    	Column('details', String),
    	Column('wiki', String),
    	Column('comicsUrl', String),
    	Column('numComics', Integer),
    	Column('numSeries', Integer)
	)
	
	series = Table('series', meta,
    	Column('id', Integer, primary_key = True),
    	Column('title', String),
    	Column('description', String),
    	Column('startYear', Integer),
    	Column('endYear', Integer),
    	Column('rating', String),
    	Column('thumbnail', String),
    	Column('details', String),
    	Column('predecessor', Integer),
    	Column('successor', Integer),
    	Column('numComics', Integer),
    	Column('numCharacters', Integer),
    	Column('numCreators', Integer)
	)
	
	comics = Table('comics', meta,
    	Column('id', Integer, primary_key = True),
    	Column('title', String),
    	Column('issueNumber', Integer),
    	Column('description', String),
    	Column('format', String),
    	Column('pageCount', Integer),
    	Column('printPrice', Float),
    	Column('digitalPrice', Float),
    	Column('dateReleased', DateTimed),
    	Column('thumbnail', String),
    	Column('details', String),
    	Column('series_id', Integer, ForeignKey('series.id'), nullable = False),
    	Column('numCharacters', Integer),
    	Column('numCreators', Integer)
	)

	creators = Table('creators', meta,
		Column('id', Integer, primary_key = True),
    	Column('fullName', String),
    	Column('thumbnail', String),
    	Column('details', String),
    	Column('numComics', Integer),
    	Column('numSeries', Integer)
	)
	
	images = Table('images', meta,
		Column('path', String, primary_key = True),
		Column('extension', String),
		Column('comic_id', Integer, ForeignKey('comics.id'), nullable = False)
	)

	meta.create_all(con)

def create_associations(con, meta):
	chars_comics = Table('chars_comics', meta,
		Column('id', Integer, primary_key = True),
		Column('char_id', Integer, ForeignKey('characters.id'), nullable = False),
		Column('comic_id', Integer, ForeignKey('comics.id'), nullable = False)
	)

	chars_series = Table('chars_series', meta,
		Column('id', Integer, primary_key = True),
		Column('char_id', Integer, ForeignKey('characters.id'), nullable = False),
		Column('series_id', Integer, ForeignKey('series.id'), nullable = False)
	)


	creators_comics = Table('creators_comics', meta,
		Column('id', Integer, primary_key = True),
		Column('creator_id', Integer, ForeignKey('creators.id'), nullable = False),
		Column('comic_id', Integer, ForeignKey('comics.id'), nullable = False)
	)


	creators_series = Table('creators_series', meta,
		Column('id', Integer, primary_key = True),
		Column('creator_id', Integer, ForeignKey('creators.id'), nullable = False),
		Column('series_id', Integer, ForeignKey('series.id'), nullable = False)
	)

	meta.create_all(con)

def insert_all_data(con, meta):
	# insert characters data
	total = 1485
	limit = 100
	offset = 0

	chars_comics_data = {}
	while offset < total:
		print(offset)
		chars_data, chars_comics_data = scrape_characters(limit, offset)
		insert(con, meta, 'characters', chars_data)
		offset += 100

	# insert comics data
	total = 39226
	limit = 100
	offset = 0

	while offset < total:
		print(offset)
		comics_data, images_data = scrape_comics(limit, offset)
		insert(con, meta, 'comics', comics_data)
		insert(con, meta, 'images', images_data)
		offset += 100

	insert(con, meta, 'chars_comics', chars_comics_data)

def insert(con, meta, table_name, values):
	table = meta.tables[table_name]
	con.execute(table.insert(), values)

def main():
	con, meta = connect('charles', 'Charles', 'marveldb')
	# create_tables(con, meta)
	# create_associations(con, meta)
	insert_all_data(con, meta)


if __name__ == '__main__':
	main()
