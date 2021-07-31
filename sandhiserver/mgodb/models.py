try:
    from .db import db
except ImportError:
    from db import db
from enum import Enum


class Category(Enum):
    GENERAL = 'general'
    GANITHA = 'ganitha'
    ARTICLE = 'article'
    PHILOSOPHY = 'philosophy'


class Book(db.Document):
    bookuuid = db.UUIDField(primary_key=True)
    title = db.StringField(required=True)
    author = db.StringField(required=True)
    fullpath = db.StringField(required=True)
    noofpages = db.IntField()
    isIndexed = db.BooleanField(default=False)
    category = db.EnumField(Category, default=Category.GENERAL)
