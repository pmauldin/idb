from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# [START model]
class Characters(db.Model):
    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True)
    character_name = db.Column(db.String(255))
    description = db.Column(db.String(255))
    thumbnail = db.Column(db.String(255))
    details = db.Column(db.String(255))
    wiki = db.Column(db.String(255))
    comic_appearances = db.Column(db.Integer)
    num_comic_appearances = db.Column(db.Integer)
    series_appearances = db.Column(db.Integer)
    num_series_appearances = db.Column(db.Integer)
    
    comics_id = db.Column(db.Integer, db.ForeignKey('comics.id'))
    comics = db.relationship('Comics', backref=db.backref('characters', lazy='dynamic'))
    
    series_id = db.Column(db.Integer, db.ForeignKey('series.id'))
    series = db.relationship('Series', backref=db.backref('characters', lazy='dynamic'))

    # title = db.Column(db.String(255))
    # author = db.Column(db.String(255))
    # publishedDate = db.Column(db.String(255))
    # imageUrl = db.Column(db.String(255))
    # description = db.Column(db.String(4096))
    # createdBy = db.Column(db.String(255))
    # createdById = db.Column(db.String(255))

    def __init__(self, character_name, comics, series):
        self.character_name = character_name
        self.comics = comics
        self.series = series

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
    series = db.Column(db.Integer)
    characters = db.Column(db.Integer)
    numCharacters = db.Column(db.Integer)
    creators = db.Column(db.Integer)
    numCreators = db.Column(db.Integer)
    
    creator_id = db.Column(db.Integer, db.ForeignKey('creator.id'))
    creator = db.relationship('Creators', backref=db.backref('comics', lazy='dynamic'))
    
    chars_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    characters = db.relationship('Characters', backref=db.backref('comics', lazy='dynamic'))
    
    series_id = db.Column(db.Integer, db.ForeignKey('series.id'))
    series = db.relationship('Series', backref=db.backref('comics', lazy='dynamic'))

    def __init__(self, title, creator, characters, series):
        self.title = title
        self.creator = creator
        self.characters = characters
        self.series = series

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

    
    comics_id = db.Column(db.Integer, db.ForeignKey('comics.id'))
    comics = db.relationship('Comics', backref=db.backref('creators', lazy='dynamic'))
    
    series_id = db.Column(db.Integer, db.ForeignKey('series.id'))
    series = db.relationship('Series', backref=db.backref('creators', lazy='dynamic'))


    def __init__(self, creator_name, comics, series):
        self.creator_name = creator_name
        self.comics = comics
        self.series = series

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
    
    creator_id = db.Column(db.Integer, db.ForeignKey('creator.id'))
    creator = db.relationship('Creators', backref=db.backref('series', lazy='dynamic'))
    
    chars_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    characters = db.relationship('Characters', backref=db.backref('series', lazy='dynamic'))

    comics_id = db.Column(db.Integer, db.ForeignKey('comics.id'))
    comics = db.relationship('Characters', backref=db.backref('series', lazy='dynamic'))

    def __init__(self, series_name, creator, characters, comics):
        self.series_name = series_name
        self.creator = creator
        self.characters = characters
        self.comics = comics
    
# [END model]

# class Char_Comics(db.Model):

# class Char_Series(db.Model):

# class Creators_Comics(db.Model):

# class Creators_Series(db.Model):
