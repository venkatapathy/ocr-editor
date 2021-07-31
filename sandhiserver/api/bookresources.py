from flask_restful import Api, Resource, reqparse
from flask import send_file
from mgodb.models import Book
import os.path
from urllib.request import urlopen
import json
from urllib.parse import quote


class SearchQueryHandler(Resource):
    def get(self, query):
        connection = urlopen(
            'http://localhost:8983/solr/sandhi_core/select?q=pagecontent:' +
            quote(query) +
            "&hl=true&hl.fl=pagecontent&hl.usePhraseHighLighter=false&hl.requireFieldMatch=false&hl.simple.pre=<em%20style%3D\"background-color:yellow\">&hl.simple.post=<%2Fem>"
        )

        response = json.load(connection)
        return response


class HocrApiHandler(Resource):
    def get(self, bid, pid):
        image_dir = "./static"
        book = Book.objects.get(bookuuid=bid)
        if (not book or not pid or '.' in bid):
            return {
                "status":
                "error",
                "message":
                "no resource found for " + bid + "or page number not present"
            }

        resourcepath = book.fullpath.replace(
            ".pdf", "") + "/output_files/O0001-" + format(pid, "03d") + ".hocr"
        if os.path.isfile(resourcepath):
            return send_file(resourcepath, mimetype='text/html')
        else:
            return {
                "status": "error",
                "message": "no hocr found at path " + resourcepath
            }


class ImageApiHandler(Resource):
    def get(self, bid, pid):
        image_dir = "./static"
        book = Book.objects.get(bookuuid=bid)
        if (not book or not pid or '.' in bid):
            return {
                "status":
                "error",
                "message":
                "no resource found for " + bid + "or page number not present"
            }

        resourcepath = book.fullpath.replace(
            ".pdf", "") + "/page_images/O0001-" + format(pid, "03d") + ".jpg"
        if os.path.isfile(resourcepath):
            return send_file(resourcepath, mimetype='image/jpeg')
        else:
            return {
                "status": "error",
                "message": "no image found at path " + resourcepath
            }
