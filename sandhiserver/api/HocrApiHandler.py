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

    '''def post(self):
        print(self)
        parser = reqparse.RequestParser()
        parser.add_argument('type', type=str)
        parser.add_argument('message', type=str)

        args = parser.parse_args()

        print(args)
        # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

        request_type = args['type']
        request_json = args['message']
        # ret_status, ret_msg = ReturnData(request_type, request_json)
        # currently just returning the req straight
        ret_status = request_type
        ret_msg = request_json

        if ret_msg:
            message = "Your Message Requested: {}".format(ret_msg)
        else:
            message = "No Msg"

        final_ret = {"status": "Success", "message": message}

        return final_ret'''
