from flask import Response, request
from mgodb.models import Book
from flask_restful import Resource
import uuid
from libs.storeDoc import addDoctoDirectory


class BooksApi(Resource):
    def get(self):
        books = Book.objects().exclude("fullpath").to_json()

        return Response(books, mimetype="application/json", status=200)

    '''def post(self):
        body = request.get_json(force=True)
        book = Book(**body).save()
        id = book.id
        return {'id': str(id)}, 200'''

    def post(self):
        try:
            book = Book()

            if request.method == 'POST':

                uploaded_file = request.files['uploaded_file']
                if ("pdf" not in uploaded_file.content_type):
                    raise TypeError("Only pdf files are allowed for upload")

                book.title = request.form.get('title')
                book.author = request.form.get('author')
                if (request.form.get('noofpages')):
                    try:
                        book.nooofpages = int(request.form.get('noofpages'))
                    except ValueError:
                        return Response(
                            "Page numbers cannot contain characteres",
                            mimetype="application/text",
                            status=400)

                else:
                    #just make the default to a very large number
                    book.noofpages = 10000

                if (book.title == "" or book.author == ""):
                    return Response(
                        "Invalid submission! All fields required and cannot be empty",
                        mimetype="application/text",
                        status=400)

                book.bookuuid = uuid.uuid4().hex
                book.fullpath = addDoctoDirectory(book.bookuuid, uploaded_file)

                book.save()
                return {'id': str(book.id.hex)}, 200

        except TypeError as e:
            return Response("Invalid submission {0}".format(e),
                            mimetype="application/text",
                            status=400)


class BookApi(Resource):
    def put(self, id):
        body = request.get_json(force=True)
        Book.objects.get(bookuuid=id).update(**body)
        return '', 200

    def delete(self, id):
        Book.objects.get(bookuuid=id).delete()
        return '', 200

    def get(self, id):
        books = Book.objects.get(bookuuid=id).to_json()
        return Response(books, mimetype="application/json", status=200)
