import sqlalchemy
from sqlalchemy import Table, Column, Integer, Float, String, ForeignKey


def create_characters_table(meta, con):  # pragma: no cover
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
    
    assert(meta != None)
    assert(con != None)
    meta.create_all(con)
    return characters


def create_comics_table(meta, con):  # pragma: no cover
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
    
    assert(meta != None)
    assert(con != None)
    meta.create_all(con)
    return comics


def create_creators_table(meta, con): # pragma: no cover
    comics = Table("creators", meta,
                   Column("id", Integer, primary_key=True),
                   Column("fullName", String),
                   Column("thumbnail", String),
                   Column("details", String),
                   Column("numComics", Integer),
                   Column("numSeries", Integer))
    
    assert(meta != None)
    assert(con != None)
    meta.create_all(con)
    return comics


def create_series_table(meta, con): # pragma: no cover
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
    
    assert(meta != None)
    assert(con != None)
    meta.create_all(con)
    return comics


def create_comics_characters_table(meta, con): # pragma: no cover
    comics_characters = Table("comics_characters", meta,
                              Column("id", Integer, primary_key=True),
                              Column("comic_id", Integer, ForeignKey("comics.id")),
                              Column("character_id", Integer, ForeignKey("characters.id")))
    
    assert(meta != None)
    assert(con != None)
    meta.create_all(con)
    return comics_characters


def create_creators_series_table(meta, con): # pragma: no cover
    creators_series = Table("creators_series", meta,
                            Column("id", Integer, primary_key=True),
                            Column("creator_id", Integer, ForeignKey("creators.id")),
                            Column("series_id", Integer, ForeignKey("series.id")))
    
    assert(meta != None)
    assert(con != None)
    meta.create_all(con)
    return creators_series


def create_creators_comics_table(meta, con): # pragma: no cover
    creators_comics = Table("creators_comics", meta,
                            Column("id", Integer, primary_key=True),
                            Column("creator_id", Integer, ForeignKey("creators.id")),
                            Column("comic_id", Integer, ForeignKey("comics.id")))
    
    assert(meta != None)
    assert(con != None)
    meta.create_all(con)
    return creators_comics


def create_series_characters_table(meta, con): # pragma: no cover
    series_characters = Table("series_characters", meta,
                              Column("id", Integer, primary_key=True),
                              Column("series_id", Integer, ForeignKey("series.id")),
                              Column("character_id", Integer, ForeignKey("characters.id")))
    
    assert(meta != None)
    assert(con != None)
    meta.create_all(con)
    return series_characters


def create_series_comics_table(meta, con): # pragma: no cover
    series_comics = Table("series_comics", meta,
                          Column("id", Integer, primary_key=True),
                          Column("series_id", Integer, ForeignKey("series.id")),
                          Column("comic_id", Integer, ForeignKey("comics.id")))
    
    assert(meta != None)
    assert(con != None)
    meta.create_all(con)
    return series_comics


def get_characters_table(meta, con): 
    assert(meta != None)
    assert(con != None)
    return Table("characters", meta, autoload=True, autoload_with=con)


def get_comics_table(meta, con):
    assert(meta != None)
    assert(con != None)
    return Table("comics", meta, autoload=True, autoload_with=con)


def get_creators_table(meta, con):
    assert(meta != None)
    assert(con != None)
    return Table("creators", meta, autoload=True, autoload_with=con)


def get_series_table(meta, con):
    assert(meta != None)
    assert(con != None)
    return Table("series", meta, autoload=True, autoload_with=con)


def get_comics_characters_table(meta, con): # pragma: no cover
    assert(meta != None)
    assert(con != None)
    return Table("comics_characters", meta, autoload=True, autoload_with=con)


def get_creators_series_table(meta, con): # pragma: no cover
    assert(meta != None)
    assert(con != None)
    return Table("creators_series", meta, autoload=True, autoload_with=con)


def get_creators_comics_table(meta, con): # pragma: no cover
    assert(meta != None)
    assert(con != None)
    return Table("creators_comics", meta, autoload=True, autoload_with=con)


def get_series_characters_table(meta, con): # pragma: no cover
    assert(meta != None)
    assert(con != None)
    return Table("series_characters", meta, autoload=True, autoload_with=con)


def get_series_comics_table(meta, con):
    assert(meta != None)
    assert(con != None)
    return Table("series_comics", meta, autoload=True, autoload_with=con)


# https://suhas.org/sqlalchemy-tutorial
def connect(user, password, db='marveldb', host='104.155.158.51', port=5432):
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
