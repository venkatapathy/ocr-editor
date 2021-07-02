from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  #comment this on deployment
from api.ImageApiHandler import ImageApiHandler
from api.HocrApiHandler import HocrApiHandler

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)  #comment this on deployment
api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


api.add_resource(ImageApiHandler, '/i/b/<int:bid>/p/<int:pid>')
api.add_resource(HocrApiHandler, '/h/b/<int:bid>/p/<int:pid>')
