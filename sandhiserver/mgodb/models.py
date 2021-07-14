from .db import db


class Book(db.Document):
    bookuuid = db.UUIDField(primary_key=True)
    title = db.StringField(required=True)
    author = db.StringField(required=True)
    fullpath = db.StringField(required=True)
    noofpages = db.IntField()
