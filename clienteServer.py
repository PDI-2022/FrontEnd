from flask import Flask, render_template, request
import os

template_dir = os.path.abspath('../FrontEnd/')
static_dir = os.path.abspath('../FrontEnd/static')

app = Flask(__name__,template_folder=template_dir,static_folder=static_dir)

@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)