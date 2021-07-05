from .db import db


class Book(db.Document):
    title = db.StringField(required=True)
    author = db.StringField(required=True)
    fullpath = db.StringField(required=True)
