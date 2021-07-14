from flask_restful import Api, Resource, reqparse
from flask import send_file
from mgodb.models import Book
import os.path


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
            ".pdf", "") + "/output_files/O-" + format(pid, "03d") + ".hocr"
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
            ".pdf", "") + "/page_images/O-" + format(pid, "03d") + ".jpg"
        if os.path.isfile(resourcepath):
            return send_file(resourcepath, mimetype='image/jpeg')
        else:
            return {
                "status": "error",
                "message": "no image found at path " + resourcepath
            }
