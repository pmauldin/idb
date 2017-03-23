from flask import Flask
from sqlalchemy import Table, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import insert
from data import characters, comics, creators, series

Base = declarative_base()

def create_one_direction_associative_table(base_list, table, secondary_list_key, id_key, left_id, right_id) :
    i = insert(table)
    for d in base_list :
        id = d[id_key]
        secondary_list = d[secondary_list_key]
        for element in secondary_list :
            row_dict = {left_id: id, right_id: element}

            # this should enter row into databse
            # can't do it just yet because our databse 
            # is not connected
            # i.execute(row_dict)

def create_characters_comics_table(characters, comics) :
    # used for many to many bidirectional relationship between characters and comics
    characters_comics_table = Table("characters_comics", Base.metadata,
                                       Column("character_id", Integer, ForeignKey("character_id")),
                                       Column("comic_id", Integer, ForeignKey("comic_id")))

    # need to create the relationships in both directions so create the connections
    # in one direction then the other
    create_one_direction_associative_table(characters, characters_comics_table, 
                                             "comics", "id", "character_id", "comic_id")

    create_one_direction_associative_table(comics, characters_comics_table, 
                                    "characters", "id", "comic_id", "character_id")
    # return the table schema
    return characters_comics_table

def create_characters_series_table(characters, series) :
    # used for many to many bidirectional relationship between characters and series 
    characters_series_table = Table("characters_series", Base.metadata,
                                       Column("character_id", Integer, ForeignKey("character_id")),
                                       Column("series_id", Integer, ForeignKey("series_id")))

    # need to create the relationships in both directions so create the connections
    # in one direction then the other
    create_one_direction_associative_table(characters, characters_series_table, 
                                             "series", "id", "character_id", "series_id")

    create_one_direction_associative_table(series, characters_series_table, 
                                    "characters", "id", "series_id", "character_id")
    #return the table schema
    return characters_series_table

def create_comics_series_table(comics, series) : 
    # used for many to many bidirectional relationship between comics and series
    comics_series_table = Table("comics_series", Base.metadata,
                            Column("comic_id", Integer, ForeignKey("comic_id")),
                            Column("series_id", Integer, ForeignKey("series_id")))

    # need to create the relationships in both directions so create the connections
    # in one direction then the other
    create_one_direction_associative_table(comics, comics_series_table, 
                                             "series", "id", "comic_id", "series_id")

    create_one_direction_associative_table(series, comics_series_table, 
                                    "comics", "id", "series_id", "comic_id")

    return comics_series_table

def create_comics_creators_table(comics, creators) : 
    # used for many to many bidirectional relationship between comics and creators
    comics_creators_table = Table("comics_creators", Base.metadata, 
                        Column("comic_id", Integer, ForeignKey("comic_id")),
                        Column("creator_id", Integer, ForeignKey("creator_id")))

    # need to create the relationships in both directions so create the connections
    # in one direction then the other
    create_one_direction_associative_table(comics, comics_creators_table, 
                                             "creators", "id", "comic_id", "creator_id")

    create_one_direction_associative_table(creators, comics_creators_table, 
                                    "comics", "id", "creator_id", "comic_id")

    return comics_creators_table


def create_creators_series_table(creators,series) : 
    #used for many to many bidirectional relationship between creators and series
    creators_series_table = Table("creators_series", Base.metadata,
                                  Column("creator_id", Integer, ForeignKey("creator_id")),
                                  Column("series_id", Integer, ForeignKey("series_id")))

    # need to create the relationships in both directions so create the connections
    # in one direction then the other
    create_one_direction_associative_table(creators, creators_series_table,  
                                             "series", "id", "creator_id", "series_id")

    create_one_direction_associative_table(series, creators_series_table,
                                    "creators", "id", "series_id", "creator_id")

    # return the table schema
    return creators_series_table


# create all the associative_tables
characters_comics_table = create_characters_comics_table(characters, comics)
characters_series_table = create_characters_series_table(characters, series)
comics_series_table =  create_comics_series_table(comics, series) 
comics_creators_table = create_comics_creators_table(comics, creators)
creators_series_table = create_creators_series_table(creators,series)

# [START model]
class Character(Base):
    __tablename__ = 'characters'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    description = Column(String(1024))
    thumbnail = Column(String(255))
    details = Column(String(255))
    wiki = Column(String(255))
    comicsUrl = Column(String(255))
    comics = None
    numComics = Column(Integer)
    series = None
    numSeries = Column(Integer)

    def __init__(self, id, name, description, thumbnail, details, wiki, comicsUrl, characters_comics_table, 
                 numComics, characters_series_table, numSeries):
        self.id = id
        self.name = name
        self.description = description
        self.thumbnail = thumbnail
        self.details = details
        self.wiki = wiki
        self.comicsUrl = comicsUrl
        self.comics = relationship("Comics", secondary=characters_comics_table, back_populates="characters")
        self.numComics = numComics
        self.series = relationship("Series", secondary=characters_series_table, back_populates="characters")
        self.numSeries = numSeries

    def getValues(self):
        """
        This method is used for unit tests in tests.py
        @return: Return a Dictionary of the attribute values
        for this Character object
        """
        result = {}
        result['id'] = self.id
        result['name'] = self.name
        result['description'] = self.description
        result['thumbnail'] = self.thumbnail
        result['details'] = self.details
        result['wiki'] = self.wiki
        result['comicsUrl'] = self.comicsUrl
        result['comics'] = self.comics
        result['numComics'] = self.numComics
        result['series'] = self.series
        result['numSeries'] = self.numSeries

        return result

# [END model]

def create_character(character) :
    # get relationships needed to create to a character
    relationship_list = [characters_comics_table, characters_series_table]
    relationship_key_list = ["characters_comics_table", "characters_series_table"]
    relationship_list_index = 0
    character_init_dict = dict()
    
    for key, value in character.items() :
        if not isinstance(value, list) :
            character_init_dict[key] = value
        else :
            character_init_dict[relationship_key_list[relationship_list_index]] = \
            relationship_list[relationship_list_index]

            relationship_list_index += 1

    return Character(**character_init_dict)

# [START model]
class Comic(Base):
    __tablename__ = 'comics'

    id = Column(Integer, primary_key=True)
    title = Column(String(255))
    issueNumber = Column(Integer)
    description = Column(String(1024))
    format = Column(String(255))
    pageCount = Column(Integer)
    printPrice = Column(Float)
    digitalPrice = Column(Float)
    dateReleased = Column(String(255))
    thumbnail = Column(String(255))
    images = Column(String(255))
    details = Column(String(255))
    series = None
    characters = None
    numCharacters = Column(Integer)
    creators = None
    numCreators = Column(Integer)

    def __init__(self, id, title, issueNumber, description, format, pageCount, printPrice, 
        digitalPrice, dateReleased, thumbnail, images, details, comics_series_table, characters_comics_table,
        numCharacters, comics_creators_table, numCreators):
        self.id = id
        self.title = title
        self.issueNumber = issueNumber
        self.description = description
        self.format = format
        self.pageCount = pageCount
        self.printPrice = printPrice
        self. digitalPrice = digitalPrice
        self.dateReleased = dateReleased
        self.thumbnail = thumbnail
        self.images = images
        self.details = details
        self.series = relationship("Series", secondary=comics_series_table, back_populates="comics")
        self.characters = relationship("Characters", secondary=characters_comics_table, back_populates="comics")
        self.numCharacters = numCharacters
        self.creators = relationship("Creators", secondary=comics_creators_table, back_populates="comics")
        self.numCreators = numCreators

    def getValues(self):
        """
        This method is used for unit tests in tests.py
        @return: Return a Dictionary of the attribute values
        for this Character object
        """
        result = {}
        result['id'] = self.id
        result['title'] = self.title
        result['issueNumber'] = self.issueNumber
        result['description'] = self.description
        result['format'] = self.format
        result['pageCount'] = self.pageCount
        result['printPrice'] = self.printPrice
        result['digitalPrice'] = self.digitalPrice
        result['dateReleased'] = self.dateReleased
        result['thumbnail'] = self.thumbnail
        result['images'] = self.images
        result['details'] = self.details
        result['series'] = self.series
        result['characters'] = self.series
        result['numCharacters'] = self.numCharacters
        result['creators'] = self.creators
        result['numCreators'] = self.numCreators

        return result

# [END model]

def create_comic(comic) : 
    # get relationships needed to create to a comic
    relationship_list = [comics_series_table, characters_comics_table, comics_creators_table]
    relationship_key_list = ["comics_series_table", "characters_comics_table", "comics_creators_table"]
    relationship_list_index = 0
    comic_init_dict = dict()
    
    for key, value in comic.items() :
        if not isinstance(value, list) :
            comic_init_dict[key] = value
        else :
            comic_init_dict[relationship_key_list[relationship_list_index]] = \
            relationship_list[relationship_list_index]
            relationship_list_index += 1

    return Comic(**comic_init_dict)

# [START model]
class Creator(Base):
    __tablename__ = 'creators'

    id = Column(Integer, primary_key=True)
    fullName = Column(String(255))
    thumbnail = Column(String(255))
    details =  Column(String(255))
    comics = None
    numComics = Column(Integer)
    series = None
    numSeries = Column(Integer)

    def __init__(self, id, fullName, thumbnail, details, comics_creators_table, creators_series_table, 
                 numComics, numSeries):
        self.id = id
        self.fullName = fullName
        self.thumbnail = thumbnail
        self.details = details
        self.comics = relationship("Comics", secondary=comics_creators_table, back_populates="creators")
        self.numComics = numComics
        self.series = relationship("Series", secondary=creators_series_table, back_populates="creators")
        self.numSeries = numSeries

    def getValues(self):
        """
        This method is used for unit tests in tests.py
        @return: Return a Dictionary of the attribute values
        for this Character object
        """
        result = {}
        result['id'] = self.id
        result['fullName'] = self.fullName
        result['thumbnail'] = self.thumbnail
        result['details'] = self.details
        result['comics'] = self.comics
        result['numComics'] = self.numComics
        result['series'] = self.series
        result['numSeries'] = self.numSeries

        return result

# [END model]

def create_creator(creator) : 
    # get relationships needed to create to a comic
    relationship_list = [comics_creators_table, creators_series_table]
    relationship_key_list = ["comics_creators_table", "creators_series_table"]
    relationship_list_index = 0
    creator_init_dict = dict()
    
    for key, value in creator.items() :
        if not isinstance(value, list) :
            creator_init_dict[key] = value
        else :
            creator_init_dict[relationship_key_list[relationship_list_index]] = \
            relationship_list[relationship_list_index]
            relationship_list_index += 1

    return Creator(**creator_init_dict)

# [START model]
class Series(Base):
    __tablename__ = 'series'

    id = Column(Integer, primary_key=True)
    title = Column(String(255))
    description = Column(String(255))
    startYear = Column(Integer)
    endYear = Column(Integer)
    rating = None
    thumbnail = Column(String(255))
    details = Column(String(255))
    predecessor = Column(Integer)
    successor = Column(Integer)
    comics = None
    numComics = Column(Integer)
    characters = None
    numCharacters = Column(Integer)
    creators = None
    numCreators = Column(Integer)

    def __init__(self, id, title, description, startYear, endYear, rating, 
        thumbnail, details, predecessor, successor, comics_series_table, numComics, 
        characters_series_table, numCharacters, creators_series_table, numCreators):
        self.id = id
        self.title = title
        self.description = description
        self.startYear = startYear
        self.endYear = endYear
        self.rating = rating
        self.thumbnail = thumbnail
        self.details = details
        self.predecessor = predecessor
        self.successor = successor
        self.comics = relationship("Comics", secondary=comics_series_table, back_populates="series")
        self.numComics = numComics
        self.characters = relationship("Characters", secondary=characters_series_table, back_populates="series")
        self.numCharacters = numCharacters
        self.creators = relationship("Creators", secondary=creators_series_table, back_populates="series")
        self.numCreators = numCreators

    def getValues(self):
        """
        This method is used for unit tests in tests.py
        @return: Return a Dictionary of the attribute values
        for this Character object
        """
        result = {}
        result['id'] = self.id
        result['title'] = self.title
        result['description'] = self.description
        result['startYear'] = self.startYear
        result['endYear'] = self.endYear
        result['rating'] = self.rating
        result['thumbnail'] = self.thumbnail
        result['details'] = self.details
        result['predecessor'] = self.predecessor
        result['successor'] = self.successor
        result['comics'] = self.comics
        result['numComics'] = self.numComics
        result['characters'] = self.characters
        result['numCharacters'] = self.numCharacters
        result['creators'] = self.creators
        result['numCreators'] = self.numCreators

        return result

def create_series(series) : 
    # get relationships needed to create to a comic
    relationship_list = [comics_series_table, characters_series_table, creators_series_table]
    relationship_key_list = ["comics_series_table", "characters_series_table", "creators_series_table"]
    relationship_list_index = 0
    series_init_dict = dict()
    
    for key, value in series.items() :
        if not isinstance(value, list) :
            series_init_dict[key] = value
        else :
            series_init_dict[relationship_key_list[relationship_list_index]] = \
            relationship_list[relationship_list_index]
            relationship_list_index += 1

    return Series(**series_init_dict)
    
# [END model]

# class Char_Comics(db.Model):

# class Char_Series(db.Model):

# class Creators_Comics(db.Model):

# class Creators_Series(db.Model):
