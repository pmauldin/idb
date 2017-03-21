from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# [START model]
class Characters(db.Model):
    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255))
    author = db.Column(db.String(255))
    publishedDate = db.Column(db.String(255))
    imageUrl = db.Column(db.String(255))
    description = db.Column(db.String(4096))
    createdBy = db.Column(db.String(255))
    createdById = db.Column(db.String(255))

    def __repr__(self):
        return "<Book(title='%s', author=%s)" % (self.title, self.author)
# [END model]

class Comics(db.Model):

class Creators(db.Model):

class Series(db.Model):

class Char_Comics(db.Model):

class Char_Series(db.Model):

class Creators_Comics(db.Model):

class Creators_Series(db.Model):
