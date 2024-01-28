from datetime import datetime, timedelta
from fastapi import Request, Response
import os

from shared.auth import create_access_token, OptimisticAuthMiddleware
from shared.cors_app import CorsApp
from shared.db import get_db_connection

from utils.request_login import request_login

environment = os.environ.get('IIMB_ENV', 'prod')

app = CorsApp(environment)
app.add_middleware(OptimisticAuthMiddleware)

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
