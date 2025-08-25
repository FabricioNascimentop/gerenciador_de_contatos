import re
from models import db, Usuario



def email_existe(email):
    return db.session.query(Usuario.id).filter_by(email=email).first() is not None


def validar_nome(nome):
    padrão = r'^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$'
    if re.match(padrão, nome):
        if len(str(nome)) >= 3:
            return True
        

def validar_email(email):
    padrao = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    if re.match(padrao, email):
        if not email_existe(email):
            return True

def validar_senha(senha):
    if len(senha) < 8:
        return None

    if not re.search(r'[A-Z]', senha):
        return None

    if not re.search(r'[0-9]', senha):
        return None

    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', senha):
        return None

    return True