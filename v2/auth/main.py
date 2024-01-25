from datetime import datetime, timedelta
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import os

from auth import create_access_token, verify_jwt
from db import get_db_connection
from send_email import send_email

import random
import string

def generate_unique_url():
    return ''.join(random.choice(string.ascii_letters) for _ in range(30))

def request_login(cnx, user_id, name, email):
    cur = cnx.cursor()
    
    cur.execute('DELETE FROM login_attempts WHERE user_id = %s', (user_id,))
    cnx.commit()
    
    email_secret = generate_unique_url()
    cur.execute('INSERT INTO login_attempts (user_id, login_secret, attempted_at) VALUES (%s, %s, %s)', (user_id, email_secret, datetime.utcnow()))
    cnx.commit()
    
    send_email(email, name, email_secret)

app = FastAPI()
environment = os.environ.get('IIMB_ENV', 'prod')

origins = [
    'https://isitmybirth.day',
    'https://isitmybirth.day/',
    'https://www.isitmybirth.day',  
    'https://www.isitmybirth.day/',  
]

if environment == 'dev':
    origins.append('http://localhost:8080')
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    allow_headers=['*'],
)

@app.middleware('http')
def optimistic_auth(request: Request, call_next):
    request.state.user_id = None
    
    auth = request.cookies.get('access_token', '')

    if auth.startswith('Bearer'):
        auth = auth.split(' ')[1]
        payload = verify_jwt(auth)
        
        if payload is not None:
            request.state.user_id = payload
            
    return call_next(request)

@app.post('/register')
async def register(request: Request):
    data = await request.json()
    email = data.get('email', None)
    name = data.get('name', None)
    birth_day = data.get('birth_day', None)
    birth_month = data.get('birth_month', None)
    
    if email is None:
        return {'error': 'email_not_provided'}
    
    if name is None:
        return {'error': 'name_not_provided'}
    
    if birth_day is None:
        return {'error': 'birth_day_not_provided'}
    
    if birth_month is None:
        return {'error': 'birth_month_not_provided'}
    
    cnx = get_db_connection()
    cur = cnx.cursor()
    cur.execute('SELECT id FROM users WHERE email = %s', (email,))
    
    res = cur.fetchone()
    if res is not None:
        return {'error': 'user_already_exists'}
    
    cur.execute('INSERT INTO users (email, display_name, birth_day, birth_month) VALUES (%s, %s, %s, %s)', (email, name, birth_day, birth_month))
    cnx.commit()
    user_id = cur.lastrowid
    
    request_login(cnx, user_id, name, email)
    return {'success': True}

@app.post('/login')
async def login(request: Request):
    data = await request.json()
    email = data.get('email', None)
    
    if email is None:
        return {'error': 'email_not_provided'}
    
    cnx = get_db_connection()
    cur = cnx.cursor()
    cur.execute('SELECT id, display_name FROM users WHERE email = %s', (email,))
    
    res = cur.fetchone()
    if res is None:
        return {'error': 'user_not_found'}
    
    user_id, name = res

    request_login(cnx, user_id, name, email)
    return {'success': True}

@app.get('/verify')
async def verify(request: Request, response: Response):
    login_secret = request.query_params.get('v', None)
    
    if login_secret is None:
        return {'error': 'login_secret_not_provided'}
    
    cnx = get_db_connection()
    cur = cnx.cursor()
    cur.execute('SELECT user_id, attempted_at FROM login_attempts WHERE login_secret = %s', (login_secret,))
    
    res = cur.fetchone()
    
    if res is None:
        return {'error': 'login_secret_not_found'}
    
    user_id = res[0]
    cur.execute('DELETE FROM login_attempts WHERE user_id = %s', (user_id,))
    cnx.commit()
    
    if res[1] < datetime.utcnow() - timedelta(minutes=10):
        return {'error': 'login_secret_expired'}
    
    access_token, expiry = create_access_token(user_id)
    
    response.set_cookie(
        'access_token',
        f'Bearer {access_token}',
        httponly=True,
        expires=expiry,
        secure=environment == 'prod',
        samesite='strict' if environment == 'prod' else 'lax',
    )
    return {'success': True}

@app.get('/logout')
async def logout(response: Response):
    response.delete_cookie('access_token')
    return {'success': True}

if environment == 'dev':
    @app.get('/auth-test')
    async def test(request: Request):
        return {'user_id': request.state.user_id}

@app.get('/me')
async def me(request: Request):
    if (request.state.user_id is None):
        return {'error': 'not_logged_in'}
    
    cnx = get_db_connection()
    cur = cnx.cursor()
    cur.execute('SELECT display_name, birth_month, birth_day FROM users WHERE id = %s', (request.state.user_id,))
    
    res = cur.fetchone()
    if res is None:
        return {'error': 'user_not_found'}
    
    name, birth_month, birth_day = res
    return {
        'id': request.state.user_id,
        'name': name,
        'birthday': f'{birth_month}-{birth_day}',
    }
