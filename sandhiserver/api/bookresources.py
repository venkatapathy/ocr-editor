from flask_restful import Api, Resource, reqparse
from flask import send_file
import os.path


class HocrApiHandler(Resource):
    def get(self, bid, pid):
        image_dir = "./static"

        bookname = "b" + str(bid)
        pagename = "page-" + format(pid, "03d") + ".hocr"
        if os.path.isfile(os.path.join(image_dir, bookname, pagename)):
            return send_file(os.path.join(image_dir, bookname, pagename),
                             mimetype='text/html')
        else:
            return {
                "status":
                "error",
                "message":
                "no hocr found at path " +
                os.path.join(image_dir, bookname, pagename)
            }


class ImageApiHandler(Resource):
    def get(self, bid, pid):
        image_dir = "./static"

        bookname = "b" + str(bid)
        pagename = "page-" + format(pid, "03d") + ".jpeg"
        if os.path.isfile(os.path.join(image_dir, bookname, pagename)):
            return send_file(os.path.join(image_dir, bookname, pagename),
                             mimetype='image/jpeg')
        else:
            return {
                "status":
                "error",
                "message":
                "no images found at path " +
                os.path.join(image_dir, bookname, pagename)
            }
