from flask_sqlalchemy import SQLAlchemy
from enum import Enum
db = SQLAlchemy()

def initialize_db(app):
  app.app_context().push()
  db.init_app(app)
  db.create_all()
class Category(Enum):
    GENERAL = 'general'
    GANITHA = 'ganitha'
    ARTICLE = 'article'
    PHILOSOPHY = 'philosophy'


class Book(db.Model):

    __tablename__ = "Book"

    bookuuid = db.Column(db.Text, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    author = db.Column(db.String(80), nullable=False)
    fullpath = db.Column(db.String(80), nullable=False)
    noofpages = db.Column(db.Integer)
    isIndexed = db.Column(db.Boolean, default=False)
    category = db.Column(db.Enum(Category), default=Category.GENERAL)
