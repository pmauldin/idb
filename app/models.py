import sqlalchemy
from sqlalchemy import Table, Column, Integer, Float, String, Date, ForeignKey


def create_characters_table(meta, con) :
    characters = Table("characters", meta,
                       Column("id", Integer, primary_key=True),
                       Column("name", String),
                       Column("description", String),
                       Column("thumbnail", String),
                       Column("details", String),
                       Column("wiki", String),
                       Column("comicsUrl", String),
                       Column("numComics", Integer),
                       Column("numSeries", Integer))
    meta.create_all(con)
    return characters

def create_comics_table(meta, con) :
    comics = Table("comics", meta,
                   Column("id", Integer, primary_key=True),
                   Column("title", String),
                   Column("issueNumber", Integer),
                   Column("description", String),
                   Column("format", String),
                   Column("pageCount", Integer),
                   Column("printPrice", Float),
                   Column("digitalPrice", Float),
                   Column("dateReleased", String),
                   Column("thumbnail", String),
                   Column("images", String),
                   Column("details", String),
                   Column("series_id", Integer, ForeignKey("series.id")),
                   Column("numCreators", Integer),
                   Column("numCharacters", Integer)) 
                       
    meta.create_all(con)

    return comics

def create_creators_table(meta, con) :
    comics = Table("creators", meta,
                   Column("id", Integer, primary_key=True),
                   Column("fullName", String),
                   Column("thumbnail", String),
                   Column("details", String),
                   Column("numComics", Integer),
                   Column("numSeries", Integer))
                       
    meta.create_all(con)
    return comics

def create_series_table(meta, con) :
    comics = Table("series", meta,
                   Column("id", Integer, primary_key=True),
                   Column("title", String),
                   Column("description", String),
                   Column("startYear", Integer),
                   Column("endYear", Integer),
                   Column("rating", String),
                   Column("thumbnail", String),
                   Column("details", String),
                   Column("predecessor", Integer),
                   Column("successor", Integer),
                   Column("numComics", Integer),
                   Column("numCharacters", Integer),
                   Column("numCreators", Integer))
                       
    meta.create_all(con)
    return comics

def create_comics_characters_table(meta, con) :
    comics_characters = Table("comics_characters", meta,
                              Column("id", Integer, primary_key=True),
                              Column("comic_id", Integer, ForeignKey("comics.id")),
                              Column("character_id", Integer, ForeignKey("characters.id")))
    meta.create_all(con)
    return comics_characters

def create_creators_series_table(meta, con) :
    creators_series = Table("creators_series", meta, 
                            Column("id", Integer, primary_key=True),
                            Column("creator_id", Integer, ForeignKey("creators.id")),
                            Column("series_id", Integer, ForeignKey("series.id")))

    meta.create_all(con)
    return creators_series

def create_creators_comics_table(meta, con) :
    creators_comics = Table("creators_comics", meta,
                            Column("id", Integer, primary_key=True),
                            Column("creator_id", Integer, ForeignKey("creators.id")),
                            Column("comic_id", Integer, ForeignKey("comics.id")))

    meta.create_all(con)
    return creators_comics

def create_series_characters_table(meta, con) :
    series_characters = Table("series_characters", meta,
                              Column("id", Integer, primary_key=True),
                              Column("series_id", Integer, ForeignKey("series.id")),
                              Column("character_id", Integer, ForeignKey("characters.id")))
    meta.create_all(con)
    return series_characters

def create_series_comics_table(meta, con) :
    series_comics = Table("series_comics", meta,
                          Column("id", Integer, primary_key=True),
                          Column("series_id", Integer, ForeignKey("series.id")),
                          Column("comic_id", Integer, ForeignKey("comics.id")))
    meta.create_all(con)
    return series_comics

def get_characters_table(meta, con) :
    return Table("characters", meta, autoload=True, autoload_with=con)

def get_comics_table(meta, con) :
    return Table("comics", meta, autoload=True, autoload_with=con)

def get_creators_table(meta, con) :
    return Table("creators", meta, autoload=True, autoload_with=con)

def get_series_table(meta, con) :
    return Table("series", meta, autoload=True, autoload_with=con)

def get_comics_characters_table(meta, con) :
    return Table("comics_characters", meta, autoload=True, autoload_with=con)

def get_creators_series_table(meta, con) :
    return Table("creators_series", meta, autoload=True, autoload_with=con)

def get_creators_comics_table(meta, con) :
    return Table("creators_comics", meta, autoload=True, autoload_with=con)

def get_series_characters_table(meta, con) :
    return Table("series_characters", meta, autoload=True, autoload_with=con)

def get_series_comics_table(meta, con) :
    return Table("series_comics", meta, autoload=True, autoload_with=con)



# https://suhas.org/sqlalchemy-tutorial
def connect(user, password, db='marveldb', host='localhost', port=5432) :
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


