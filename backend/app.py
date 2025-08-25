from flask import Flask
from flask_cors import CORS # type: ignore
from models import db # type: ignore
from routes import register_routes # type: ignore

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres.cjrpdkbsxuvthgsgbsqg:Sabonete100%@aws-1-sa-east-1.pooler.supabase.com:6543/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "sadsadsad"  

db.init_app(app)

with app.app_context():
    db.create_all()

# Registra rotas
register_routes(app)

if __name__ == "__main__":
    app.run(debug=True)
