from datetime import datetime, timedelta
import os
from jose import jwt

AUTH_SECRET = os.environ.get('IIMB_AUTH_SECRET', None)
ALGORITHM = 'HS256'
JWT_EXPIRES_MINUTES = 60 * 24 * 7 # 7 days

if AUTH_SECRET is None:
    raise Exception('IIMB_AUTH_SECRET not set')

def create_access_token(user_id):
    to_encode = {
        'sub': str(user_id),
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(minutes=JWT_EXPIRES_MINUTES),
    }
    
    return jwt.encode(to_encode, AUTH_SECRET, algorithm=ALGORITHM), to_encode['exp']

def verify_jwt(token):
    try:
        payload = jwt.decode(token, AUTH_SECRET, algorithms=[ALGORITHM])
        
        return payload['sub']
    except Exception as e:
        return None
