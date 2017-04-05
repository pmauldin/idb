def query(table, id = None, limit = None):
	if id is None && limit is None:
		# SELECT * FROM table
		pass
	elif id is None:
		# SELECT * FROM table WHERE id = charID
		pass
	elif limit is None:
		# SELECT * FROM table LIMIT limit
		pass
	else:
		# SELECT * FROM table WHERE id = charID LIMIT limit
		pass
	pass
