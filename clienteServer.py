import requests
from flask import Flask, render_template, request
import os

template_dir = os.path.abspath('./views')
static_dir = os.path.abspath('./static')

app = Flask(__name__,template_folder=template_dir,static_folder=static_dir)

@app.route("/", methods=['GET'])
def index():
    models = requests.get("http://localhost:5000/api/v1/models")
    return render_template("index.html",models=models.json())

@app.route("/seeds", methods=['GET'])
def seeds():
    print(request.get_data())
    return render_template("seeds.html")

@app.route("/uploadModel", methods=['GET'])
def model():
    return render_template("uploadModel.html")

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)