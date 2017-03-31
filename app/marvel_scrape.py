import sqlalchemy
from sqlalchemy import Table, Column, Integer, String, ForeignKey
import json
import hashlib
import requests
import time
from string import ascii_lowercase

# marvel public api key
# d7ddd341e81cf87ce24ba23e95706a62

# marvel private api key
# 3601339eb9cff1326f79213cbf2a1fc6333c39e6

"""
id (int, optional): The unique ID of the character resource.,
name (string, optional): The name of the character.,
description (string, optional): A short bio or description of the character.,
resourceURI (string, optional): The canonical URL identifier for this resource.,
thumbnail (Image, optional): The representative image for this character.,
"""

def insert_all_characters(public_key, private_key, characters_table, con) :

	for c in ascii_lowercase :
		offset_num = 0
		print("done with characters whos' name starts with: ", c)
		while True:
			messy_chars_dict = get_json_characters_dictionary_by_char_of_first_name_and_offset_with_limit(public_key, private_key, c, offset_num)
			if(len((messy_chars_dict["data"])["results"]) == 0) :
				break
			chars_dict_list = create_character_table_dictionary(messy_chars_dict)
			insert_characters(chars_dict_list, characters_table, con)
			offset_num += 100

def get_json_characters_dictionary_by_char_of_first_name_and_offset_with_limit(public_key, private_key, first_char_of_name, offset_num) :
	ts = time.time()
	nameStartsWith = "nameStartsWith={}&"
	nameStartsWith = nameStartsWith.format(first_char_of_name)
	offset = "offset={}&"
	offset = offset.format(offset_num)
	limit = "limit=100&"
	nameStartsWith_offset_limit = nameStartsWith + offset + limit
	send_hash = create_send_hash(public_key, private_key, ts)
	url = create_character_api_call_url(public_key, send_hash, ts, nameStartsWith_offset_limit)
	r = requests.get(url=url)
	return r.json()

def create_character_table_dictionary(messy_dict) :
	data = messy_dict["data"]
	results = data["results"]
	chars_dict_list = []
	
	for d in results :
		character_dict = dict()
		character_dict["id"] = d["id"]
		character_dict["name"] = d["name"]
		character_dict["description"] = d["description"]
		character_dict["resourceURI"] = d["resourceURI"]
		thumbnail_dict = d["thumbnail"]
		character_dict["thumbnail"] = create_thumbnail(thumbnail_dict["path"], thumbnail_dict["extension"])
		chars_dict_list += [character_dict]

	return chars_dict_list

def insert_characters(chars_dict_list, characters_table, con) :
	for char_dict in chars_dict_list :
		id = char_dict["id"]
		s = characters_table.select(characters_table.c.id == id)
		char_rows = s.execute()
		if char_rows.rowcount == 0 :
			insert_clause = characters_table.insert().values(**char_dict)
			result = con.execute(insert_clause)
			print(result.inserted_primary_key)

def create_characters_table(meta, con) :
	characters = Table("characters", meta,
					   Column("id", Integer, primary_key=True),
					   Column("name", String),
					   Column("description", String),
					   Column("resourceURI", String),
					   Column("thumbnail", String))
	meta.create_all(con)

def get_characters_table(meta, con) :
	return Table("characters", meta, autoload=True, autoload_with=con)

def create_thumbnail(path, extension) :
	return (path + "." + extension)

def get_json_characters_dictionary_by_char_of_first_name(public_key, private_key, first_char_of_name) :
	ts = time.time()
	nameStartsWith = "nameStartsWith={}&"
	nameStartsWith = nameStartsWith.format(first_char_of_name)
	send_hash = create_send_hash(public_key, private_key, ts)
	url = create_character_api_call_url(public_key, send_hash, ts, nameStartsWith)
	r = requests.get(url=url)
	return r.json()

def create_send_hash(public_key, private_key, ts) :
	hash_string = "{}{}{}"
	hash_string = hash_string.format(ts, private_key, public_key)
	encoded_hash_string = hash_string.encode('utf-8')
	return hashlib.md5(encoded_hash_string).hexdigest()

def create_character_api_call_url(public_key, send_hash, ts, category) :
	url = "https://gateway.marvel.com/v1/public/characters?{}ts={}&apikey={}&hash={}"
	url = url.format(category,ts, public_key, send_hash)
	return url

# https://suhas.org/sqlalchemy-tutorial
def connect_to_marveldb(user, password, db, host='localhost', port=5432) :
	'''Returns a connection and a metadata object'''
    # We connect with the help of the PostgreSQL URL
    # postgresql://federer:grandestslam@localhost:5432/tennis
	url = 'postgresql://{}:{}@{}:{}/{}'
	url = url.format(user, password, host, port, db)

	# The return value of create_engine() is our connection object
	con = sqlalchemy.create_engine(url, client_encoding='utf8')

	# We then bind the connection to MetaData()
	meta = sqlalchemy.MetaData(bind=con, reflect=True)
	print("connected to marveldb")
	print("connection: ", con)
	print("meta: ", meta)

	return con, meta

if __name__ == '__main__':
	con,meta = connect_to_marveldb("nano", "nano", "marveldb") # change username and password to your username and password
	# for the database marveldb
	public_key = "d7ddd341e81cf87ce24ba23e95706a62" # change public_key to your public key for marvel api
	private_key = "3601339eb9cff1326f79213cbf2a1fc6333c39e6" # change private_key to your private key for marvel api
	# messy_chars_dict = get_json_characters_dictionary_by_char_of_first_name(public_key, private_key, "a")
	# chars_dict_list = create_character_table_dictionary(messy_chars_dict)
	# if you don't have a characters table in your data base call this, you only want to call this one time
	# create_characters_table(meta, con)  this will create a table schema and insert it into your database

	# after you have you table in the database, you can fetch the table with the function below
	# characters_table = get_characters_table(meta, con)

	# # at this point insert rows into the table
	# insert_characters(chars_dict_list, characters_table, con)
	characters_table = get_characters_table(meta, con)
	insert_all_characters(public_key, private_key, characters_table, con)



