from flask import Flask
from flask_cors import CORS # type: ignore
from models import db # type: ignore
from routes import register_routes # type: ignore
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

db_user = os.getenv("user")
db_password = os.getenv("password")
db_host = os.getenv("host")
db_port = os.getenv("port")
db_name = os.getenv("dbname")
seckey = os.getenv("secret_key")

app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
)


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = seckey
db.init_app(app)

with app.app_context():
    db.create_all()

register_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
