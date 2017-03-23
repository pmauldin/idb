from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# [START model]
class Characters(db.Model):
    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    description = db.Column(db.String(255))
    thumbnail = db.Column(db.String(255))
    details = db.Column(db.String(255))
    wiki = db.Column(db.String(255))
    numComics = db.Column(db.Integer)
    numSeries = db.Column(db.Integer)
    
    # comics_id = db.Column(db.Integer, db.ForeignKey('comics.id'))
    comics = db.relationship('Comics', backref=db.backref('characters', lazy='dynamic'))
    
    # series_id = db.Column(db.Integer, db.ForeignKey('series.id'))
    series = db.relationship('Series', backref=db.backref('characters', lazy='dynamic'))

    def __init__(self, id, name, description, thumbnail, details, wiki, 
        comics, numComics, series, numSeries):
        self.id = id
        self.name = character_name
        self.description = description
        self.thumbnail = thumbnail
        self.details = details
        self.wiki = wiki
        self.comics = comics
        self.numComics = numComics
        self.series
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
        result['comics'] = self.comics
        result['numComics'] = self.numComics
        result['series'] = self.series
        result['numSeries'] = self.numSeries

        return result


    # def __repr__(self):
    #     return '<Character %r>' % self.character_name

# [END model]

# [START model]
class Comics(db.Model):
    __tablename__ = 'comics'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    issuenumber = db.column(db.Integer)
    description = db.Column(db.String(255))
    format = db.Column(db.String(255))
    pageCount = db.Column(db.Integer)
    printPrice = db.Column(db.Float)
    digitalPrice = db.Column(db.Float)
    dateReleased = db.Column(db.String(255))
    thumbnail = db.Column(db.String(255))
    images = db.Column(db.String(255))
    details = db.Column(db.String(255))
    numCharacters = db.Column(db.Integer)
    numCreators = db.Column(db.Integer)
    
    # creator_id = db.Column(db.Integer, db.ForeignKey('creators.id'))
    creators = db.relationship('Creators', backref=db.backref('comics', lazy='dynamic'))
    
    # chars_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    characters = db.relationship('Characters', backref=db.backref('comics', lazy='dynamic'))
    
    # series_id = db.Column(db.Integer, db.ForeignKey('series.id'))
    series = db.relationship('Series', backref=db.backref('comics', lazy='dynamic'))

    def __init__(self, id, title, issuenumber, description, format, pageCount, printPrice, 
        digitalPrice, dateReleased, thumbnail, images, details, series, characters, 
        numCharacters, creators, numCreators):
        self.id = id
        self.title = title
        self.issuenumber = issuenumber
        self.description = description
        self.format = format
        self.pageCount = pageCount
        self.printPrice = printPrice
        self. digitalPrice = digitalPrice
        self.dateReleased = dateReleased
        self.thumbnail = thumbnail
        self.images = images
        self.details = details
        self.series = series
        self.characters = characters
        self.numCharacters = numCharacters
        self.creators = creators
        self.numCreators = numCreators

# [END model]

# [START model]
class Creators(db.Model):
    __tablename__ = 'creators'

    id = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(255))
    thumbnail = db.Column(db.String(255))
    details =  db.Column(db.String(255))
    comics = db.Column(db.Integer)
    numComics = db.Column(db.Integer)
    series = db.Column(db.Integer)
    numSeries = db.Column(db.Integer)
    
    # comics_id = db.Column(db.Integer, db.ForeignKey('comics.id'))
    comics = db.relationship('Comics', backref=db.backref('creators', lazy='dynamic'))
    
    # series_id = db.Column(db.Integer, db.ForeignKey('series.id'))
    series = db.relationship('Series', backref=db.backref('creators', lazy='dynamic'))

    def __init__(self, id, fullName, thumbnail, details, comics, numComics, series, numSeries):
        self.id = id
        self.fullName = fullName
        self.thumbnail = thumbnail
        self.details = details
        self.comics = comics
        self.numComics = numComics
        self.series = series
        self.numSeries = numSeries

# [END model]

# [START model]
class Series(db.Model):
    __tablename__ = 'series'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    description = db.Column(db.String(255))
    startYear = db.Column(db.Integer)
    endYear = db.Column(db.Integer)
    rating = None
    thumbnail = db.Column(db.String(255))
    details = db.Column(db.String(255))
    predecessor = db.Column(db.Integer)
    successor = db.Column(db.Integer)
    comics = db.Column(db.Integer)
    numComics = db.Column(db.Integer)
    characters = db.Column(db.Integer)
    numCharacters = db.Column(db.Integer)
    creators = db.Column(db.Integer)
    numCreators = db.Column(db.Integer)
    
    # creator_id = db.Column(db.Integer, db.ForeignKey('creator.id'))
    creator = db.relationship('Creators', backref=db.backref('series', lazy='dynamic'))
    
    # chars_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    characters = db.relationship('Characters', backref=db.backref('series', lazy='dynamic'))

    # comics_id = db.Column(db.Integer, db.ForeignKey('comics.id'))
    comics = db.relationship('Characters', backref=db.backref('series', lazy='dynamic'))

    def __init__(self, id, title, description, startYear, endYear, rating, 
        thumbnail, details, predecessor, successor, comics, numComics, 
        characters, numCharacters, creators, numCreators):
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
        self.comics = comics
        self.numComics = numComics
        self.characters = characters
        self.numCharacters = numCharacters
        self.creators = creators
        self.numCreators = numCreators
    
# [END model]

# class Char_Comics(db.Model):

# class Char_Series(db.Model):

# class Creators_Comics(db.Model):

# class Creators_Series(db.Model):
